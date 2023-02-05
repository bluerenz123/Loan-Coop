import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";

import "./index.css";
import { AccountProvider } from "./contexts/account";

import Dashboard, {
  memberDashboardLoader,
} from "./routes/member/Dashboard";
import MemberLogin, { memberLoginAction } from "./routes/member/Login";
import Register, { registerAction } from "./routes/member/Register";
import ShareCapital, {
  shareCapitalLoader,
} from "./routes/member/ShareCapital";
import LoanOfficerLogin, {
  loanOfficerLoginAction,
} from "./routes/loan-officer/Login";
import LoanOfficerDashboard from "./routes/loan-officer/Dashboard";
import BoDLogin from "./routes/board-of-director/Login";
import TreasurerLogin from "./routes/treasurer/Login";
import Loan from "./routes/member/Loan";
import LoanApplication, {
  LoanApplicationAction,
} from "./routes/member/LoanApplication";
import ErrorPage from "./error-page";
import NewLoans from "./routes/loan-officer/NewLoans";
import UpdateLoans, {
  updateLoansLoader,
} from "./routes/loan-officer/UpdateLoans";
import CashOut from "./routes/treasurer/CashOut";
import CashIn from "./routes/treasurer/CashIn";
import PendingLoans, {
  pendingLoansLoader,
} from "./routes/loan-officer/PendingLoans";
import MyAccount from "./routes/member/MyAccount";
import PendingMembers, {
  pendingMembersLoader,
} from "./routes/loan-officer/PendingMembers";
import PendingMemberDetail, {
  pendingMemberDetailAction,
  pendingMemberDetailLoader,
} from "./routes/loan-officer/PendingMemberDetail";
import PendingLoanDetail, {
  pendingLoanDetailAction,
  pendingLoanDetailLoader,
} from "./routes/loan-officer/PendingLoanDetail";
import Logout from "./routes/Logout";
import ShareCapitalPayment, {
  shareCapitalPaymentAction,
  shareCapitalPaymentLoader,
} from "./routes/loan-officer/ShareCapitalPayment";
import LoanPayment, {
  loanPaymentAction,
  loanPaymentLoader,
} from "./routes/loan-officer/LoanPayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Error Page haiz</div>,
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
                path: "share-capital/:id",
                element: <ShareCapital />,
                loader: shareCapitalLoader,
              },
              {
                path: "regular-loan/:id",
                element: <Loan type="regular" />,
              },
              {
                path: "multi-purpose-loan/:id",
                element: <Loan type="multi-purpose" />,
              },
              {
                path: "appliance-loan/:id",
                element: <Loan type="appliance" />,
              },
              {
                path: "birthday-loan/:id",
                element: <Loan type="birthday" />,
              },
              {
                path: "balik-eskwela-loan/:id",
                element: <Loan type="balik-eskwela" />,
              },
              {
                path: "emergency-loan/:id",
                element: <Loan type="emergency" />,
              },
              {
                path: "loan-application/:id",
                element: <LoanApplication />,
                action: LoanApplicationAction,
                loader: memberDashboardLoader,
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
                path: "new-loans",
                element: <NewLoans />,
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
              },
              {
                path: "cash-out",
                element: <CashOut />,
              },
              {
                path: "login",
                element: <TreasurerLogin />,
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
                path: "login",
                element: <BoDLogin />,
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
