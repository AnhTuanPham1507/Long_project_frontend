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
import CreateProductModal from "../CreateModal/CreateProductModal";
import { useState } from "react";
import { productAPI } from "../../api/axios";
import UpdateProductModal from "../UpdateModal/UpdateProductModal";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import { numberWithCommas } from "../../utils/FormatPrice";
import ProductDetailModal from "../DetailsModal/ProductDetailModal";


export default function ProductTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  const [isShowCreateForm, setIsShowCreateForm] = useState(false)
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false)
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)

  const [clickedElement, setClickedElement] = useState(null)

  const [errorCreatingMessage, setErrorCreatingMessage] = useState(null)
  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    async function getStartingProducts() {
      try {
        const res = await productAPI.getAll()
        const startingProducts = res.data
        setProducts(startingProducts)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getStartingProducts()
  }, [])


  async function handleCreateProduct(form) {
    setErrorCreatingMessage(null)
    setIsShowCreateForm(false)
    setIsLoading(true)
    try {
      const formData = new FormData(form)
      const res = await productAPI.create(formData)
      setProducts([...products, res.data])
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

  async function handleUpdateProduct(form) {
    setErrorUpdatingMessage(null)
    setIsShowUpdateForm(false)
    setIsLoading(true)
    try {
      const formData = new FormData(form)
      const res = await productAPI.update(clickedElement._id, formData)
      const newProducts = products.filter(p => p._id !== clickedElement._id)
      newProducts.push(res.data)
      setProducts(newProducts)
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

  function handleUpdatingProductDetail(updatedProductDetail) {
    const newProducts = products.map(
      p => {
        const oldProductDetailsLength = p.r_productDetails.length
        if (oldProductDetailsLength <= 0)
          return p
        const filterProductDetails = p.r_productDetails.filter(detail => detail._id !== updatedProductDetail._id)
        if (filterProductDetails.length <= oldProductDetailsLength) {
          filterProductDetails.unshift(updatedProductDetail)
          const updatedProduct = { ...p, r_productDetails: filterProductDetails }
          setClickedElement(updatedProduct)
          return updatedProduct
        }
        return p
      })
    setProducts(newProducts)
  }

  return (
    isLoading ?
      <Loading /> :
      <>
        {/* Show Table  */}
        <div className="Table">
          <div className="Table__header">
            <h1>Product</h1>
            <Tooltip title="Create Product" onClick={() => { setIsShowCreateForm(true) }}>
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
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">description</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Trademark</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {products.map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row">
                      {product._id}
                    </TableCell>
                    <TableCell align="left">{product.name}</TableCell>
                    <TableCell align="left">{numberWithCommas(product.price)}</TableCell>
                    <TableCell align="left">{product.name}</TableCell>
                    <TableCell align="left">{product.r_category.name}</TableCell>
                    <TableCell align="left">{product.r_trademark.name}</TableCell>
                    <TableCell align="left" className="Details">
                      <DetailsDropdown
                        clickedElement={product}
                        onDetailClick={(product) => {
                          setClickedElement(product)
                          setIsShowDetailModal(true)
                        }}
                        setUpdatingElement={(updatingProduct) => {
                          setClickedElement(updatingProduct)
                          setIsShowUpdateForm(true)
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
        <CreateProductModal
          isShow={isShowCreateForm}
          onClose={() => { setIsShowCreateForm(false) }}
          onCreateProduct={handleCreateProduct}
          errorMessage={errorCreatingMessage}
        />
        <UpdateProductModal
          isShow={isShowUpdateForm}
          onClose={() => { setIsShowUpdateForm(false) }}
          onUpdateProduct={handleUpdateProduct}
          updatingProduct={clickedElement}
          errorMessage={errorUpdatingMessage}
        />
        <ProductDetailModal
          onUpdatingProductDetail={handleUpdatingProductDetail}
          isShow={isShowDetailModal}
          product={clickedElement}
          onClose={() => { setIsShowDetailModal(false) }}
        />
      </>
  );
}
