import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import axios from "axios";

// MUI Components
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Header from "../../components/Header";

import { tokens } from "../../theme";

const deparments = ["cit", "cie", "cafa", "cla", "coe", "cos"];

export async function registerAction({ request }) {
  const formData = await request.formData();
  const register_form = Object.fromEntries(formData);

  console.log(register_form);
  let result = await axios
    .post(`http://localhost:4020/member/register`, register_form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => result.data);

  console.log(result);

  return redirect("/member/login");
}

function Register() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [initInvestment, setInitInvestment] = useState(10000);
  const handleInitInvestment = (e) => {
    let value = e.target.value;
    setInitInvestment(value);
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header title="REGISTER" subtitle="Member's Registration" />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          component={Form}
          encType="multipart/form-data"
          method="post"
          sx={{
            background: `${colors.primary[400]} !important`,
            p: "20px 30px 15px",
            width: {
              xs: "100%",
              md: "600px",
              lg: "800px",
            },
          }}
        >
          <Typography variant="h2" sx={{ p: "0 0 20px" }}>
            Member Registration Form
          </Typography>
          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Personal Information
          </Typography>
          <Grid container columnSpacing={2.5} rowSpacing={2.5} pb="20px">
            <Grid item xs={12} lg={6}>
              <TextField
                name="first_name"
                label="First Name"
                defaultValue=""
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="last_name"
                label="Last Name"
                defaultValue=""
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="contact_number"
                label="Contact Number"
                defaultValue=""
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="department">Department</InputLabel>
                <Select
                  labelId="department"
                  name="department"
                  defaultValue="cos"
                  required
                  label="Department"
                >
                  {deparments.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Account Information
          </Typography>
          <Grid container columnSpacing={2.5} rowSpacing={2.5} pb="20px">
            <Grid item xs={12} lg={6}>
              <TextField
                name="email"
                type="email"
                label="Email"
                defaultValue=""
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="password"
                type="password"
                label="Password"
                defaultValue=""
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="initial_investment"
                type="number"
                label="Initial Investment"
                helperText="Minimum: 10,000.00"
                value={initInvestment}
                InputProps={{
                  inputProps: {
                    max: 15000,
                    min: 10000,
                  },
                }}
                onChange={handleInitInvestment}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="monthly_investment"
                type="number"
                label="Monthly Investment"
                defaultValue={100}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="pay_slip_file"
                type="file"
                helperText="Upload your current pay slip here"
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: {
                xs: "100%",
              },
            }}
          >
            Register
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default Register;
