import { useLoaderData } from "react-router-dom";
import { Decimal } from "decimal.js";

import { Box, Grid, Typography, useTheme } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Header from "../../components/Header";
import StatPaper from "../../components/StatPaper";

import RecentActorsIcon from "@mui/icons-material/RecentActors";

import { tokens } from "../../theme";
import { http } from "../../http";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "regular",
    label: "Regular Loan",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "appliance",
    label: "Appliance Loan",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "multi-purpose",
    label: "Multi-Purpose Loan",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "balik-eskwela",
    label: "Balik-Eskwela Loan",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "birthday",
    label: "Birthday Loan",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "emergency",
    label: "Emergency Loan",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "share-capital",
    label: "Share Capital",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total-monthly-deductions",
    label: "Total Monthly Deductions",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export async function updateLoansLoader() {
  let loans = await http
    .get("/loans/updated")
    .then((result) => result.data);

  console.log(loans);

  return loans;
}

const loan_types = [
  "regular",
  "appliance",
  "multi-purpose",
  "balik-eskwela",
  "birthday",
  "emergency",
];

function UpdateLoans() {
  const result = useLoaderData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box display="flex" justifyContent="space-between">
        <Header
          title="UPDATE LOANS (MONTHLY)"
          subtitle="This is the summary monthly deductions of update loans"
        />
        {/* <Typography>[form month sht]</Typography> */}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Grid container columnSpacing={2.5} rowSpacing={2.5} mb="20px">
          <StatPaper
            title={result.length}
            subtitle="Update Loans"
            icon={
              <RecentActorsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title={PHPPrice.format(
              result
                .reduce(
                  (i, status) =>
                    i.add(
                      status.current_loans
                        .filter((l) => l.status === "approved")
                        .reduce(
                          (i, loan) => i.add(loan.monthly_deduction),
                          new Decimal(0)
                        )
                    ),
                  new Decimal(0)
                )
                .toFixed(2)
            )}
            subtitle="Monthly Deductions"
            icon={
              <RecentActorsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title={PHPPrice.format(
              result
                .reduce(
                  (i, status) =>
                    i.add(status.share_capital.monthly_investment),
                  new Decimal(0)
                )
                .toFixed(2)
            )}
            subtitle="Monthly Share Capital Investment"
            icon={
              <RecentActorsIcon
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
            LIST OF UPDATE LOANS (MM - YYYY)
          </Typography>
          <Table sx={{ overflowX: "scroll" }} stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      // minWidth: column.minWidth,
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>{loan.member.name}</TableCell>
                  {loan_types.map((type) => {
                    let curr_loan_type = loan.current_loans.find(
                      (l) => l.type === type
                    );
                    if (
                      !!curr_loan_type &&
                      curr_loan_type.status === "approved"
                    ) {
                      return (
                        <TableCell key={type} align="right">
                          {PHPPrice.format(
                            curr_loan_type.monthly_deduction
                          )}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={type} align="right">
                          _
                        </TableCell>
                      );
                    }
                  })}
                  <TableCell align="right">
                    {PHPPrice.format(
                      loan.share_capital.monthly_investment
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {PHPPrice.format(
                      new Decimal(loan.total_monthly_deductions)
                        .add(loan.share_capital.monthly_investment)
                        .toString()
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default UpdateLoans;
