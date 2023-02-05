import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

// MUI Components
import { Box, Typography, Grid, useTheme, Button } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// Custom Components
import Header from "../../components/Header";
import StatPaper from "../../components/StatPaper";

import { mockDataLoanApplication2 } from "../../data/mockData";

// MUI Icons
import RecentActorsIcon from "@mui/icons-material/RecentActors";

import { tokens } from "../../theme";
import { http } from "../../http";

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

const phpPrice = {
  type: "number",
  width: 130,
  valueFormatter: ({ value }) => currencyFormatter.format(value),
  cellClassName: "font-tabular-nums",
};

const columns = [
  {
    id: "date",
    label: "Date",
    align: "center",
    minWidth: 100,
  },
  { id: "name", label: "Name", align: "center", minWidth: 170 },
  { id: "type", label: "Loan Type", align: "center", minWidth: 170 },

  {
    id: "principal",
    label: "Principal Amount",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "terms",
    label: "Terms",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "balance",
    label: "Balance",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "center",
  },
];

export async function pendingLoansLoader() {
  let pending_loans = await http
    .get("/pending-loans")
    .then((result) => result.data);

  console.log(pending_loans);
  return pending_loans;
}

function PendingLoans() {
  const result = useLoaderData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header
        title="PENDING LOANS"
        subtitle="This is the summary table of pending loans."
      />

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Grid
          container
          columnSpacing={2.5}
          rowSpacing={2.5}
          sx={{ mb: "20px" }}
        >
          <StatPaper
            title={result.length}
            subtitle="Total number"
            icon={
              <RecentActorsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Grid>
        {!!result.length && (
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
              LIST OF LOANS APPLICATION
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
                    <TableCell align="center">
                      {loan.member.name}
                    </TableCell>
                    <TableCell align="center">{loan.type}</TableCell>
                    <TableCell align="center">
                      {PHPPrice.format(loan.principal)}
                    </TableCell>
                    <TableCell align="center">
                      {loan.terms} months
                    </TableCell>
                    <TableCell align="center">
                      {PHPPrice.format(loan.balance)}
                    </TableCell>
                    <TableCell align="center" sx={{ p: 0 }}>
                      <Link
                        to={`/loan-officer/pending-loan/${loan.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            "&:hover": {
                              background: colors.primary[500],
                            },
                          }}
                        >
                          See more
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

export default PendingLoans;
