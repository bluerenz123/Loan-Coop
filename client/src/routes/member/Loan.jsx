import { Typography, useTheme } from "@mui/material";
import { useLoaderData, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Header from "../../components/Header";
import StatPaper from "../../components/StatPaper";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PaymentIcon from "@mui/icons-material/Payment";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import { tokens } from "../../theme";
import { http } from "../../http";

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export async function loanLoader({ params }) {
  let current_status = await http
    .get(`/current-status/${params.member_id}`)
    .then((result) => result.data);
  console.log(current_status);
  let loan = current_status.current_loans.find(
    (loan) => loan.type === params.loan_type
  );
  console.log(loan);

  return loan ? loan : null;
}

function Loan() {
  let { loan_type, id } = useParams();
  const current_loan = useLoaderData();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header
        title={`${loan_type.toUpperCase()} LOAN`}
        subtitle={`This is your current ${loan_type} loan status`}
      />
      {!!current_loan && (
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
        >
          <Grid container columnSpacing={2.5} rowSpacing={2.5} mb="20px">
            <StatPaper
              title={PHPPrice.format(current_loan.amount)}
              subtitle="Amount Borrowed"
              icon={
                <AccountBalanceIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <StatPaper
              title={`${current_loan.terms} months`}
              subtitle="Terms"
              icon={
                <PaymentIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <StatPaper
              title={PHPPrice.format(current_loan.monthly_deduction)}
              subtitle="Monthly Deduction"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <StatPaper
              title={current_loan.created_at}
              subtitle="Date of Application"
              icon={
                <RequestQuoteIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <StatPaper
              title={PHPPrice.format(current_loan.balance)}
              subtitle="Outstanding Balance"
              icon={
                <AccountBalanceIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <StatPaper
              title={`${current_loan.remaining_terms} ${
                current_loan.remaining_terms > 1 ? "months" : "month"
              }`}
              subtitle="Remaining Terms"
              icon={
                <PaymentIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <StatPaper
              title={current_loan.status.toUpperCase()}
              subtitle="Status"
              icon={
                <AccountBalanceIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Grid>
          {current_loan.status === "approved" ? (
            <TableContainer
              component={Paper}
              elevation={5}
              sx={{
                background: colors.primary[400],
                "& .MuiTableCell-root": {
                  borderBottom: `3px solid #141b2d`,
                },
                "& .MuiTableBody-root ": {
                  borderBottom: `none`,
                },
                minHeight: "50vh",
              }}
            >
              <Typography
                variant="h3"
                textAlign="center"
                sx={{ p: "10px 20px", borderBottom: "4px solid #141b2d" }}
              >
                LOAN PAYMENTS
              </Typography>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      align="center"
                    >
                      OR/GV
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      align="center"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      align="center"
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      align="center"
                    >
                      Balance
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      align="center"
                    >
                      Payment Option
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {current_loan.loan_payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell align="center">{payment.id}</TableCell>
                      <TableCell align="center">
                        {payment.created_at}
                      </TableCell>
                      <TableCell align="center">
                        {PHPPrice.format(payment.amount)}
                      </TableCell>
                      <TableCell align="center">
                        {PHPPrice.format(payment.balance)}
                      </TableCell>
                      <TableCell align="center">
                        {payment.option}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h3" textAlign="center" height="100%">
              Please wait for you loan approval...
            </Typography>
          )}
        </Box>
      )}
      {!current_loan && (
        <Typography variant="h4">
          You have no current active {loan_type} loan.
        </Typography>
      )}
    </Box>
  );
}

export default Loan;
