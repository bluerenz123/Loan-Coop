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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { tokens } from "../../theme";

// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { loanRules, coMakerPolicy, loanTerms } from "./data";
import { useEffect } from "react";
import { http } from "../../http";

export async function LoanApplicationLoader({ params }) {
  let current_status = await http
    .get(`/current-status/${params.id}`)
    .then((result) => result.data);

  let comakers = await http
    .get(`/comakers/${params.id}`)
    .then((result) => result.data);

  console.log(comakers);
  return { current_status, comakers };
}

export async function LoanApplicationAction({ request, params }) {
  const formData = await request.formData();
  const loan_application = Object.fromEntries(formData);

  console.log(loan_application);

  let result = await axios
    .post(
      `http://localhost:4020/loan/${params.id}/application`,
      loan_application,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((result) => result.data);

  console.log(result);

  return result;
}

const calculateLoans = (type, principal, terms) => {
  let serviceFee = 0.01;
  let retentionFee = 0.03;
  let interestRate = 0.0075;

  let result = {
    amount: 0,
    interest_amount: 0,
    service_fee_amount: 0,
    retention_fee_amount: 0,
    monthly_deduction: 0,

    total_amount: 0,
  };

  result.interest_amount = new Decimal(principal)
    .mul(interestRate)
    .mul(terms);
  result.service_fee_amount = new Decimal(principal).mul(serviceFee);

  if (type === "regular") {
    result.retention_fee_amount = new Decimal(principal).mul(retentionFee);
  }

  result.amount = new Decimal(principal)
    .add(result.interest_amount)
    .add(result.service_fee_amount)
    .add(result.retention_fee_amount);

  result.monthly_deduction = new Decimal(result.amount).div(terms);

  return result;
};

const loan_types = [
  {
    value: "regular",
    label: "Regular Loan",
  },
  {
    value: "multi-purpose",
    label: "Multi-Purpose Loan",
  },
  {
    value: "appliance",
    label: "Appliance Loan",
  },
  {
    value: "birthday",
    label: "Birthday Loan",
  },
  {
    value: "balik-eskwela",
    label: "Balik-Eskwela Loan",
  },
  {
    value: "emergency",
    label: "Emergency Loan",
  },
];

const CoMakerInput = ({ i, comakers }) => {
  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Autocomplete
          options={comakers.map((option) => option.email)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`Comaker ${i}`}
              name={`co_maker_${i}`}
              fullWidth
              required
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <TextField
          name={`co_maker_file_${i}`}
          type="file"
          helperText={`Pay Slip of Comaker ${i}`}
          fullWidth
          required
        />
      </Grid>
    </Grid>
  );
};

const NumberFormatCustom = forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="₱ "
    />
  );
});

// const comakers = [
//   {
//     _id: "63de45f7ed5f1cc2f693459b",
//     first_name: "1",
//     last_name: "sample",
//     department: "cos",
//     contact_number: "09214765154",
//     email: "1@sample.com",
//     password: "password test",
//     status: "approved",
//     createdAt: "2023-02-04T11:48:07.133Z",
//     updatedAt: "2023-02-04T11:48:24.670Z",
//     __v: 0,
//     name: "1 sample",
//     url: "/member/63de45f7ed5f1cc2f693459b",
//     id: "63de45f7ed5f1cc2f693459b",
//   },
//   {
//     _id: "63de4c03ed5f1cc2f69345a6",
//     first_name: "2",
//     last_name: "sample",
//     department: "cos",
//     contact_number: "09214765154",
//     email: "2@sample.com",
//     password: "password test",
//     status: "approved",
//     createdAt: "2023-02-04T12:13:55.835Z",
//     updatedAt: "2023-02-04T12:14:03.390Z",
//     __v: 0,
//     name: "2 sample",
//     url: "/member/63de4c03ed5f1cc2f69345a6",
//     id: "63de4c03ed5f1cc2f69345a6",
//   },
//   {
//     _id: "63de4c18ed5f1cc2f69345b1",
//     first_name: "3",
//     last_name: "sample",
//     department: "cos",
//     contact_number: "09214765154",
//     email: "3@sample.com",
//     password: "password test",
//     status: "approved",
//     createdAt: "2023-02-04T12:14:16.359Z",
//     updatedAt: "2023-02-04T12:14:21.470Z",
//     __v: 0,
//     name: "3 sample",
//     url: "/member/63de4c18ed5f1cc2f69345b1",
//     id: "63de4c18ed5f1cc2f69345b1",
//   },
// ];

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

