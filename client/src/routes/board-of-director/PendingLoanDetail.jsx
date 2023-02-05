import { useState } from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";

// MUI Components
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import CardMedia from "@mui/material/CardMedia";

import Header from "../../components/Header";
import { tokens } from "../../theme";
import { http } from "../../http";

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export async function pendingLoanDetailLoader({ params }) {
  let loan_detail = await http
    .get(`/loan/${params.loan_id}`)
    .then((result) => result.data);

  console.log(loan_detail);

  return loan_detail;
}

export async function pendingLoanDetailAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  let loan = await http.post(`/loan/${params.loan_id}/status-update`, {
    status: data.status,
    credit_commitee_chairman: data.credit_commitee_chairman,
  });

  // console.log(loan);

  return redirect("/board-of-director/pending-loans");
  // return data;
}

const ComakerDetail = ({ co_maker, co_maker_file, i }) => {
  const [coMakerPhoto, setCoMakerPhoto] = useState(false);
  const handleOpen = () => setCoMakerPhoto(true);
  const handleClose = () => setCoMakerPhoto(false);
  return (
    <Grid container columnSpacing={3} rowSpacing={3} pb="20px">
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label={`Co Maker ${i + 1}`}
          value={co_maker.email}
          fullWidth
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button variant="contained" onClick={handleOpen}>
          View Image
        </Button>
        <Modal open={coMakerPhoto} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              width: {
                xs: "100%",
                sm: "50%",
              },
            }}
          >
            <img
              style={{
                maxHeight: "90vh",
                width: "100%",
                maxWidth: "90vh",
              }}
              src={`http://localhost:4020/images/${co_maker_file}`}
              alt="comaker payslip"
              crossOrigin="anonymous"
            />
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};

function PendingLoanDetail() {
  const loan_detail = useLoaderData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [status, setStatus] = useState("approved");

  const [paySlipImage, setPaySlipImage] = useState(false);
  const handleOpen = () => setPaySlipImage(true);
  const handleClose = () => setPaySlipImage(false);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header
        title={`LOAN APPLICATION DETAIL`}
        subtitle={`This is member's loan application details`}
      />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" sx={{ p: "0 0 20px" }}>
          Member's Loan Application
        </Typography>
        <Paper
          component={Form}
          method="post"
          encType="multipart/form-data"
          sx={{
            mb: "50px",
            background: `${colors.primary[400]} !important`,
            p: "20px 30px 15px",
            height: "100%",
            overflow: "auto",
            width: {
              xs: "100%",
              md: "600px",
              lg: "800px",
            },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Member Information
          </Typography>
          <Grid container columnSpacing={3} rowSpacing={3} pb="20px">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Name"
                value={loan_detail.member.name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                value={loan_detail.member.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Department"
                value={loan_detail.member.department.toUpperCase()}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography mr={2}>Pay Slip Image: </Typography>

              <Button variant="contained" onClick={handleOpen}>
                View Image
              </Button>
            </Grid>
          </Grid>

          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Loan Information
          </Typography>
          <Grid container columnSpacing={3} rowSpacing={3} pb="20px">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Loan Type"
                value={loan_detail.type}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Principal Amount"
                value={PHPPrice.format(loan_detail.principal)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Terms"
                value={`${loan_detail.terms} months`}
                fullWidth
              />
            </Grid>
          </Grid>

          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Loan Balance
          </Typography>
          <Grid container columnSpacing={3} rowSpacing={3} pb="20px">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Loan Amount"
                value={PHPPrice.format(loan_detail.amount)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Interest Amount (.75%)"
                value={PHPPrice.format(loan_detail.interest_amount)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Service Fee (1%)"
                value={PHPPrice.format(loan_detail.service_fee)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Monthly Deduction"
                value={PHPPrice.format(loan_detail.monthly_deduction)}
                fullWidth
              />
            </Grid>
            {loan_detail.type === "regular" && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Retention Fee (3%)"
                  value={PHPPrice.format(loan_detail.retention_fee)}
                  fullWidth
                />
              </Grid>
            )}
          </Grid>

          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Co Makers Info
          </Typography>

          {loan_detail.co_makers.map((co_maker, i) => (
            <ComakerDetail
              key={co_maker.id}
              co_maker={co_maker}
              co_maker_file={loan_detail.co_makers_files[i]}
              i={i}
            />
          ))}
          <Divider />

          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Credit Commitee Form
          </Typography>
          {/* <Typography variant="h5" sx={{ p: "0 0 20px" }}>
            Chairman
          </Typography> */}
          <Grid container columnSpacing={3} rowSpacing={3} pb="20px">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="credit_commitee_chairman"
                label="Credit Commitee Chairman"
                defaultValue=""
                required
                fullWidth
              />
            </Grid>
          </Grid>
          {/* <Typography variant="h5" sx={{ p: "0 0 20px" }}>
            Members
          </Typography>
          <Grid container columnSpacing={3} rowSpacing={3} pb="20px">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="credit_commitee_member_1"
                label="Member 1"
                defaultValue=""
                helperText="Optional"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="credit_commitee_member_2"
                label="Member 2"
                defaultValue=""
                helperText="Optional"
                fullWidth
              />
            </Grid>
          </Grid> */}
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
      <Modal open={paySlipImage} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            width: {
              xs: "100%",
              sm: "50%",
            },
          }}
        >
          <img
            style={{
              maxHeight: "90vh",
              width: "100%",
              maxWidth: "90vh",
            }}
            src={`http://localhost:4020/images/${loan_detail.pay_slip_file}`}
            alt="comaker payslip"
            crossOrigin="anonymous"
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default PendingLoanDetail;
