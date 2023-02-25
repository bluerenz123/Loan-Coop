import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Root from "./routes/root";

import "./index.css";
import { AccountProvider } from "./contexts/account";

import Dashboard, { memberDashboardLoader } from "./routes/member/Dashboard";
import MemberLogin, { memberLoginAction } from "./routes/member/Login";
import Register, { registerAction } from "./routes/member/Register";
import ShareCapital, { shareCapitalLoader } from "./routes/member/ShareCapital";
import LoanOfficerLogin, { loanOfficerLoginAction } from "./routes/loan-officer/Login";
import LoanOfficerDashboard from "./routes/loan-officer/Dashboard";
import BoDLogin, { bodAction } from "./routes/board-of-director/Login";
import TreasurerLogin, { treasurerAction } from "./routes/treasurer/Login";
import Loan, { loanLoader } from "./routes/member/Loan";
import LoanApplication, { LoanApplicationAction, LoanApplicationLoader } from "./routes/member/LoanApplication";
import ErrorPage from "./error-page";
import NewLoans, { newLoansLoader } from "./routes/loan-officer/NewLoans";
import UpdateLoans, { updateLoansLoader } from "./routes/loan-officer/UpdateLoans";
import CashOut, { cashOutLoader } from "./routes/treasurer/CashOut";
import CashIn, { cashInLoader } from "./routes/treasurer/CashIn";
import PendingLoans, { pendingLoansLoader } from "./routes/board-of-director/PendingLoans";
import MyAccount from "./routes/member/MyAccount";
import PendingMembers, { pendingMembersLoader } from "./routes/board-of-director/PendingMembers";
import PendingMemberDetail, { pendingMemberDetailAction, pendingMemberDetailLoader } from "./routes/board-of-director/PendingMemberDetail";
import PendingLoanDetail, { pendingLoanDetailAction, pendingLoanDetailLoader } from "./routes/board-of-director/PendingLoanDetail";
import Logout from "./routes/Logout";
import ShareCapitalPayment, { shareCapitalPaymentAction, shareCapitalPaymentLoader } from "./routes/loan-officer/ShareCapitalPayment";
import LoanPayment, { loanPaymentAction, loanPaymentLoader } from "./routes/loan-officer/LoanPayment";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		/* 	loader: async () => {
			return redirect("/member/login");
		}, */
		errorElement: <div>Error Page</div>,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <Dashboard />,
					},
					{
						path: "member",
						children: [
							{
								path: ":id",
								element: <Dashboard />,
								loader: memberDashboardLoader,
							},
							{
								path: ":loan_type/:member_id",
								element: <Loan />,
								loader: loanLoader,
							},
							{
								path: "share-capital/:id",
								element: <ShareCapital />,
								loader: shareCapitalLoader,
							},
							{
								path: "loan-application/:id",
								element: <LoanApplication />,
								loader: LoanApplicationLoader,
								action: LoanApplicationAction,
							},
							{
								path: "account/:id",
								element: <MyAccount />,
							},
							{
								path: "register",
								element: <Register />,
								action: registerAction,
							},
							{
								path: "login",
								element: <MemberLogin />,
								action: memberLoginAction,
							},
							{
								path: "logout",
								element: <Logout />,
							},
						],
					},
					{
						path: "loan-officer",
						children: [
							{
								index: true,
								element: <LoanOfficerDashboard />,
							},

							{
								path: "new-loans",
								element: <NewLoans />,
								loader: newLoansLoader,
							},
							{
								path: "updates-loans",
								element: <UpdateLoans />,
								loader: updateLoansLoader,
							},
							{
								path: "loan-payment",
								element: <LoanPayment />,
								loader: loanPaymentLoader,
								action: loanPaymentAction,
							},
							{
								path: "share-capital-payment",
								element: <ShareCapitalPayment />,
								loader: shareCapitalPaymentLoader,
								action: shareCapitalPaymentAction,
							},
							{
								path: "login",
								element: <LoanOfficerLogin />,
								action: loanOfficerLoginAction,
							},
							{
								path: "logout",
								element: <Logout />,
							},
						],
					},
					{
						path: "treasurer",
						children: [
							{
								index: true,
								element: <>Treasurer's dashboard</>,
							},
							{
								path: "cash-in",
								element: <CashIn />,
								loader: cashInLoader,
							},
							{
								path: "cash-out",
								element: <CashOut />,
								loader: cashOutLoader,
							},
							{
								path: "login",
								element: <TreasurerLogin />,
								action: treasurerAction,
							},
							{
								path: "logout",
								element: <Logout />,
							},
						],
					},
					{
						path: "board-of-director",
						children: [
							{
								index: true,
								element: <>This is Board of Director's route</>,
							},
							{
								path: "pending-members",
								element: <PendingMembers />,
								loader: pendingMembersLoader,
							},
							{
								path: "pending-member/:member_id",
								element: <PendingMemberDetail />,
								loader: pendingMemberDetailLoader,
								action: pendingMemberDetailAction,
							},
							{
								path: "pending-loans",
								element: <PendingLoans />,
								loader: pendingLoansLoader,
							},
							{
								path: "pending-loan/:loan_id",
								element: <PendingLoanDetail />,
								loader: pendingLoanDetailLoader,
								action: pendingLoanDetailAction,
							},
							{
								path: "login",
								element: <BoDLogin />,
								action: bodAction,
							},
							{
								path: "logout",
								element: <Logout />,
							},
						],
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AccountProvider>
			<RouterProvider router={router} />
		</AccountProvider>
	</React.StrictMode>
);
