import { Box, Grid, useTheme } from "@mui/material";

import Header from "../../components/Header";
import StatPaper from "../../components/StatPaper";

import RecentActorsIcon from "@mui/icons-material/RecentActors";

import { tokens } from "../../theme";

let PHPPrice = new Intl.NumberFormat("en-PH", {
	style: "currency",
	currency: "PHP",
});

function Dashboard() {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box display="flex" flexDirection="column">
			<Header title="DASHBOARD" subtitle="This is the loan officer's dashboard." />
			<Grid container columnSpacing={2.5} rowSpacing={2.5}>
				<StatPaper title="23" subtitle="Pending Members" icon={<RecentActorsIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />} />
				<StatPaper title="40" subtitle="Pending Loans" icon={<RecentActorsIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />} />
				<StatPaper title="23" subtitle="New Members" icon={<RecentActorsIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />} />
				<StatPaper title="123123" subtitle="New Loans" icon={<RecentActorsIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />} />
				<StatPaper title="123123" subtitle="Monthly Deductions" icon={<RecentActorsIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />} />
				<StatPaper title="123123" subtitle="Monthly Share Capital Investment" icon={<RecentActorsIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />} />
			</Grid>
		</Box>
	);
}

export default Dashboard;
