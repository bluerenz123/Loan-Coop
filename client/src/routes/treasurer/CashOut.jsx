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

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddCardIcon from "@mui/icons-material/AddCard";

import { tokens } from "../../theme";
import { useLoaderData } from "react-router-dom";
import { http } from "../../http";

const columns = [
  {
    id: "date",
    label: "Date",
    align: "center",
  },
  {
    id: "name",
    label: "Name",
    align: "center",
  },
  {
    id: "purpose",
    label: "Purpose",
    align: "center",
  },
  {
    id: "receipt_id",
    label: "OR#",
    align: "center",
  },
  {
    id: "amount",
    label: "Amount (Php)",
    align: "center",
  },
  {
    id: "terms",
    label: "terms",
    align: "center",
  },
];

export async function cashOutLoader() {
  let data = await http.get("/cash-outs").then((result) => result.data);

  return data;
}
const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

const loan_types = [
  "regular",
  "appliance",
  "multi-purpose",
  "balik-eskwela",
  "birthday",
  "emergency",
];

function CashOut() {
  const result = useLoaderData();
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
            title={PHPPrice.format(
              result
                .reduce((i, data) => i.add(data.amount), new Decimal(0))
                .toString()
            )}
            subtitle="Total Cash Withdrawn"
            icon={
              <AddCardIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          {loan_types.map((type) => (
            <StatPaper
              key={type}
              title={PHPPrice.format(
                result
                  .filter((data) => data.purpose === type)
                  .reduce((i, data) => i.add(data.amount), new Decimal(0))
                  .toString()
              )}
              subtitle={`${type.toUpperCase()} LOAN`}
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          ))}
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
              {result.map((data) => (
                <TableRow key={data.id}>
                  <TableCell align="center">{data.date}</TableCell>
                  <TableCell align="center">{data.member.name}</TableCell>
                  <TableCell align="center">{data.purpose}</TableCell>
                  <TableCell align="center">{data._id}</TableCell>
                  <TableCell align="center">{data.amount}</TableCell>
                  <TableCell align="center">{data.terms}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default CashOut;
