import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import PrivateRoutes from "../routes/PrivateRoutes";
import TeachOnMentorium from "../pages/TeachOnMentorium/TeachOnMentorium";
import AdminRoutes from "./AdminRoutes";
import TeacherRequest from "../pages/Dashboard/AdminPages/TeacherRequest/TeacherRequest";
import Users from "../pages/Dashboard/AdminPages/Users/Users";
import TeacherRoutes from "./TeacherRoutes";
import AddClass from "../pages/Dashboard/TeacherPages/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/TeacherPages/MyClasses/MyClasses";
import AllClasses from "../pages/AllClasses/AllClasses";
import AdminAllClasses from "../pages/Dashboard/AdminPages/AdminAllClasses/AdminAllClasses";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import PaymentPage from "../pages/ClassDetails/PaymentPage/PaymentPage";
import StudentRoutes from "./StudentRoutes";
import MyEnrolledClasses from "../pages/Dashboard/StudentPages/MyEnrolledClasses/MyEnrolledClasses";

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
        path: "allClasses",
        Component: AllClasses,
      },
      {
        path: "enroll/:id",
        element: (
          <PrivateRoutes>
            <ClassDetails></ClassDetails>
          </PrivateRoutes>
        ),
      },
      // --- নতুন রুট: পেমেন্ট পেজ ---
      {
        path: "payment/:id", // :id দিয়ে ক্লাস ID নেওয়া হবে
        element: (
          <PrivateRoutes>
            <PaymentPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "teach",
        element: (
          <PrivateRoutes>
            <TeachOnMentorium></TeachOnMentorium>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRoutes>
    ),
    children: [
      // Only Admin Access Routes
      {
        path: "teacherRequest",
        element: (
          <AdminRoutes>
            <TeacherRequest></TeacherRequest>
          </AdminRoutes>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoutes>
            <Users></Users>
          </AdminRoutes>
        ),
      },
      {
        path: "adminAllClasses",
        element: (
          <AdminRoutes>
            <AdminAllClasses></AdminAllClasses>
          </AdminRoutes>
        ),
      },

      // Only Teacher access routes
      {
        path: "addClass",
        element: (
          <TeacherRoutes>
            <AddClass></AddClass>
          </TeacherRoutes>
        ),
      },
      {
        path: "myClass",
        element: (
          <TeacherRoutes>
            <MyClasses></MyClasses>
          </TeacherRoutes>
        ),
      },

      // Only student access Routes
      {
        path: "myEnrolledClass",
        element: (
          <StudentRoutes>
            <MyEnrolledClasses></MyEnrolledClasses>
          </StudentRoutes>
        ),
      },
    ],
  },
]);
