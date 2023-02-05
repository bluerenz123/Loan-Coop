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

export async function shareCapitalPaymentLoader() {
  let result = await http
    .get("/share-capitals/approved")
    .then((result) => result.data);

  console.log(result);

  result = result.filter((sc_status) => sc_status.member !== null);

  let options = result.map((sc_status) => sc_status.member.email);

  return { result, options };
}

export async function shareCapitalPaymentAction({ request }) {
  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  let result = await http
    .post(`/share-capital/${data.member_id}/payment`, data)
    .then((result) => result.data);
  console.log(result);

  return result;
}

function ShareCapitalPayment() {
  const { result, options } = useLoaderData();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState(options[0]);
  const [amount, setAmount] = useState(
    result.find((a) => a.member.email === options[0]).monthly_investment
  );
  const [scStatus, setScStatus] = useState(
    result.find((a) => a.member.email === options[0])
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value) {
      setAmount(
        result.find((a) => a.member.email === value).monthly_investment
      );
    }
  }, [value]);

  return (
    <Box height="85vh" display="flex" flexDirection="column">
      <Header
        title="SHARE CAPITAL PAYMENT"
        subtitle="This is where loan officer create a share capital payment."
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
          sx={{
            height: "100%",
            width: {
              xs: "100%",
              md: "640px",
              lg: "800px",
            },
            mb: "30px",
          }}
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
                  value={value}
                  onChange={(event, newValue) => {
                    event.preventDefault();
                    setValue(newValue);
                    setScStatus(
                      result.find((a) => a.member.email === newValue)
                    );
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    if (newInputValue !== null)
                      setInputValue(newInputValue);
                  }}
                  options={options}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Email"
                      helperText="Please select a member here for payment"
                    />
                  )}
                />
              </Grid>
            </Grid>
            {!!scStatus && (
              <Box component={Form} method="post">
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
                    value={scStatus.member.id}
                  />
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Name"
                      fullWidth
                      value={scStatus.member.name}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Department"
                      fullWidth
                      value={scStatus.member.department.toUpperCase()}
                    />
                  </Grid>
                </Grid>
                <Typography variant="h3" pb="20px">
                  Member's Share Capital Status
                </Typography>
                <Grid
                  container
                  columnSpacing={2.5}
                  rowSpacing={2.5}
                  pb="20px"
                >
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Total Investment"
                      fullWidth
                      value={PHPPrice.format(scStatus.total_amount)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      label="Monthly Investment"
                      fullWidth
                      value={PHPPrice.format(scStatus.monthly_investment)}
                    />
                  </Grid>
                </Grid>
                <Typography variant="h3" pb="20px">
                  Share Capital Payment
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
                      type="number"
                      label="Amount"
                      helperText="Input the amount to be payed."
                      fullWidth
                      required
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      name="option"
                      label="Payment Option"
                      helperText="Choose payment option"
                      select
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

export default ShareCapitalPayment;
