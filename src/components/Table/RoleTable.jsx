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
import { roleAPI } from "../../api/axios";
import { useEffect } from "react";
import Loading from "../Loading/Loading";



export default function TrademarkTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState([])

  useEffect(() => {
    setIsLoading(true)
    async function getStartingRoles() {
      try {
        const res = await roleAPI.getAll()
        const startingRoles = res.data
        setRoles(startingRoles)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getStartingRoles()
  }, [])

  return (
    isLoading ?
      <Loading /> :
      <>
        {/* Show Table  */}
        <div className="Table">
          <div className="Table__header">
            <h1>Role</h1>
          </div>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650, overflowY: "scroll" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Chức vụ</TableCell>
                  <TableCell align="left">Mô tả</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {roles.map((role) => (
                  <TableRow
                    key={role._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row">
                      {role._id}
                    </TableCell>
                    <TableCell align="left">{role.title}</TableCell>
                    <TableCell align="left">{role.description}</TableCell>
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
