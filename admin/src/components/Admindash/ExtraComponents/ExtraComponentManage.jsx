import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { client } from "../../../Client/Clientaxios";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";

const ExtraComponentManage = ({component,fetchComponent}) => {


  const deleteClick = async (publicId, imageId) => {
    try {
      const deleteResponse = await client.post("/component/deleteComponent", {
        publicId,
        imageId,
      });

      console.log(deleteResponse);
      if(deleteResponse.status === 200){
        fetchComponent()
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Paper
        sx={{
          width: "90%",
          overflow: "hidden",
          margin: "20px auto 20px auto",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Image
                </TableCell>

                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Name
                </TableCell>

                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Price
                </TableCell>

                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Description
                </TableCell>

                <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {component &&
                component.map((each) => (
                  <TableRow
                    key={each._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      <img
                        src={each.image.secure_url}
                        alt="componet-image"
                        style={{ width: "70px" }}
                      />
                    </TableCell>

                    <TableCell align="center">{each.name}</TableCell>
                    <TableCell align="center">{each.price}</TableCell>
                    <TableCell align="center">{each.description}</TableCell>
                    <TableCell align="center">
                     
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          deleteClick(each.image.public_id, each._id)
                        }
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default ExtraComponentManage;
