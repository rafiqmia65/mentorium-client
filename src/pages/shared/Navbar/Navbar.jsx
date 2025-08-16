import { Link, NavLink, useNavigate } from "react-router";
import DarkLightMode from "./DarkLightMode/DarkLightMode";
import useAuth from "../../../Hook/useAuth";
import Swal from "sweetalert2";
import MentoriumLogo from "../MentoriumLogo/MentoriumLogo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("access-token");
        Swal.fire({
          title: `You are successfully logged out`,
          icon: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  // Navbar links
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-text"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allClasses"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-text"
          }
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teach"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-text"
          }
        >
          Teach on Mentorium
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard/dashboard"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "text-text"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-text"
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  // Auth Buttons (Login / Sign Up)
  const AuthButtons = (
    <>
      <Link
        to="/login"
        className="btn bg-secondary text-white w-full lg:w-auto hover:bg-secondary/80 transition-colors duration-300"
      >
        Login
      </Link>
      <Link
        to="/signUP"
        className="btn bg-secondary text-white w-full lg:w-auto hover:bg-secondary/80 transition-colors duration-300"
      >
        Sign Up
      </Link>
    </>
  );

  return (
    <div className="fixed w-full top-0 left-0 z-50 bg-neutral shadow-sm">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            {/* Mobile dropdown */}
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost mr-2 lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content font-semibold mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {links}
                {!user && (
                  <div className="flex flex-col gap-2 mt-2">{AuthButtons}</div>
                )}
              </ul>
            </div>
            <a href="/">
              <MentoriumLogo />
            </a>
          </div>

          {/* Navbar Center (Desktop Menu) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal font-semibold px-1 gap-2">
              {links}
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end flex gap-2">
            <DarkLightMode />
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border-2 border-primary-content">
                    <img src={user.photoURL || "/avatar.png"} alt="User" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li className="text-center font-semibold text-lg pointer-events-none text-primary">
                    {user.displayName || "User"}
                  </li>
                  <li>
                    <Link to="/dashboard/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden lg:flex gap-2">{AuthButtons}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
