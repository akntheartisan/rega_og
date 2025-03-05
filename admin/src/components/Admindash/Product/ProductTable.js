import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { client } from "../../../Client/Clientaxios";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ProductUpdate from "./ProductUpdate";
import ProductDelete from "./ProductDelete";
import toast from "react-hot-toast";

export default function ProductTable({ product, setProduct }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productData, setProductData] = useState([]);
  const [updateOpen, setUpdateOpen] = React.useState("");
  const [selectedProduct,setSelectedProduct] = useState("");
  const [deleteOpen, setDeleteOpen] = React.useState("");
  console.log(product);
  const handleClickOpen = (product) => {
    
    
    setSelectedProduct(product)
    setUpdateOpen(true);
  };

  const deleteClickOpen = (product) => {
    setSelectedProduct(product)
    setDeleteOpen(true);
  };

  const getProduct = async () => {
    try {
      const response = await client.get("project/getproduct");
      console.log(response);
      console.log(response.data.data);
      setProductData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [product, setProduct]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteSubmit = async (id) => {
    console.log('deleted id:' + id);
    try {
      const response = await client.post("project/deleteproduct", {id});
      console.log(response);
      toast.error("Deleted Successfully");
      setDeleteOpen(false);
      getProduct();
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Paper sx={{ width: "70%", overflow: "hidden",marginLeft:'auto',marginRight:'auto' }}>
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
                  Model
                </TableCell>
                {/* <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Motor
                </TableCell> */}
                {/* <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Image
                </TableCell> */}
                {/* <TableCell
                  align="center"
                  style={{
                    minWidth: 170,
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Range
                </TableCell> */}
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
              {productData &&
                productData.map((each) => (
                  <TableRow
                    key={each._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center" style={{fontSize:'18px',fontWeight:'bolder'}}>
                      {each.model}
                    </TableCell>
                    {/* <TableCell align="center">{each.motor}</TableCell> */}
                    {/* <TableCell align="center">
                      <Link to={each.image.url} target="_blank">
                        {each.image.pid}
                      </Link>
                    </TableCell> */}
                    {/* <TableCell align="center">{each.range}</TableCell> */}
                    <TableCell align="center">
                      <IconButton aria-label="edit" onClick={()=>handleClickOpen(each)}>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={()=>deleteClickOpen(each)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={productData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      </Paper>
      <ProductUpdate
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
        product={selectedProduct}
        setProductData={setProductData}
        getProduct={getProduct}
      />
      <ProductDelete
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        product={selectedProduct}
        deleteSubmit={deleteSubmit}
      />
    </>
  );
}
