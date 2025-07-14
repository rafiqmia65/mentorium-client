import React from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const GoogleAuth = () => {
  const { setUser, googleAuth } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleAuth = async () => {
    try {
      const result = await googleAuth();
      const newUser = result.user;

      // Check if user exists in DB
      const { data } = await axiosSecure.get(`/users/${newUser.email}`);

      if (!data.data) {
        // New user, add to database with role: student
        const saveUser = {
          name: newUser.displayName,
          email: newUser.email,
          photo: newUser.photoURL,
          role: "student",
          createdAt: new Date(),
        };

        await axiosSecure.post("/users", saveUser);
      }

      Swal.fire({
        title: `${newUser.displayName}, you are successfully Logged In`,
        icon: "success",
      });

      setUser(newUser);
      navigate(location.state?.from || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleAuth}
        className="btn btn-secondary w-full mt-4"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
