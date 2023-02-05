import { Typography, useTheme } from "@mui/material";
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

function Loan({ type }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header
        title={`${type.toUpperCase()} LOAN`}
        subtitle={`This is your current ${type} loan status`}
      />

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Grid container columnSpacing={2.5} rowSpacing={2.5} mb="20px">
          <StatPaper
            title="&#8369; 35,500.00"
            subtitle="Amount Borrowed"
            icon={
              <AccountBalanceIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="24 Months"
            subtitle="Terms"
            icon={
              <PaymentIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 3,312.00"
            subtitle="Monthly Deduction"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="10/23/2023"
            subtitle="Date of Application"
            icon={
              <RequestQuoteIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 34,361.00"
            subtitle="Outstanding Balance"
            icon={
              <AccountBalanceIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="22 Months"
            subtitle="Remaining Terms"
            icon={
              <PaymentIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 344.00"
            subtitle="Accrued Penalty"
            icon={
              <RequestQuoteIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Grid>
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
              {Array.from(Array(100).keys()).map((i) => (
                <TableRow key={i}>
                  <TableCell align="center">shesh</TableCell>
                  <TableCell align="center">shesh</TableCell>
                  <TableCell align="center">shesh</TableCell>
                  <TableCell align="center">shesh</TableCell>
                  <TableCell align="center">shesh</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Loan;
