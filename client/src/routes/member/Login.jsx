import { useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";

// MUI Components
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";

import { tokens } from "../../theme";
import { http } from "../../http";
import { useAccount } from "../../contexts/account";

export async function memberLoginAction({ request }) {
  let formData = await request.formData();
  const data = Object.fromEntries(formData);

  let result = await http
    .post("/member/login", data)
    .then((result) => result.data);

  return result;
}

function Login() {
  const user = useActionData();
  const { setAccount } = useAccount();
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    console.log(user);
    if (user?.error) {
      console.log("User don't exist");
    }
    if (user?.email) {
      user.position = "member";
      setAccount(user);
      navigate(`/member/${user.id}`);
    }
  }, [user]);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header title="LOGIN" subtitle="Member's Login" />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          component={Form}
          method="post"
          sx={{
            background: `${colors.primary[400]} !important`,
            p: "20px 30px 15px",
            width: {
              xs: "100%",
              sm: "400px",
              lg: "600px",
            },
          }}
        >
          <Typography variant="h3" sx={{ p: "0 0 20px" }}>
            Member Login Form
          </Typography>
          <Grid container columnSpacing={2.5} rowSpacing={2.5} pb="20px">
            <Grid item xs={12} lg={6}>
              <TextField
                name="email"
                label="Email"
                required
                defaultValue=""
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="password"
                type="password"
                label="Password"
                required
                defaultValue=""
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: {
                xs: "100%",
              },
            }}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
