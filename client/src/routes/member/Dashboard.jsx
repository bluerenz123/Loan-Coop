import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";

// Icons

import EmailOutlinedIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

import Header from "../../components/Header";
import StatPaper from "../../components/StatPaper";
import { useAccount } from "../../contexts/account";
import { http } from "../../http";
import { useLoaderData } from "react-router-dom";

const PHPPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export async function memberDashboardLoader({ params }) {
  let current_status = await http
    .get(`/current-status/${params.id}`)
    .then((result) => result.data);

  console.log(current_status);

  return current_status;
}

const Dashboard = () => {
  const current_status = useLoaderData();
  const { account } = useAccount();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Header
        title="DASHBOARD"
        subtitle="Welcome to your personal dashboard"
      />
      {account.status === "approved" ? (
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
        >
          <Grid container columnSpacing={2.5} rowSpacing={2.5}>
            <StatPaper
              title={PHPPrice.format(
                current_status.share_capital.total_amount
              )}
              subtitle="Share Capital Investment"
              icon={
                <AccountBalanceIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <StatPaper
              title={PHPPrice.format(current_status.total_balance)}
              subtitle="Total Loan Balance"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <StatPaper
              title={PHPPrice.format(
                current_status.total_monthly_deductions
              )}
              subtitle="Total Monthly Deductions"
              icon={
                <PaymentIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <StatPaper
              title={current_status.current_loans.length}
              subtitle="Active Loans"
              icon={
                <RequestQuoteIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            <Grid item xs={12} />
          </Grid>
        </Box>
      ) : (
        <Typography vairant="h3">
          Your account is still pending. please come back again...
        </Typography>
      )}
    </Box>
  );
};

export default Dashboard;
