import { createBrowserRouter } from "react-router";

import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  ResetPasswordPage,
  SignupPage,
  VerifyCodePage,
} from "@/pages";
import { ROUTE_PATHS } from "./route";
import App from "@/App";

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTE_PATHS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTE_PATHS.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: ROUTE_PATHS.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTE_PATHS.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        path: ROUTE_PATHS.VERIFY_CODE,
        element: <VerifyCodePage />,
      },
    ],
  },
]);
