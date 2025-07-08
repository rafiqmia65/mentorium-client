import { Link, NavLink } from "react-router";
import DarkLightMode from "./DarkLightMode/DarkLightMode";
import logo from "../../../assets/logo.png";

const Navbar = () => {
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
    </>
  );

  return (
    <div className="fixed w-full top-0 left-0 z-50 bg-neutral shadow-sm">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost mr-2 lg:hidden">
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
            <div className="flex items-end gap-2">
              <img src={logo} className="w-8 h-8 object-contain" alt="Mentorium" />
              <h3 className="text-2xl font-bold leading-tight text-primary">
                Mentorium
              </h3>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
