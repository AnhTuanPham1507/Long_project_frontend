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
import { useState } from "react";
import { importOrderAPI } from "../../api/axios";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import numberWithCommas  from "../../utils/FormatPrice";
import { Form } from "react-bootstrap";
import CreateImportOrderModal from "../CreateModal/CreateImportOrderModal";
import { useSelector } from "react-redux";
import { fDate } from "../../utils/formatTime";


export default function ImportOrderTable() {
  const token = useSelector(state => state.token.value)
  const [isLoading, setIsLoading] = useState(false)
  const [importOrders, setImportOrders] = useState([])

  const [isShowCreateForm, setIsShowCreateForm] = useState(false)

  const [clickedElement, setClickedElement] = useState(null)

  const [errorCreatingMessage, setErrorCreatingMessage] = useState(null)
  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    async function getStartingImportOrders() {
      try {
        const res = await importOrderAPI.getAll()
        const startingImportOrders = res.data
        setImportOrders(startingImportOrders)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getStartingImportOrders()
  }, [])


  async function handleCreateImportOrder(importOrderDatas) {
    setErrorCreatingMessage(null)
    setIsShowCreateForm(false)
    setIsLoading(true)
    try {
      console.log(importOrderDatas,token)
      const res = await importOrderAPI.create(importOrderDatas,token)
      console.log(res.data)
      setImportOrders([...importOrders, res.data])
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

//   async function handleUpdateImportOrder(form) {
//     setErrorUpdatingMessage(null)
//     setIsShowUpdateForm(false)
//     setIsLoading(true)
//     try {
//       const formData = new FormData(form)
//       const res = await importOrderAPI.update(clickedElement._id, formData)
//       const newImportOrders = importOrders.filter(importOrder => importOrder._id !== clickedElement._id)
//       newImportOrders.push(res.data)
//       setImportOrders(newImportOrders)
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         setErrorUpdatingMessage(error.response.data.message)
//         setIsShowUpdateForm(true)
//         return
//       }
//       alert(error.toString())
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   async function handleDeleteImportOrder() {
//     setIsShowDeleteForm(false)
//     setIsLoading(true)
//     try {
//       await importOrderAPI.delete(clickedElement._id)
//       const newImportOrders = importOrders.filter(importOrder => importOrder._id !== clickedElement._id)
//       setImportOrders(newImportOrders)
//       setClickedElement(null)
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log(error)
//         alert(error.response.data.message)
//         return
//       }
//       alert(error.toString())
//     } finally {
//       setIsLoading(false)
//     }
//   }

  return (
    isLoading ?
      <Loading /> :
      <>
        {/* Show Table  */}
        <div className="Table">
          <div className="Table__header">
            <h1>Import Order</h1>
            <Tooltip title="Create ImportOrder" onClick={() => { setIsShowCreateForm(true) }}>
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
                  <TableCell align="left">Tổng tiền</TableCell>
                  <TableCell align="left">Details</TableCell>
                  <TableCell align="left">Creater</TableCell>
                  <TableCell align="left">Ngày nhập hàng</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {importOrders.map((importOrder) => (
                  <TableRow
                    key={importOrder._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row">
                      {importOrder._id}
                    </TableCell>
                    <TableCell align="left">{numberWithCommas(importOrder.totalPrice)}</TableCell>
                    <TableCell align="left">
                        <Form.Select>
                        {
                            importOrder.r_importOrderDetails.map(detail => (
                                <option key={detail._id}>
                                    {`${detail.r_product.name} ${detail.size} -- ${numberWithCommas(detail.r_product.price)} -- ${detail.quantity}`}
                                </option>
                            ))
                        }
                        </Form.Select>
                    </TableCell>
                    <TableCell align="left">{importOrder.r_user.name}</TableCell>
                    <TableCell align="left">{fDate(importOrder.importedAt)}</TableCell>

                    <TableCell align="left" className="Details">
                      <DetailsDropdown
                        // clickedElement={importOrder}
                        // onUpdatingElementClick={(updatingImportOrder) => {
                        //   setClickedElement(updatingImportOrder)
                        //   setIsShowUpdateForm(true)
                        // }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* Create, Update, Delete modal*/}
        <CreateImportOrderModal
          isShow={isShowCreateForm}
          onClose={() => { setIsShowCreateForm(false) }}
          onCreateImportOrder={handleCreateImportOrder}
          errorMessage={errorCreatingMessage}
        />

      </>
  );
}
