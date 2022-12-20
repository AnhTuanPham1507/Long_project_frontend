import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import DetailsDropdown from "../Dropdown/DetailsDropdown";
import { IconButton, Tooltip } from "@mui/material";
import { UilPen } from '@iconscout/react-unicons'
import CreateTrademarkModal from "../CreateModal/CreateTrademarkModal";
import { useState } from "react";
import { trademarkAPI } from "../../api/axios";
import UpdateTrademarkModal from "../UpdateModal/UpdateTrademarkModal";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import DeleteTrademarkModal from "../DeleteModal/DeleteTrademarkModal";


export default function TrademarkTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [trademarks, setTrademarks] = useState([])

  const [isShowCreateForm, setIsShowCreateForm] = useState(false)
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false)
  const [isShowDeleteForm, setIsShowDeleteForm] = useState(false)

  const [clickedElement, setClickedElement] = useState(null)

  const [errorCreatingMessage, setErrorCreatingMessage] = useState(null)
  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    async function getStartingTrademarks() {
      try {
        const res = await trademarkAPI.getAll()
        const startingTrademarks = res.data
        setTrademarks(startingTrademarks)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getStartingTrademarks()
  }, [])


  async function handleCreateTrademark(form) {
    setErrorCreatingMessage(null)
    setIsShowCreateForm(false)
    setIsLoading(true)
    try {
      const formData = new FormData(form)
      const res = await trademarkAPI.create(formData)
      setTrademarks([...trademarks, res.data])
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorCreatingMessage(error.response.data.message)
        setIsShowCreateForm(true)
        return
      }
      alert(error.toString())
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateTrademark(form) {
    setErrorUpdatingMessage(null)
    setIsShowUpdateForm(false)
    setIsLoading(true)
    try {
      const formData = new FormData(form)
      const res = await trademarkAPI.update(clickedElement._id, formData)
      const newTrademarks = trademarks.filter(trademark => trademark._id !== clickedElement._id)
      newTrademarks.push(res.data)
      setTrademarks(newTrademarks)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorUpdatingMessage(error.response.data.message)
        setIsShowUpdateForm(true)
        return
      }
      alert(error.toString())
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteTrademark() {
    setIsShowDeleteForm(false)
    setIsLoading(true)
    try {
      await trademarkAPI.delete(clickedElement._id)
      const newTrademarks = trademarks.filter(trademark => trademark._id !== clickedElement._id)
      setTrademarks(newTrademarks)
      setClickedElement(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        alert(error.response.data.message)
        return
      }
      alert(error.toString())
    } finally {
      setIsLoading(false)
    }
  }

  return (
    isLoading ?
      <Loading /> :
      <>
        {/* Show Table  */}
        <div className="Table">
          <div className="Table__header">
            <h1>Trademark</h1>
            <Tooltip title="Create Trademark" onClick={() => { setIsShowCreateForm(true) }}>
              <IconButton>
                <UilPen />
              </IconButton>
            </Tooltip>
          </div>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650, overflowY: "scroll" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {trademarks.map((trademark) => (
                  <TableRow
                    key={trademark._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row">
                      {trademark._id}
                    </TableCell>
                    <TableCell align="left">{trademark.name}</TableCell>
                    <TableCell align="left"><img className="Table__img" src={`${window.env.CLOUDINARY_URL}${trademark.img}`} alt={`trademark`} /></TableCell>
                    <TableCell align="left" className="Details">
                      <DetailsDropdown
                        clickedElement={trademark}
                        onUpdatingElementClick={(updatingTrademark) => {
                          setClickedElement(updatingTrademark)
                          setIsShowUpdateForm(true)
                        }}
                        onDeletingElementClick={(deletingTrademark) => {
                          setClickedElement(deletingTrademark)
                          setIsShowDeleteForm(true)
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* Create, Update, Delete modal*/}
        <CreateTrademarkModal
          isShow={isShowCreateForm}
          onClose={() => { setIsShowCreateForm(false) }}
          onCreateTrademark={handleCreateTrademark}
          errorMessage={errorCreatingMessage}
        />
        <UpdateTrademarkModal
          isShow={isShowUpdateForm}
          onClose={() => { setIsShowUpdateForm(false) }}
          onUpdateTrademark={handleUpdateTrademark}
          updatingTrademark={clickedElement}
          errorMessage={errorUpdatingMessage}
        />
        <DeleteTrademarkModal
          isShow={isShowDeleteForm}
          onClose={() => { setIsShowDeleteForm(false) }}
          onDeleteTrademark={handleDeleteTrademark}
          deletingTrademark={clickedElement}
        />
      </>
  );
}
