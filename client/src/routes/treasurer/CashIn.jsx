import { Decimal } from "decimal.js";
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
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddCardIcon from "@mui/icons-material/AddCard";
import { tokens } from "../../theme";
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
];

export async function cashInLoader() {
	let result = await http.get("/cash-ins").then((result) => result.data);
	return result;
}

const PHPPrice = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "PHP",
});

function CashIn() {
	const result = useLoaderData();
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<Box display="flex" flexDirection="column" height="100%">
			<Box display="flex" justifyContent="space-between">
				<Header title="CASH IN" subtitle="This is the cash-in monthly report" />
				<Box>[Option form of month-date]</Box>
			</Box>

			<Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
				<Grid container columnSpacing={2.5} rowSpacing={2.5} mb="20px">
					<StatPaper
						title={PHPPrice.format(result.reduce((i, cash_in) => i.add(cash_in.amount), new Decimal(0)).toString())}
						subtitle="Total Cash Deposit"
						icon={<AddCardIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />}
					/>
					<StatPaper
						title={PHPPrice.format(
							result
								.filter((cash_in) => cash_in.purpose === "otc")
								.reduce((i, cash_in) => i.add(cash_in.amount), new Decimal(0))
								.toString()
						)}
						subtitle="Over-The-Counter"
						icon={<PointOfSaleIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />}
					/>
					<StatPaper
						title={PHPPrice.format(
							result
								.filter((cash_in) => cash_in.purpose === "pay-slip")
								.reduce((i, cash_in) => i.add(cash_in.amount), new Decimal(0))
								.toString()
						)}
						subtitle="TUP Remittance"
						icon={<ReceiptLongIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />}
					/>
					<StatPaper
						title={PHPPrice.format(
							result
								.filter((cash_in) => cash_in.purpose === "share-capital")
								.reduce((i, cash_in) => i.add(cash_in.amount), new Decimal(0))
								.toString()
						)}
						subtitle="Share Capital"
						icon={<CurrencyExchangeIcon sx={{ color: colors.redAccent[500], fontSize: "26px" }} />}
					/>
				</Grid>
				<TableContainer
					component={Paper}
					elevation={5}
					sx={{
						background: colors.grey[800],
						"& .MuiTableCell-root": {
							borderBottom: `3px solid ${colors.grey[700]}`,
						},
						"& .MuiTableBody-root ": {
							borderBottom: `none`,
						},
						minHeight: "300px",
						maxHeight: "500px",
					}}
				>
					<Typography variant="h3" textAlign="center" sx={{ p: "10px 20px", borderBottom: `4px solid ${colors.grey[700]}` }}>
						Cash In Monthly Report
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
							{result.map((cash_in) => (
								<TableRow key={cash_in.id}>
									<TableCell align="center">{cash_in.date}</TableCell>
									<TableCell align="center">{cash_in.member.name}</TableCell>
									<TableCell align="center">{cash_in.purpose}</TableCell>
									<TableCell align="center">{cash_in._id}</TableCell>
									<TableCell align="center">{PHPPrice.format(cash_in.amount)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
}

export default CashIn;
