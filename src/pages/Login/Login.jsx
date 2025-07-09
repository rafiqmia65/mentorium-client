import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import GoogleAuth from "../shared/GoogleAuth/GoogleAuth";
import Lottie from "lottie-react";
import animation from "../../assets/authAnimation.json";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const loginUser = result.user;
        Swal.fire({
          title: `${loginUser.displayName}, you are successfully logged in!`,
          icon: "success",
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center p-6">
      <Helmet>
        <title>Mentorium - Login</title>
      </Helmet>

      <div className="w-full container flex flex-col lg:flex-row justify-around items-center gap-5">
        {/* Lottie Animation - on top in mobile/tablet, right in desktop */}
        <div className="w-1/3 mt-10 lg:mt-0 lg:w-1/3 order-1 lg:order-2">
          <Lottie animationData={animation} loop={true} />
        </div>

        {/* Login Form */}
        <div className="bg-base-100 p-8 lg:mt-14 rounded-xl shadow-2xl w-full max-w-md order-2 lg:order-1">
          <h2 className="text-2xl text-primary font-bold mb-6 text-center">
            Login Now!
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                required
              />
            </div>

            <button className="btn bg-primary hover:bg-button-hover text-white font-semibold w-full mt-6">
              Login
            </button>
          </form>

          <GoogleAuth />

          <p className="text-sm mt-3 text-text text-center">
            Don't have an account?{" "}
            <Link
              to="/signUp"
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
