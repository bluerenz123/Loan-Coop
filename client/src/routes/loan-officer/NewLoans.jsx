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

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "type", label: "Loan Type", minWidth: 100, align: "right" },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "terms",
    label: "Terms",
    minWidth: 100,
    align: "right",
  },
  {
    id: "balance",
    label: "Balance",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "monthly-deduction",
    label: "Monthly Deduction",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "right",
  },
];

function NewLoans() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box display="flex" justifyContent="space-between">
        <Header
          title="NEW LOANS (MONTHLY)"
          subtitle="This is the summary of new loans per month"
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
            title="3"
            subtitle="New Loans"
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
            LIST OF NEW LOANS (MM - YYYY)
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
                <TableCell align="right">[loan type]</TableCell>
                <TableCell align="right">[amount]</TableCell>
                <TableCell align="right">[terms]</TableCell>
                <TableCell align="right">[balance]</TableCell>
                <TableCell align="right">[monthly deduction]</TableCell>
                <TableCell align="right">[date]</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default NewLoans;
