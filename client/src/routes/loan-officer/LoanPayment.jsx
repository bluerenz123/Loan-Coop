import { useState, forwardRef } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { Decimal } from "decimal.js";
import { NumericFormat } from "react-number-format";
import axios from "axios";

// MUI Components
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { tokens } from "../../theme";
import { http } from "../../http";
import { useEffect } from "react";

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export async function loanPaymentLoader() {
  let result = await http
    .get("/loans/approved")
    .then((result) => result.data);

  let options = result.members.map((member) => member.email);

  return { result, options };
}

export async function loanPaymentAction({ request }) {
  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  let result = await http
    .post(`/loan/${data.loan_id}/payment`, data)
    .then((result) => result.data);

  console.log(data);

  return result;
}

function LoanPayment() {
  const { result, options } = useLoaderData();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedMember, setSelectedMember] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [member, setMember] = useState({});

  useEffect(() => {
    setMember(
      result.members.find((member) => member.email === selectedMember)
    );
  }, [selectedMember]);

  const [loanOption, setLoanOption] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [loanValue, setLoanValue] = useState("");

  const [currentLoan, setCurrentLoan] = useState({});

  useEffect(() => {
    setCurrentLoan(() => {
      let current_loan = result.loans.find(
        (loan) =>
          loan.member.email === selectedMember &&
          loan.type === selectedType
      );
      console.log(current_loan);
      return current_loan;
    });
  }, [selectedType]);

  const [amount, setAmount] = useState(0);
  const [scStatus, setScStatus] = useState();

  return (
    <Box height="85vh" display="flex" flexDirection="column">
      <Header
        title="LOAN PAYMENT"
        subtitle="This is where loan officer create a loan payment."
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component={Form}
          sx={{
            height: "100%",
            width: {
              xs: "100%",
              md: "640px",
              lg: "800px",
            },
            mb: "30px",
          }}
          method="post"
        >
          <Paper
            sx={{
              background: `${colors.primary[400]} !important`,
              p: "20px 30px 15px",
              minHeight: "100%",
            }}
          >
            <Typography variant="h3" pb="20px">
              Member Selection
            </Typography>
            <Grid
              container
              columnSpacing={2.5}
              rowSpacing={2.5}
              justifyContent="center"
              pb="20px"
            >
              <Grid item xs={12} lg={6}>
                <Autocomplete
                  value={selectedMember}
                  onChange={(event, newValue) => {
                    event.preventDefault();
                    setSelectedMember(newValue);
                    setLoanOption(() => {
                      let option = result.loans
                        .filter((loan) => loan.member.email === newValue)
                        .map((loan) => loan.type);
                      return option;
                    });
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  options={options}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Email"
                      helperText="Select a member here for payment"
                    />
                  )}
                />
              </Grid>

              {!!loanOption.length && (
                <Grid item xs={12} lg={6}>
                  <Autocomplete
                    value={selectedType}
                    onChange={(event, newValue) => {
                      event.preventDefault();
                      setSelectedType(newValue);
                    }}
                    inputValue={loanValue}
                    onInputChange={(event, newInputValue) => {
                      setLoanValue(newInputValue);
                    }}
                    options={loanOption}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Current Loans"
                        helperText="Select member's current active loan."
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>

            {!!member && (
              <Box>
                <Typography variant="h3" pb="20px">
                  Member Information
                </Typography>
                <Grid
                  container
                  columnSpacing={2.5}
                  rowSpacing={2.5}
                  pb="20px"
                >
                  <input
                    type="hidden"
                    name="member_id"
                    value={member.id}
                  />
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Name"
                      fullWidth
                      value={member.name}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Department"
                      fullWidth
                      value={member.department}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            {!!currentLoan && (
              <Box>
                <Typography variant="h3" pb="20px">
                  Loan Information
                </Typography>
                <Grid
                  container
                  columnSpacing={2.5}
                  rowSpacing={2.5}
                  pb="20px"
                >
                  <input
                    type="hidden"
                    name="loan_id"
                    value={currentLoan.id}
                  />
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Amount"
                      fullWidth
                      value={PHPPrice.format(currentLoan.amount)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Balance"
                      fullWidth
                      value={PHPPrice.format(currentLoan.balance)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Remaining Terms"
                      fullWidth
                      value={`${currentLoan.remaining_terms} ${
                        currentLoan.remaining_terms > 1
                          ? "months"
                          : "month"
                      }`}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Monthly Deduction"
                      fullWidth
                      value={PHPPrice.format(
                        currentLoan.monthly_deduction
                      )}
                    />
                  </Grid>
                </Grid>
                <Typography variant="h3" pb="20px">
                  Loan Payment
                </Typography>
                <Grid
                  container
                  columnSpacing={2.5}
                  rowSpacing={2.5}
                  pb="20px"
                >
                  <Grid item xs={12} lg={6}>
                    <TextField
                      name="amount"
                      label="Loan Amount"
                      helperText="The default value is the monthly deduction."
                      fullWidth
                      defaultValue={currentLoan.monthly_deduction}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      select
                      label="Payment Options"
                      name="option"
                      fullWidth
                      defaultValue="pay-slip"
                    >
                      <MenuItem value="pay-slip">Pay Slip</MenuItem>
                      <MenuItem value="otc">Over The Counter</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "80%",
                        md: "50%",
                      },
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Proceed to Payment
                    </Typography>
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default LoanPayment;
