import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import { http } from "../../http";

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
  {
    id: "department",
    label: "Department",
    align: "center",
    minWidth: 170,
  },

  {
    id: "initial_investment",
    label: "Initial Investment",
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

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export async function pendingMembersLoader() {
  let pending_members = await http
    .get("/pending-members")
    .then((result) => result.data);
  console.log(pending_members);
  return pending_members;
}

function PendingMembers() {
  const result = useLoaderData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header
        title="PENDING MEMBERS"
        subtitle="This is where the pending members gets membership approval."
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
              maxHeight: "70vh",
            }}
          >
            <Typography
              variant="h3"
              textAlign="center"
              sx={{ p: "10px 20px", borderBottom: "4px solid #141b2d" }}
            >
              LIST OF CURRENTLY PENDING MEMBERS
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
                {result.map((status) => (
                  <TableRow key={status}>
                    <TableCell align="center">
                      {status.member.created_at}
                    </TableCell>
                    <TableCell align="center">
                      {status.member.name}
                    </TableCell>
                    <TableCell align="center">
                      {status.member.department.toUpperCase()}
                    </TableCell>
                    <TableCell align="center">
                      {PHPPrice.format(status.initial_investment)}
                    </TableCell>
                    <TableCell align="center" sx={{ p: 0 }}>
                      <Link
                        to={`/loan-officer/pending-member/${status.member.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <Button variant="contained">See more</Button>
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

export default PendingMembers;
