import { useLoaderData } from "react-router-dom";

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
    id: "multi-purpose",
    label: "Multi-Purpose Loan",
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
    id: "balik-eskwela",
    label: "Balik-Eskwela Loan",
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

export async function updateLoansLoader() {
  let loans = await http
    .get("/loans/updated")
    .then((result) => result.data);

  console.log(loans);

  return loans;
}

function UpdateLoans() {
  const result = useLoaderData;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box display="flex" justifyContent="space-between">
        <Header
          title="UPDATE LOANS (MONTHLY)"
          subtitle="This is the summary monthly deductions of update loans"
        />
        <Typography>[form month sht]</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Grid container columnSpacing={2.5} rowSpacing={2.5} mb="20px">
          <StatPaper
            title="10"
            subtitle="Update Loans"
            icon={
              <RecentActorsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 234,340.00"
            subtitle="Monthly Deductions"
            icon={
              <RecentActorsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 10,200.00"
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
              <TableRow>
                <TableCell>[member name]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[share capital]</TableCell>
                <TableCell align="right">
                  [total monthly deductions]
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>[member name]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[share capital]</TableCell>
                <TableCell align="right">
                  [total monthly deductions]
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>[member name]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[share capital]</TableCell>
                <TableCell align="right">
                  [total monthly deductions]
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>[member name]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[share capital]</TableCell>
                <TableCell align="right">
                  [total monthly deductions]
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>[member name]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[share capital]</TableCell>
                <TableCell align="right">
                  [total monthly deductions]
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>[member name]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[loan]</TableCell>
                <TableCell align="right">[share capital]</TableCell>
                <TableCell align="right">
                  [total monthly deductions]
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default UpdateLoans;
