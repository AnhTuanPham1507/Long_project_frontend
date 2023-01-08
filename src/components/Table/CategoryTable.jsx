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
import CreateCategoryModal from "../CreateModal/CreateCategoryModal";
import { useState } from "react";
import { categoryAPI } from "../../api/axios";
import UpdateCategoryModal from "../UpdateModal/UpdateCategoryModal";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import DeleteCategoryModal from "../DeleteModal/DeleteCategoryModal";


export default function CategoryTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const [isShowCreateForm, setIsShowCreateForm] = useState(false)
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false)
  const [isShowDeleteForm, setIsShowDeleteForm] = useState(false)

  const [clickedElement, setClickedElement] = useState(null)

  const [errorCreatingMessage, setErrorCreatingMessage] = useState(null)
  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    async function getStartingCategories() {
      try {
        const res = await categoryAPI.getAll()
        const startingCategories = res.data
        setCategories(startingCategories)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getStartingCategories()
  }, [])


  async function handleCreateCategory(form) {
    setErrorCreatingMessage(null)
    setIsShowCreateForm(false)
    setIsLoading(true)
    try {
      const formData = new FormData(form)
      const res = await categoryAPI.create(formData)
      setCategories([...categories, res.data])
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

  async function handleUpdateCategory(form) {
    setErrorUpdatingMessage(null)
    setIsShowUpdateForm(false)
    setIsLoading(true)
    try {
      const formData = new FormData(form)
      const res = await categoryAPI.update(clickedElement._id, formData)
      const newCategories = categories.filter(cate => cate._id !== clickedElement._id)
      newCategories.push(res.data)
      setCategories(newCategories)
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

  async function handleDeleteCategory() {
    setIsShowDeleteForm(false)
    setIsLoading(true)
    try {
      await categoryAPI.delete(clickedElement._id)
      const newCategories = categories.filter(cate => cate._id !== clickedElement._id)
      setCategories(newCategories)
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
            <h1>Category</h1>

            <Tooltip title="Create Category" onClick={() => { setIsShowCreateForm(true) }}>
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
                  <TableCell align="left">TotalProductQuantity</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {categories.map((category) => (
                  <TableRow
                    key={category._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row">
                      {category._id}
                    </TableCell>
                    <TableCell align="left">{category.name}</TableCell>
                    <TableCell align="left"><img className="Table__img" src={`${window.env.CLOUDINARY_URL}${category.img}`} alt={`category`} /></TableCell>
                    <TableCell align="left">{category.r_products[0].totalQuantity} sản phẩm</TableCell>

                    <TableCell align="left" className="Details">
                      <DetailsDropdown
                        clickedElement={category}
                        onUpdatingElementClick={(updatingCategory) => {
                          setClickedElement(updatingCategory)
                          setIsShowUpdateForm(true)
                        }}
                        onDeletingElementClick={(deletingCategory) => {
                          setClickedElement(deletingCategory)
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
        <CreateCategoryModal
          isShow={isShowCreateForm}
          onClose={() => { setIsShowCreateForm(false) }}
          onCreateCategory={handleCreateCategory}
          errorMessage={errorCreatingMessage}
        />
        <UpdateCategoryModal
          isShow={isShowUpdateForm}
          onClose={() => { setIsShowUpdateForm(false) }}
          onUpdateCategory={handleUpdateCategory}
          updatingCategory={clickedElement}
          errorMessage={errorUpdatingMessage}
        />
        <DeleteCategoryModal
          isShow={isShowDeleteForm}
          onClose={() => { setIsShowDeleteForm(false) }}
          onDeleteCategory={handleDeleteCategory}
          deletingCategory={clickedElement}
        />
      </>
  );
}
