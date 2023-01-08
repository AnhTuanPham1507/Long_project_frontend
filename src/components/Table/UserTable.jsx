import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useState } from "react";
import { userAPI } from "../../api/axios";
import { useEffect } from "react";
import Loading from "../Loading/Loading";



export default function TrademarkTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setIsLoading(true)
    async function getStartingUsers() {
      try {
        const res = await userAPI.getAll()
        const startingUsers = res.data
        setUsers(startingUsers)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getStartingUsers()
  }, [])

  return (
    isLoading ?
      <Loading /> :
      <>
        {/* Show Table  */}
        <div className="Table">
          <div className="Table__header">
            <h1>User</h1>
          </div>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650, overflowY: "scroll" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Tên</TableCell>
                  <TableCell align="left">Tài khoản</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Số điện thoại</TableCell>
                  <TableCell align="left">Địa chỉ</TableCell>
                  <TableCell align="left">Ngày sinh</TableCell>
                  <TableCell align="left">Quyền</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {users.map((user) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row">
                      {user._id}
                    </TableCell>
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{user.username}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.phone}</TableCell>
                    <TableCell align="left">{user.address}</TableCell>
                    <TableCell align="left">{user.birthday}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left" className="Details">
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
  );
}
