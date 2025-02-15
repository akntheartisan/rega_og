import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Paper, Typography, IconButton } from '@mui/material';
import { client } from '../../../Client/Clientaxios'; // Axios client instance
import { toast } from 'react-hot-toast';
import { Delete as DeleteIcon } from '@mui/icons-material'; // Importing Delete Icon

const AdminContact = () => {
    const [shopAddress, setShopAddress] = useState('');
    const [shopMobile, setShopMobile] = useState(''); // Stores comma-separated phone numbers
    const [shopEmail, setShopEmail] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedHours, setSelectedHours] = useState([]);
    const [hourEntries, setHourEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get('/admin/shopcontact'); 
                const shopDataArray = response.data;

                if (shopDataArray.length > 0) {
                    const shopData = shopDataArray[0]; 
                    const { shopaddress, shopmobile, shopemail, shophours } = shopData;

                    setShopAddress(shopaddress || '');
                    setShopMobile(shopmobile || '');
                    setShopEmail(shopemail || '');

                    if (shophours) {
                        const hoursEntries = shophours.split(', ').map(entry => entry.trim());
                        setHourEntries(hoursEntries);
                    } else {
                        setHourEntries([]);
                    }
                } else {
                    toast.error('No shop data available');
                }
            } catch (error) {
                toast.error('Failed to load shop data');
            }
        };

        fetchData();
    }, []);

    const handleAddHours = () => {
        const dayMap = {
            'Monday': 'MON',
            'Tuesday': 'TUE',
            'Wednesday': 'WED',
            'Thursday': 'THU',
            'Friday': 'FRI',
            'Saturday': 'SAT',
            'Sunday': 'SUN'
        };

        if (selectedDays.length === 0 || selectedHours.length === 0) {
            toast.error('Please select both days and hours.');
            return;
        }

        const formattedDays = selectedDays.map(day => dayMap[day] || day).join(' - ');
        const formattedHours = selectedHours.join(', ');
        const formattedEntry = `${formattedDays}: ${formattedHours}`;

        setHourEntries([...hourEntries, formattedEntry]);
        setSelectedDays([]);
        setSelectedHours([]);
    };

    const handleDeleteHour = async (indexToRemove) => {
        try {
            const updatedEntries = hourEntries.filter((val, i) => i !== indexToRemove);
            const response = await client.put('/admin/shopcontact', {
                shopAddress,
                shopMobile,
                shopEmail,
                hourEntries: updatedEntries,
            });

            if (response.status === 200) {
                setHourEntries(updatedEntries);
                toast.success('Shop hours updated successfully');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update shop details');
        }
    };

    const handleAddPhoneNumber = () => {
        setShopMobile(shopMobile + ', ');
    };

    const handlePhoneNumberChange = (event) => {
        setShopMobile(event.target.value); // Update phone numbers
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!shopAddress || !shopMobile || !shopEmail || hourEntries.length === 0) {
            toast.error('All fields are required');
            return;
        }

        try {
            const response = await client.put('/admin/shopcontact', {
                shopAddress,
                shopMobile,
                shopEmail,
                hourEntries,
            });

            if (response.status === 200) {
                toast.success('Successfully Updated');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update shop details');
        }
    };

    return (
//         <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '800px', margin: 'auto' }}>
//             <Typography variant="h4" gutterBottom align="center">
//                 Shop Details Form
//             </Typography>
//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             fullWidth
//                             label="Shop Address"
//                             variant="outlined"
//                             value={shopAddress}
//                             onChange={(e) => setShopAddress(e.target.value)}
//                         />
//                     </Grid>
                    
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             fullWidth
//                             label="Shop Email"
//                             variant="outlined"
//                             type="email"
//                             value={shopEmail}
//                             onChange={(e) => setShopEmail(e.target.value)}
//                         />
//                     </Grid>
//                    <Stack  direction={"row"}>
//                    <Grid item xs={12} sm={6}>
//                         <TextField
//                             fullWidth
//                             label="Shop Mobile (comma-separated)"
//                             variant="outlined"
//                             value={shopMobile}
//                             onChange={handlePhoneNumberChange}
//                             helperText="Enter multiple phone numbers separated by commas"
//                         />
//                     </Grid>
//                     <Button
//         variant="contained"
//         color="primary"
//         onClick={handleAddPhoneNumber}
//         style={{ width: '100%' }}
//     >
//         Add Phone Number
//     </Button>
//                    </Stack>

//                     <Grid item xs={12} sm={6}>
//                         <FormControl fullWidth>
//                             <InputLabel>Days</InputLabel>
//                             <Select
//                                 multiple
//                                 value={selectedDays}
//                                 onChange={(e) => setSelectedDays(e.target.value)}
//                                 renderValue={(selected) => selected.join(', ')}
//                                 label="Days"
//                             >
//                                 <MenuItem value="Monday">Monday</MenuItem>
//                                 <MenuItem value="Tuesday">Tuesday</MenuItem>
//                                 <MenuItem value="Wednesday">Wednesday</MenuItem>
//                                 <MenuItem value="Thursday">Thursday</MenuItem>
//                                 <MenuItem value="Friday">Friday</MenuItem>
//                                 <MenuItem value="Saturday">Saturday</MenuItem>
//                                 <MenuItem value="Sunday">Sunday</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth>
//                             <InputLabel>Hours</InputLabel>
//                             <Select
//                                 multiple
//                                 value={selectedHours}
//                                 onChange={(e) => setSelectedHours(e.target.value)}
//                                 renderValue={(selected) => selected.join(', ')}
//                                 label="Hours"
//                             >
//                                 <MenuItem value="8:00 AM - 9:00 PM">8:00 AM - 9:00 PM</MenuItem>
//                                 <MenuItem value="10:00 AM - 8:00 PM">10:00 AM - 8:00 PM</MenuItem>
//                                 <MenuItem value="9:00 AM - 5:00 PM">9:00 AM - 5:00 PM</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <div
//     className="buttons"
//     style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "10px",
//         alignItems: "center",
//         justifyContent: "center",
//         margin: "10px auto", // 10px top and bottom, auto for left and right
//     }}
// >
//     <Button
//         variant="contained"
//         color="primary"
//         onClick={handleAddHours}
//         style={{ width: '100%' }}
//     >
//         Add Hours
//     </Button>
   
// </div>


//                     <Grid item xs={12}>
//                         <Typography variant="h6">Added Shop Hours</Typography>
//                         <div
//                             style={{
//                                 border: '1px solid #ccc',
//                                 borderRadius: '4px',
//                                 padding: '10px',
//                                 marginTop: '10px',
//                                 minHeight: '100px'
//                             }}
//                         >
//                             {hourEntries.map((entry, index) => (
//                                 <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
//                                     <Typography variant="body1" style={{ flexGrow: 1 }}>
//                                         {entry}
//                                     </Typography>
//                                     <IconButton
//                                         color="secondary"
//                                         onClick={() => handleDeleteHour(index)}
//                                     >
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </div>
//                             ))}
//                         </div>
//                     </Grid>

                    

//                     <Grid item xs={12}>
//                         <Button type="submit" variant="contained" color="primary">
//                             Submit
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Paper>
<Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '800px', margin: 'auto' }}>
<Typography variant="h5" gutterBottom align="center" paddingBottom={5}>
    Shop Details Form
