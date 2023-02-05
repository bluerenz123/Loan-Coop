// MUI Components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Paper, Typography, useTheme } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// MUI Icons
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import Header from "../../components/Header";
import StatPaper from "../../components/StatPaper";

import { tokens } from "../../theme";
import { http } from "../../http";
import { useLoaderData } from "react-router-dom";

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export async function shareCapitalLoader({ params }) {
  let sc_status = await http
    .get(`/share-capital/${params.id}`)
    .then((result) => result.data);

  return sc_status;
}

function ShareCapital() {
  const data = useLoaderData();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header
        title="SHARE CAPITAL"
        subtitle="This is your current share capital status"
      />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Grid container columnSpacing={2.5} rowSpacing={2.5} mb="20px">
          <StatPaper
            title={PHPPrice.format(data.initial_investment)}
            subtitle="Initial Investment"
            icon={
              <AccountBalanceIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title={PHPPrice.format(data.total_amount)}
            subtitle="Total Investment"
            icon={
              <AccountBalanceIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          <StatPaper
            title={PHPPrice.format(data.monthly_investment)}
            subtitle="Monthly Investment"
            icon={
              <AccountBalanceIcon
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
            maxHeight: "500px",
          }}
        >
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ p: "10px 20px", borderBottom: "4px solid #141b2d" }}
          >
            SHARE CAPITAL INVESTMENT
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
                  Option
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
                  Investment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell align="center">{payment.id}</TableCell>
                  <TableCell align="center">{payment.option}</TableCell>
                  <TableCell align="center">
                    {payment.created_at}
                  </TableCell>
                  <TableCell align="center">
                    {PHPPrice.format(payment.amount)}
                  </TableCell>
                  <TableCell align="center">
                    {PHPPrice.format(payment.balance)}
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

export default ShareCapital;
