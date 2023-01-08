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
import { permissionAPI } from "../../api/axios";
import { useEffect } from "react";
import Loading from "../Loading/Loading";



export default function TrademarkTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    setIsLoading(true)
    async function getStartingPermissions() {
      try {
        const res = await permissionAPI.getAll()
        const startingPermissions = res.data
        setPermissions(startingPermissions)
        setIsLoading(false)
      } catch (error) {
        alert(error.toString())
      }
    }
    getStartingPermissions()
  }, [])

  return (
    isLoading ?
      <Loading /> :
      <>
        {/* Show Table  */}
        <div className="Table">
          <div className="Table__header">
            <h1>Permission</h1>
          </div>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650, overflowY: "scroll" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Mô tả</TableCell>
                  <TableCell align="left">Loại</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {permissions.map((permission) => (
                  <TableRow
                    key={permission._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ height: "100%" }}
                  >
                    <TableCell component="th" scope="row">
                      {permission._id}
                    </TableCell>
                    <TableCell align="left">{permission.description}</TableCell>
                    <TableCell align="left">{permission.type}</TableCell>
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
