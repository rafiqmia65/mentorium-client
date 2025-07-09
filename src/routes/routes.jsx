import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import PrivateRoutes from "../routes/PrivateRoutes"
import TeachOnMentorium from "../pages/TeachOnMentorium/TeachOnMentorium";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signUp",
        Component: SignUp,
      },
      {
        path: "teach",
        element: <PrivateRoutes><TeachOnMentorium></TeachOnMentorium></PrivateRoutes>
      }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><DashboardLayouts></DashboardLayouts></PrivateRoutes>,
  },
]);
