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
import { exportOrderAPI } from "../../api/axios";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import numberWithCommas  from "../../utils/FormatPrice";
import { Form } from "react-bootstrap";
import UpdateExportOrderModal from "../UpdateModal/UpdateExportOrderModal";
import { useSelector } from "react-redux";
import ORDERSTATUS from "../../enums/orderStatus"


export default function ExportOrderTable() {
  const token = useSelector(state => state.token.value)
  const [isLoading, setIsLoading] = useState(false)
  const [exportOrders, setExportOrders] = useState([])
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false)
  const [isShowDeleteForm, setIsShowDeleteForm] = useState(false)

  const [clickedElement, setClickedElement] = useState(null)

  const [errorCreatingMessage, setErrorCreatingMessage] = useState(null)
  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    async function getstartingExportOrders() {
      try {
        const res = await exportOrderAPI.getAll()
        const startingExportOrders = res.data
        setExportOrders(startingExportOrders)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getstartingExportOrders()
  }, [])

  async function handleUpdateExportOrder(data) {
    setErrorUpdatingMessage(null)
    setIsShowUpdateForm(false)
    setIsLoading(true)
    try {
      const res = await exportOrderAPI.update(clickedElement._id, data)
      const newExportOrders = exportOrders.filter(exportOrder => exportOrder._id !== clickedElement._id)
      newExportOrders.unshift(res.data)
      setExportOrders(newExportOrders)
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

  return (
    isLoading ?
      <Loading /> :
      <>
        {/* Show Table  */}
        <div className="Table">
          <div className="Table__header">
            <h1>Đơn hàng</h1>
          </div>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650, overflowY: "scroll" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Mã đơn hàng</TableCell>
                  <TableCell align="left">Tên khách hàng</TableCell>
                  <TableCell align="left">Địa chỉ giao hàng</TableCell>
                  <TableCell align="left">Số điện thoại</TableCell>
                  <TableCell align="left">Email</TableCell>  
                  <TableCell align="left">Trạng thái thanh toán</TableCell>
                  <TableCell align="left">Ngày đặt</TableCell>
                  <TableCell align="left">Tổng tiền</TableCell>
                  <TableCell align="left">Xem chi tiết đơn hàng</TableCell>
                  <TableCell align="left">Trạng thái đơn hàng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {exportOrders.map((exportOrder) => (
                  <TableRow
                    key={exportOrder._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row"> 
                      {exportOrder._id}
                    </TableCell>
                    <TableCell align="left">{exportOrder.name}</TableCell>
                    <TableCell  align="left">{exportOrder.address}</TableCell>
                    <TableCell align="left">{exportOrder.phone}</TableCell>
                    <TableCell align="left">{exportOrder.email}</TableCell>
                    <TableCell align="left">{exportOrder.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</TableCell>
                    <TableCell align="left">{exportOrder.createdAt}</TableCell>
                    <TableCell align="left">{numberWithCommas(exportOrder.totalBill)}</TableCell>
                    <TableCell align="left">
                        <Form.Select>
                        {
                            exportOrder.r_exportOrderDetails.map(detail => (
                                <option key={detail._id}>
                                    {`${detail.r_product.name} ${detail.size} -- ${numberWithCommas(detail.r_product.price)} -- ${detail.quantity} đôi`}
                                </option>
                            ))
                        }
                        </Form.Select>
                    </TableCell>
                    <TableCell align="left">{ORDERSTATUS[exportOrder.status]}</TableCell>
                    <TableCell align="left" className="Details">
                      <DetailsDropdown
                        clickedElement={exportOrder}
                        onUpdatingElementClick={(updatingExportOrder) => {
                          setClickedElement(updatingExportOrder)
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
        {/* Update modal*/}
        <UpdateExportOrderModal
          isShow={isShowUpdateForm}
          onClose={() => { setIsShowUpdateForm(false) }}
          onUpdateExportOrder={handleUpdateExportOrder}
          updatingExportOrder={clickedElement}
          errorMessage={errorUpdatingMessage}
        />
      </>
  );
}
