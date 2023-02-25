import { useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";

// MUI Components
import { Box, Button, Grid, Paper, TextField, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";

import { tokens } from "../../theme";
import { http } from "../../http";
import { useAccount } from "../../contexts/account";

export async function loanOfficerLoginAction({ request }) {
	let formData = await request.formData();
	const data = Object.fromEntries(formData);

	let result = await http.post("/loan-officer/login", data).then((result) => result.data);

	return result;
}

function LoanOfficerLogin() {
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
			setAccount(user);
			navigate("/loan-officer");
		}
	}, [user]);

	return (
		<Box display="flex" flexDirection="column" height="100%">
			<Header title="LOGIN" subtitle="Loan Officer's Login" />
			<Box display="flex" flexDirection="column" height="100%" justifyContent="center" alignItems="center">
				<Paper
					component={Form}
					method="post"
					sx={{
						background: `${colors.grey[800]} !important`,
						p: "20px 30px 15px",
						width: {
							xs: "100%",
							sm: "400px",
							lg: "600px",
						},
					}}
				>
					<Typography variant="h3" sx={{ p: "0 0 20px" }}>
						Loan Officer Login Form
					</Typography>
					<Grid container columnSpacing={2.5} rowSpacing={2.5} pb="20px">
						<Grid item xs={12} lg={6}>
							<TextField name="email" label="Email" required defaultValue="" fullWidth />
						</Grid>
						<Grid item xs={12} lg={6}>
							<TextField name="password" type="password" label="Password" required defaultValue="" fullWidth />
						</Grid>
					</Grid>
					<Button
						type="submit"
						variant="contained"
						sx={{
							backgroundColor: `${colors.redAccent[500]} !important`,
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

export default LoanOfficerLogin;
