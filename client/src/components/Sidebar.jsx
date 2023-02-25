import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

// USER Icons
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useAccount } from "../contexts/account";

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<MenuItem active={selected === title} style={{ color: colors.grey[100] }} onClick={() => setSelected(title)} icon={icon}>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

const MemberNav = ({ selected, setSelected }) => {
	let { account, setAccount } = useAccount();

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<>
			<Typography variant="h4" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
				MEMBER
			</Typography>

			<Item title="Dashboard" to={`/member/${account.id}`} icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
			{account.status === "approved" && (
				<Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
					Loans
				</Typography>
			)}
			{account.status === "approved" && (
				<SubMenu title="Ledgers" label="Ledgers" icon={<ReceiptOutlinedIcon />} defaultOpen>
					<Item title="Share Capital" to={`/member/share-capital/${account.id}`} icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
					<Item title="Regular Loan" to={`/member/regular/${account.id}`} icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
					<Item title="Multi-Purpose Loan" to={`/member/multi-purpose/${account.id}`} icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
					<Item title="Appliance Loan" to={`/member/appliance/${account.id}`} icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
					<Item title="Balik-Eskwela Loan" to={`/member/balik-eskwela/${account.id}`} icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
					<Item title="Birthday Loan" to={`/member/birthday/${account.id}`} icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
					<Item title="Emergency Loan" to={`/member/emergency/${account.id}`} icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
				</SubMenu>
			)}
			{account.status === "approved" && <Item title="Loan Application" to={`/member/loan-application/${account.id}`} icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />}
			<Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
				Account
			</Typography>
			<Item title="My Account" to={`/member/account/${account.id}`} icon={<AccountCircleOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Log Out" onClick={() => setAccount(null)} to="/member/logout" icon={<LogoutOutlinedIcon />} selected={selected} setSelected={setSelected} />
		</>
	);
};

const LoanOfficerNav = ({ selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<>
			<Typography variant="h4" color={colors.redAccent[500]} sx={{ m: "15px 0 5px 20px" }}>
				LOAN OFFICER
			</Typography>
			<Item title="Dashboard" to="/loan-officer" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

			<Typography variant="h6" color={colors.redAccent[500]} sx={{ m: "15px 0 5px 20px" }}>
				Order of Deductions
			</Typography>
			<Item title="New Loans" to="/loan-officer/new-loans" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Updates of Loans" to="/loan-officer/updates-loans" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Typography variant="h6" color={colors.redAccent[500]} sx={{ m: "15px 0 5px 20px" }}>
				Actions
			</Typography>
			<Item title="Loan Payment" to="/loan-officer/loan-payment" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Share Capital Payment" to="/loan-officer/share-capital-payment" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Typography variant="h6" color={colors.redAccent[500]} sx={{ m: "15px 0 5px 20px" }}>
				Account
			</Typography>

			<Item title="Log Out" to="/loan-officer/logout" icon={<LogoutOutlinedIcon />} selected={selected} setSelected={setSelected} />
		</>
	);
};

const TreasurerNav = ({ selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<>
			<Typography variant="h4" color={colors.redAccent[500]} sx={{ m: "15px 0 5px 20px" }}>
				TREASURER
			</Typography>

			<Typography variant="h6" color={colors.redAccent[500]} sx={{ m: "15px 0 5px 20px" }}>
				Cash Flow Report
			</Typography>
			<Item title="Cash IN" to="/treasurer/cash-in" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Cash OUT" to="/treasurer/cash-out" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />

			<Typography variant="h6" color={colors.redAccent[500]} sx={{ m: "15px 0 5px 20px" }}>
				Account
			</Typography>
			<Item title="Log Out" to="/treasurer/logout" icon={<LogoutOutlinedIcon />} selected={selected} setSelected={setSelected} />
		</>
	);
};

const BoDNav = ({ selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<>
			<Typography variant="h4" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
				BOARD OF DIRECTOR
			</Typography>
			<Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
				Pendings
			</Typography>
			<Item title="Pending Members" to="/board-of-director/pending-members" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Pending Loans" to="/board-of-director/pending-loans" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
				Order of Deductions
			</Typography>
			<Item title="New Loans" to="/loan-officer/new-loans" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Updates of Loans" to="/loan-officer/updates-loans" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
				Cash Flow Report
			</Typography>
			<Item title="Cash IN" to="/treasurer/cash-in" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Cash OUT" to="/treasurer/cash-out" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
				Account
			</Typography>

			<Item title="Log Out" to="/loan-officer/logout" icon={<LogoutOutlinedIcon />} selected={selected} setSelected={setSelected} />
		</>
	);
};

const LoginNav = ({ selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<>
			<Typography variant="h3" fontWeight="bold" color={colors.redAccent[500]} sx={{ m: "15px 0 5px 20px" }}>
				MEMBER
			</Typography>
			<Item title="Login" to="/member/login" icon={<LoginOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Register" to="/member/register" icon={<AssignmentIndIcon />} selected={selected} setSelected={setSelected} />
			<Typography variant="h3" fontWeight="bold" color={colors.redAccent[500]} sx={{ m: "15px 0 5px 20px" }}>
				ADMIN
			</Typography>
			<Item title="Loan Officer" to="/loan-officer/login" icon={<LoginOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Treasurer" to="/treasurer/login" icon={<LoginOutlinedIcon />} selected={selected} setSelected={setSelected} />
			<Item title="Board of Director" to="/board-of-director/login" icon={<LoginOutlinedIcon />} selected={selected} setSelected={setSelected} />
		</>
	);
};

const Sidebar = () => {
	let { account, setAccount } = useAccount();

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState("Dashboard");

	return (
		<Box
			sx={{
				"& .pro-sidebar-inner": {
					background: `${colors.grey[800]} !important`,
					// position: "fixed",
				},
				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important",
				},
				"& .pro-inner-item": {
					padding: "5px 35px 5px 20px !important",
				},
				"& .pro-inner-item:hover": {
					color: "#C61F3B !important",
				},
				"& .pro-menu-item.active": {
					color: "#C61F3B !important",
				},
				"& .pro-sidebar.collapsed": {
					width: "95px",
				},
				"& .pro-inner-list-item": {
					backgroundColor: "inherit !important",
				},
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape="square">
					{/* LOGO & MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: "10px 0 20px 0",
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
								<img src="/TUP-MMPC-Logo-red.png" alt="are" style={{ width: "100%" }} />
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{/* PROFILE */}
					{account && !isCollapsed && (
						<Box mb="25px">
							<Box textAlign="center">
								<Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mt: "10px" }}>
									{account.name}
								</Typography>
								<Typography variant="h5" color={colors.redAccent[400]}>
									{account.position.toUpperCase()}
								</Typography>
							</Box>
						</Box>
					)}

					{/* MEMBER NAV */}
					{account?.position === "member" && <MemberNav selected={selected} setSelected={setSelected} />}

					{/* LOAN OFFICER NAV */}
					{account?.position === "loan-officer" && <LoanOfficerNav selected={selected} setSelected={setSelected} />}

					{/* TREASURER NAV */}
					{account?.position === "treasurer" && <TreasurerNav selected={selected} setSelected={setSelected} />}

					{/* BoD NAV */}
					{account?.position === "board-of-director" && <BoDNav selected={selected} setSelected={setSelected} />}

					{!account && <LoginNav selected={selected} setSelected={setSelected} />}
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;
