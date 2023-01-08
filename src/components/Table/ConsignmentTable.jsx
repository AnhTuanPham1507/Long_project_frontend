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
import { useState } from "react";
import { consignmentAPI } from "../../api/axios";
// import UpdateConsignmentModal from "../UpdateModal/UpdateConsignmentModal";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import consignmentStatus from "../../enums/consignmentStatus";
import UpdateConsignmentsModal from "../UpdateModal/UpdateConsignmentModal";


export default function ConsignmentTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [consignments, setConsignments] = useState([])

  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false)

  const [clickedElement, setClickedElement] = useState(null)


  useEffect(() => {
    setIsLoading(true)
    async function getStartingConsignments() {
      try {
        const res = await consignmentAPI.getAll()
        setConsignments(res.data)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getStartingConsignments()
  }, [])

  async function handleUpdateConsignment(data) {
    setIsShowUpdateForm(false)
    setIsLoading(true)
    try {
      const res = await consignmentAPI.updateStatus(data)
      const newConsignments = consignments.filter(con => con._id !== clickedElement._id)
      newConsignments.unshift(res.data)
      setConsignments(newConsignments)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message)
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
            <h1>Lô hàng</h1>
          </div>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650, overflowY: "scroll" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã định danh</TableCell>
                  <TableCell align="left">Sản phẩm</TableCell>
                  <TableCell align="left">Kích thước</TableCell>
                  <TableCell align="left">Số lượng</TableCell>
                  <TableCell align="left">Hình ảnh</TableCell>
                  <TableCell align="left">Trạng thái</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {consignments.map((consignment) => (
                  <TableRow
                    key={consignment._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row">
                      {consignment._id}
                    </TableCell>
                    <TableCell align="left">{consignment.r_product.name}</TableCell>
                    <TableCell align="left">{consignment.size}</TableCell>
                    <TableCell align="left">{consignment.quantity} sản phẩm</TableCell>
                    <TableCell align="left"><img className="Table__img" src={`${window.env.CLOUDINARY_URL}${consignment.r_product.imgs[0]}`} alt={`consignment`} /></TableCell>
                    <TableCell align="left">{consignmentStatus[consignment.status]}</TableCell>

                    <TableCell align="left" className="Details">
                      <DetailsDropdown
                        clickedElement={consignment}
                        onUpdatingElementClick={(updatingConsignment) => {
                          setClickedElement(updatingConsignment)
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
        <UpdateConsignmentsModal
          isShow={isShowUpdateForm}
          onClose={() => { setIsShowUpdateForm(false) }}
          onSubmit={handleUpdateConsignment}
          activeConsignments={clickedElement}
        />
      </>
  );
}