</Typography>
<form onSubmit={handleSubmit}>
    <Grid container spacing={3}>
        {/* Address and Email in the same row */}
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label="Shop Address"
                variant="outlined"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label="Shop Email"
                variant="outlined"
                type="email"
                value={shopEmail}
                onChange={(e) => setShopEmail(e.target.value)}
            />
        </Grid>

        {/* Phone Number and Add Number button in the same row */}
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label="Shop Mobile (comma-separated)"
                variant="outlined"
                value={shopMobile}
                onChange={handlePhoneNumberChange}
                helperText="Enter multiple phone numbers separated by commas"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddPhoneNumber}
            >
                Add Phone Number
            </Button>
        </Grid>

        {/* Days, Hours, and Add Hours button in the same row */}
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel>Days</InputLabel>
                <Select
                    multiple
                    value={selectedDays}
                    onChange={(e) => setSelectedDays(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    label="Days"
                >
                    <MenuItem value="Monday">Monday</MenuItem>
                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                    <MenuItem value="Thursday">Thursday</MenuItem>
                    <MenuItem value="Friday">Friday</MenuItem>
                    <MenuItem value="Saturday">Saturday</MenuItem>
                    <MenuItem value="Sunday">Sunday</MenuItem>
                </Select>
            </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel>Hours</InputLabel>
                <Select
                    multiple
                    value={selectedHours}
                    onChange={(e) => setSelectedHours(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    label="Hours"
                >
                    <MenuItem value="8:00 AM - 9:00 PM">8:00 AM - 9:00 PM</MenuItem>
                    <MenuItem value="10:00 AM - 8:00 PM">10:00 AM - 8:00 PM</MenuItem>
                    <MenuItem value="9:00 AM - 6:00 PM">9:00 AM - 6:00 PM</MenuItem>
                </Select>
            </FormControl>
        </Grid>

        <Grid item xs={6} style={{margin:"auto"}}>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddHours}
            >
                Add Hours
            </Button>
        </Grid>

        {/* Added Shop Hours */}
        <Grid item xs={12}>
            <Typography variant="h6">Added Shop Hours</Typography>
            <div
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px',
                    marginTop: '10px',
                    minHeight: '100px'
                }}
            >
                {hourEntries.map((entry, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <Typography variant="body1" style={{ flexGrow: 1 }}>
                            {entry}
                        </Typography>
                        <IconButton
                            color="secondary"
                            onClick={() => handleDeleteHour(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </Grid>
    </Grid>
</form>
</Paper>

    );
};

export default AdminContact;
