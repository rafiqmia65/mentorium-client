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
          title: `You are successfully LogOut`,
          text: "You clicked the button!",
          icon: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allClasses"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teach"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Teach on Mentorium
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : ""
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
            isActive ? "text-primary font-bold" : ""
          }
        >
          About Us
        </NavLink>
      </li>
      {!user && (
        <div className="flex lg:hidden gap-2">
          <Link className="btn bg-primary text-white" to="/login">
            Login
          </Link>
          <Link className="btn bg-secondary text-white" to="/signUP">
            Sign Up
          </Link>
        </div>
      )}
    </>
  );

  return (
    <div className="fixed w-full top-0 left-0 z-50 bg-neutral shadow-sm">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
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
              </ul>
            </div>
            <MentoriumLogo></MentoriumLogo>
          </div>

          {/* Navbar Center (Desktop Menu) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal font-semibold px-1 gap-2">
              {links}
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end gap-2">
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
                    <Link to="/dashboard/profile">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden lg:flex gap-2">
                <Link className="btn bg-primary text-white" to="/login">
                  Login
                </Link>
                <Link className="btn bg-secondary text-white" to="/signUP">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
