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
import { useLoaderData } from "react-router-dom";

const columns = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "center",
  },
  { id: "name", label: "Name", minWidth: 170, align: "center" },
  { id: "type", label: "Loan Type", minWidth: 100, align: "center" },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "terms",
    label: "Terms",
    minWidth: 100,
    align: "center",
  },
  {
    id: "balance",
    label: "Balance",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "monthly-deduction",
    label: "Monthly Deduction",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export async function newLoansLoader() {
  let data = await http.get("/loans/new").then((result) => result.data);

  console.log(data);
  return data;
}

function NewLoans() {
  let result = useLoaderData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box display="flex" justifyContent="space-between">
        <Header
          title="NEW LOANS (MONTHLY)"
          subtitle="This is the summary of new loans per month"
        />
        <Typography>[some form]</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Grid container columnSpacing={2.5} rowSpacing={2.5} mb="20px">
          <StatPaper
            title="3"
            subtitle="New Loans"
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
                  (i, loan) => i.add(loan.monthly_deduction),
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
                .reduce((i, loan) => i.add(loan.balance), new Decimal(0))
                .toFixed(2)
            )}
            subtitle="Total Balance"
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
            LIST OF NEW LOANS
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
                  <TableCell align="center">{loan.created_at}</TableCell>
                  <TableCell align="center">{loan.member.name}</TableCell>
                  <TableCell align="center">{loan.type}</TableCell>
                  <TableCell align="center">
                    {PHPPrice.format(loan.principal)}
                  </TableCell>
                  <TableCell align="center">{loan.terms}</TableCell>
                  <TableCell align="center">
                    {PHPPrice.format(loan.balance)}
                  </TableCell>
                  <TableCell align="center">
                    {PHPPrice.format(loan.monthly_deduction)}
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

export default NewLoans;