function LoanApplication() {
  const { current_status, comakers } = useLoaderData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [type, setType] = useState("regular");
  const [SCAmount, setSCAmount] = useState(
    current_status.share_capital.total_amount
  );
  const [coMakers, setCoMakers] = useState(1);
  const [principal, setPrincipal] = useState(10000);
  const [terms, setTerms] = useState(6);

  const [loanAmount, setLoanAmount] = useState(
    calculateLoans(type, principal, terms)
  );

  useEffect(() => {
    let maxSC = new Decimal(SCAmount).mul(3);
    let amt = new Decimal(principal);

    // Comakers
    if (amt > 99999) {
      setCoMakers(3);
    } else if (amt > 49999) {
      setCoMakers(2);
    } else {
      setCoMakers(1);
    }

    switch (type) {
      case "regular":
        if (amt.greaterThan(maxSC)) {
          setPrincipal(maxSC);
        } else if (amt.greaterThan(150000)) {
          setPrincipal(150000);
        }
        break;
      case "appliance":
      case "multi-purpose":
        if (amt.greaterThan(maxSC)) {
          setPrincipal(maxSC);
        } else if (amt.greaterThan(120000)) {
          setPrincipal(120000);
        }
        break;
      default:
        if (amt.greaterThan(50000)) {
          setPrincipal(50000);
        }
        if (terms > 24) {
          console.log("gagi limited ung term");
          setTerms(24);
        }
        break;
    }

    setLoanAmount(calculateLoans(type, principal, terms));
  }, [type, principal, terms]);

  const handleTypeChange = (e) => {
    let type = e.target.value;
    setType(type);
  };

  const handleAmountChange = (e) => {
    let amt = e.target.value;

    if (amt < 0 || amt === "") {
      setPrincipal(0);
    } else if (amt > 150000) {
      setPrincipal(150000);
    } else {
      setPrincipal(amt);
    }
  };

  const handleComakersChange = (type) => {
    if (type === "add") {
      if (coMakers >= 5) {
        setCoMakers(5);
      } else {
        setCoMakers(coMakers + 1);
      }
    } else {
      if (principal > 99999 && coMakers <= 3) {
        setCoMakers(3);
      } else if (principal > 49999 && coMakers <= 2) {
        setCoMakers(2);
      } else if (coMakers <= 1) {
        setCoMakers(1);
      } else {
        setCoMakers(coMakers - 1);
      }
    }
  };

  const handleTermsChange = (e) => {
    let trm = e.target.value;

    if (trm < 1 || trm === "") {
      setTerms(1);
    } else if (trm > 24 && principal < 100000) {
      setTerms(24);
    } else if (trm > 36) {
      setTerms(36);
    } else {
      setTerms(trm);
    }
  };

  return (
    <Box height="85vh" display="flex" flexDirection="column">
      <Header
        title="LOAN APPLICATION"
        subtitle="This is where you can apply a loan in tup coop."
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
          encType="multipart/form-data"
        >
          <Paper
            sx={{
              background: `${colors.primary[400]} !important`,
              p: "20px 30px 15px",
              minHeight: "100%",
            }}
          >
            <Typography variant="h3" pb="20px">
              Loan Information
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Grid container columnSpacing={3} rowSpacing={3} pb="20px">
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    name="type"
                    select
                    label="Loan Type"
                    helperText="Please choose your type of loan"
                    value={type}
                    fullWidth
                    onChange={handleTypeChange}
                  >
                    {loan_types.map((loan) => (
                      <MenuItem key={loan.value} value={loan.value}>
                        {loan.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    disabled
                    helperText="Current loan balance according to the type"
                    value={
                      current_status.current_loans.find(
                        (loan) => loan.type === type
                      )
                        ? PHPPrice.format(
                            current_status.current_loans.find(
                              (loan) => loan.type === type
                            ).balance
                          )
                        : "n/a"
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    disabled
                    helperText="Current share capital investment"
                    value={PHPPrice.format(
                      current_status.share_capital.total_amount
                    )}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container columnSpacing={3} rowSpacing={3} mb="20px">
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    name="principal"
                    label="Principal Amount"
                    helperText="Amount to borrowed from coop"
                    value={principal}
                    onChange={handleAmountChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    name="terms"
                    label="Loan Terms"
                    helperText="Months to repay the loan"
                    value={terms}
                    onChange={handleTermsChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    type="file"
                    name="pay_slip_file"
                    helperText="Upload your current pay slip"
                  />
                </Grid>
              </Grid>

              <Typography variant="h3" pb="20px">
                Loan Balance
              </Typography>
              <Grid container columnSpacing={3} rowSpacing={3} mb="20px">
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    name="amount"
                    label="Loan Amount"
                    helperText="Amount to be payed"
                    value={loanAmount.amount.toFixed(2)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    name="interest_amount"
                    label="Interest Amount (.75%)"
                    helperText="Amount of interest in principal"
                    value={loanAmount.interest_amount.toFixed(2)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    name="service_fee"
                    label="Service Fee (1%)"
                    helperText="Amount of interest in principal"
                    value={loanAmount.service_fee_amount.toFixed(2)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    name="monthly_deduction"
                    label="Monthly Deduction"
                    helperText="Amount of monthly payment through payslip/OTC"
                    value={loanAmount.monthly_deduction.toFixed(2)}
                  />
                </Grid>
                {type === "regular" && (
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      type="number"
                      name="retention_fee"
                      label="Retention Fee (3%)"
                      helperText="Amount of retention fee in principal"
                      value={loanAmount.retention_fee_amount.toFixed(2)}
                    />
                  </Grid>
                )}
              </Grid>
              <Box>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h3" p="20px 0">
                    Co Makers
                  </Typography>
                  <IconButton
                    onClick={() => handleComakersChange("add")}
                    sx={{ width: "68px" }}
                  >
                    <AddCircleOutlineIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleComakersChange("remove")}
                    sx={{ width: "68px" }}
                  >
                    <RemoveCircleOutlineIcon fontSize="large" />
                  </IconButton>
                </Box>
                {Array.from(Array(coMakers).keys()).map((i) => (
                  <CoMakerInput
                    i={i + 1}
                    key={i + 1}
                    comakers={comakers}
                  />
                ))}
              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "80%",
                    md: "50%",
                  },
                  margin: "20px auto 10px",
                }}
                disabled={
                  current_status.current_loans.filter(
                    (loan) => loan.type === type
                  ).length
                    ? true
                    : false
                }
              >
                Apply Loan
              </Button>
            </Box>
          </Paper>
        </Box>
        <Typography variant="h1" fontWeight="bold">
          LOAN RULES
        </Typography>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "95%",
              md: "600px",
              lg: "800px",
            },
          }}
        >
          <Accordion
            sx={{
              background: `${colors.primary[400]} !important`,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">{coMakerPolicy.summary}</Typography>
            </AccordionSummary>
            {coMakerPolicy.details.map((detail, i) => (
              <AccordionDetails
                key={i}
                sx={{ background: `${colors.primary[600]}` }}
              >
                <Typography variant="h6">{detail}</Typography>
              </AccordionDetails>
            ))}
          </Accordion>

          <Accordion
            sx={{
              background: `${colors.primary[400]} !important`,
              mb: "20px",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">{loanTerms.summary}</Typography>
            </AccordionSummary>
            {loanTerms.details.map((detail, i) => (
              <AccordionDetails
                key={i}
                sx={{ background: `${colors.primary[600]}` }}
              >
                <Typography variant="h6">{detail}</Typography>
              </AccordionDetails>
            ))}
          </Accordion>

          <Typography variant="h3" mb="20px">
            Kind of Loans
          </Typography>
          {loanRules.map((type) => (
            <Accordion
              key={type.summary}
              sx={{
                background: `${colors.primary[400]} !important`,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{type.summary}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ background: `${colors.primary[600]}` }}
              >
                <Typography variant="h6">{type.details}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default LoanApplication;
