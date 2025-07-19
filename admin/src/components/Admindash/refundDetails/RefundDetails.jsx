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

const RefundDetails = () => {
  const [refundDetails, setRefundDetails] = useState([]);
  const [paymentId, setPaymentId] = useState();

  useEffect(() => {}, [paymentId]);

  const refundDataFetch = async () => {
    try {
      const refundResponse = await client.get("/refund-webhoooks/getDetails");
      console.log(refundResponse);

      if (refundResponse.status === 200) {
        setRefundDetails(refundResponse.data.refundDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    refundDataFetch();
    return () => {
      controller.abort();
    };
  }, []);

  const handleRefundChange = (e) => {
    console.log(e.target);

    setPaymentId(e.target.value);
  };

  useEffect(() => {
    if (paymentId) {
      const filteredDetails = refundDetails.filter((each) => {
        return each.paymentId === paymentId;
      });

      console.log(filteredDetails);

      setRefundDetails(filteredDetails);
    }
  }, [paymentId, setPaymentId]);
  return (
    <>
      <div className="row mt-3 mb-2 px-3">
        <div className="col-md-6 offset-md-6">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              Payment Id
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Enter the Payment Id"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleRefundChange(e)}
            />
          </div>
        </div>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
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
                  Payment Id
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
                  Refund Id
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
                  Refund Amount
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
                  Refund Status
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
                  Currrency
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
                  Arn Number
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
                  Payment Method
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {refundDetails &&
                refundDetails.map((each) => (
                  <TableRow
                    key={each._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {each.paymentId}
                    </TableCell>
                    <TableCell align="center">{each.refundId}</TableCell>
                    <TableCell align="center">{each.refundAmount}</TableCell>
                    <TableCell align="center">{each.refundStatus}</TableCell>
                    <TableCell align="center">{each.currency}</TableCell>
                    <TableCell align="center">{each.arn}</TableCell>
                    <TableCell align="center">{each.method}</TableCell>
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
    </>
  );
};

export default RefundDetails;
