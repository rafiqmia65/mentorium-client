import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

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
    ],
  },
]);
