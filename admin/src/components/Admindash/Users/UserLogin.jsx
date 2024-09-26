import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { client } from '../../../Client/Clientaxios';

const UserLogin = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.get('/admin/fetchuser');
        setUsers(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUsers();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'black', // Darker blue background for the header
      color: theme.palette.common.white,
      padding: '12px 24px', // Add extra padding for a balanced look
      fontSize: '16px', // Make the text slightly bigger
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: '12px 24px', // Consistent padding in body cells
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#f9f9f9', // Slightly lighter background for alternate rows
    },
    '&:hover': {
      backgroundColor: '#90DF6C', // Subtle hover effect
    },
    transition: 'background-color 0.3s ease', // Smooth transition for hover
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer
      component={Paper}
      style={{
        border: '5px solid black',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        maxWidth: '90%',
        margin: '20px auto',
      }}
    >
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>District</StyledTableCell>
            <StyledTableCell>Landmark</StyledTableCell>
            <StyledTableCell>Mobile</StyledTableCell>
            <StyledTableCell>Pincode</StyledTableCell>
            <StyledTableCell>State</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <StyledTableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.district}</TableCell>
                <TableCell>{user.landmark}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.pincode}</TableCell>
                <TableCell>{user.state}</TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>

     
      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        style={{ padding: '13px' }} 
      />
    </TableContainer>
  );
};

export default UserLogin;
