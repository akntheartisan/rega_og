import React, { useState, useEffect } from "react";
import { client } from "../../../Client/Clientaxios";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import { toast } from "react-hot-toast";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

const initialState = {
  image: "",
  name: "",
  price: "",
  description: "",
};

const ExtraComponents = () => {
  const [extraData, setExtraData] = useState(initialState);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("768px"));

  return (
    <>
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: "600px",
          margin: "10px auto",
          padding: "20px",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
        // onSubmit={submit}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", margin: "0px 0px 13px 0px" }}
        >
          Components Entry Form
        </Typography>
        <Stack spacing={2}>
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Battery"
              variant="outlined"
              size="small"
              value={extraData.image}
              // onChange={handleChange}
              name="battery"
            />
            <TextField
              fullWidth
              label="Mileage"
              variant="outlined"
              size="small"
              value={extraData.name}
              // onChange={handleChange}
              name="range"
            />
          </Stack>

          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            <TextField
              fullWidth
              label="Battery"
              variant="outlined"
              size="small"
              value={extraData.price}
              // onChange={handleChange}
              name="battery"
            />
            <TextField
              fullWidth
              label="Mileage"
              variant="outlined"
              size="small"
              value={extraData.description}
              // onChange={handleChange}
              name="range"
            />
          </Stack>

          {/* <Stack direction={"row"} spacing={2} justifyContent={"center"}>
            <Button variant="contained" color="warning">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack> */}
        </Stack>
      </Box>
    </>
  );
};

export default ExtraComponents;
