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

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddCardIcon from "@mui/icons-material/AddCard";

import { tokens } from "../../theme";

const columns = [
  {
    id: "date",
    label: "Date",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "purpose",
    label: "Purpose",
  },
  {
    id: "receipt_id",
    label: "OR#",
    align: "right",
  },
  {
    id: "amount",
    label: "Amount (Php)",
    align: "right",
  },
  {
    id: "terms",
    label: "terms",
    align: "right",
  },
];

function CashIn() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box display="flex" justifyContent="space-between">
        <Header
          title="CASH OUT"
          subtitle="This is the cash-out monthly deductions report"
        />
        <Box>[Option form of month-date]</Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Grid container columnSpacing={2.5} rowSpacing={2.5} mb="20px">
          <StatPaper
            title="&#8369; 431,520.00"
            subtitle="Total Cash Withdrawn"
            icon={
              <AddCardIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 23,340.00"
            subtitle="Regular Loan"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 23,340.00"
            subtitle="Multi-Purpose Loan"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 23,340.00"
            subtitle="Birthday Loan"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 23,340.00"
            subtitle="Balik-Eskwela Loan"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title="&#8369; 23,340.00"
            subtitle="Emergency Loan"
            icon={
              <PointOfSaleIcon
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
            minHeight: "300px",
            maxHeight: "500px",
          }}
        >
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ p: "10px 20px", borderBottom: "4px solid #141b2d" }}
          >
            CASH OUT MONTHLY REPORT (MM - YYYY)
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
                <TableCell>[date]</TableCell>
                <TableCell>[member name]</TableCell>
                <TableCell>[purpose]</TableCell>
                <TableCell align="right">[Receipt Id]</TableCell>
                <TableCell align="right">[amount]</TableCell>
                <TableCell align="right">[terms]</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default CashIn;
