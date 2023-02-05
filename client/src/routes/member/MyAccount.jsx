import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { useAccount } from "../../contexts/account";

import { tokens } from "../../theme";

function MyAccount() {
  const { account } = useAccount();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header
        title="MY ACCOUNT"
        subtitle="This is your profile information"
      />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          sx={{
            background: `${colors.primary[400]} !important`,
            p: "20px 30px 15px",
            width: {
              xs: "100%",
              md: "700px",
              lg: "800px",
            },
          }}
        >
          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Profile Information
          </Typography>
          <Grid container columnSpacing={2.5} rowSpacing={2.5} pb="20px">
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                value={account.first_name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                value={account.last_name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="department"
                label="Department"
                value="COS"
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Account Information
          </Typography>

          <Grid container columnSpacing={2.5} rowSpacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                value={account.email}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                type="password"
                label="password"
                value={account.password}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default MyAccount;
