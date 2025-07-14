import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import MentoriumLogo from "../pages/shared/MentoriumLogo/MentoriumLogo";
import DarkLightMode from "../pages/shared/Navbar/DarkLightMode/DarkLightMode";
import useUserRole from "../Hook/useUserRole";
import Loader from "../pages/Loader/Loader";

const DashboardLayouts = () => {
  const { role, roleLoading } = useUserRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  // 🛑 Loader while role is fetching
  if (roleLoading) {
    return <Loader></Loader>;
  }

  // NavLinks
  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-primary ${isActive ? "text-primary font-bold" : ""}`
          }
        >
          Back to Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `hover:text-primary ${isActive ? "text-primary font-bold" : ""}`
          }
        >
          My Profile
        </NavLink>
      </li>

      {/* Admin Links */}
      {!roleLoading && role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard/teacherRequest"
              className={({ isActive }) =>
                `hover:text-primary ${isActive ? "text-primary font-bold" : ""}`
              }
            >
              Teacher Request
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `hover:text-primary ${isActive ? "text-primary font-bold" : ""}`
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/adminAllClasses"
              className={({ isActive }) =>
                `hover:text-primary ${isActive ? "text-primary font-bold" : ""}`
              }
            >
              All Classes
            </NavLink>
          </li>
        </>
      )}

      {/* Teacher Links */}
      {!roleLoading && role === "teacher" && (
        <>
          <li>
            <NavLink
              to="/dashboard/addClass"
              className={({ isActive }) =>
                `hover:text-primary ${isActive ? "text-primary font-bold" : ""}`
              }
            >
              Add Class
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/myClass"
              className={({ isActive }) =>
                `hover:text-primary ${isActive ? "text-primary font-bold" : ""}`
              }
            >
              My Class
            </NavLink>
          </li>
        </>
      )}

      {/* Student Links */}
      {!roleLoading && role === "student" && (
        <>
          <li>
            <NavLink
              to="/dashboard/myEnrolledClass"
              className={({ isActive }) =>
                `hover:text-primary ${isActive ? "text-primary font-bold" : ""}`
              }
            >
              My Enroll Class
            </NavLink>
          </li>
        </>
      )}

      {/* Fallback for unknown roles */}
      {!roleLoading && !["admin", "teacher", "student"].includes(role) && (
        <li className="text-warning">
          No dashboard items available for your role
        </li>
      )}
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-base-100 shadow-lg flex-col p-5 z-30">
        <div className="flex justify-between gap-12 items-center">
          <MentoriumLogo />
          <DarkLightMode />
        </div>
        <ul className="space-y-2 mt-10 font-medium">{Links}</ul>
      </aside>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed w-full z-50 shadow-md flex justify-between items-center px-4 py-3 bg-base-100">
        <div className="flex gap-3 items-center">
          <button
            onClick={toggleDrawer}
            aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          >
            {isDrawerOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
          <DarkLightMode />
        </div>
        <MentoriumLogo />
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg z-40 p-6 transition-transform duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-4 mt-16" onClick={closeDrawer}>
          {Links}
        </ul>
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-16 lg:mt-0 min-h-[100dvh] lg:ml-64 overflow-x-auto overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayouts;
