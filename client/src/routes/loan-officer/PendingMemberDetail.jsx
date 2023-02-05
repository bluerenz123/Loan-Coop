import { Form, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
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

import Header from "../../components/Header";

import { tokens } from "../../theme";
import { http } from "../../http";

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export async function pendingMemberDetailLoader({ params }) {
  let member = await http
    .get(`/pending-member/${params.member_id}`)
    .then((result) => result.data);
  console.log(member);
  return member;
}

export async function pendingMemberDetailAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let member = await http.post(
    `/member/${params.member_id}/status-update`,
    {
      status: data.status,
    }
  );

  return redirect("/loan-officer/pending-members");
}

function PendingMemberDetail() {
  const result = useLoaderData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [status, setStatus] = useState("approved");

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header
        title={`PENDING MEMBERSHIP DETAIL`}
        subtitle={`This is member's membership registration details`}
      />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          component={Form}
          method="post"
          encType="multipart/form-data"
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
            Member's Regisration Form
          </Typography>
          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Personal Information
          </Typography>
          <Grid container columnSpacing={2.5} rowSpacing={2.5} pb="20px">
            <Grid item xs={12} lg={6}>
              <TextField
                name="firstname"
                label="First Name"
                value={result.member.first_name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="lastname"
                label="Last Name"
                value={result.member.last_name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="contact_number"
                label="Contact Number"
                value={result.member.contact_number}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="department"
                label="Department"
                value={result.member.department.toUpperCase()}
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Account Information
          </Typography>
          <Grid container columnSpacing={2.5} rowSpacing={2.5} pb="20px">
            <Grid item xs={12} lg={6}>
              <TextField
                name="email"
                label="Email"
                value={result.member.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="password"
                type="password"
                label="Password"
                value={result.member.password}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="initial_investment"
                label="Initial Investment"
                value={PHPPrice.format(result.initial_investment)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="monthly_investment"
                label="Monthly Investment"
                value={PHPPrice.format(result.monthly_investment)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Approval Actions
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              width: "100%",
              gap: 2,
            }}
          >
            <input type="hidden" value={status} name="status" />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => setStatus("approved")}
            >
              <Typography variant="h6" fontWeight="bold">
                Approve
              </Typography>
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => setStatus("rejected")}
            >
              <Typography variant="h6" fontWeight="bold">
                Reject
              </Typography>
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default PendingMemberDetail;
