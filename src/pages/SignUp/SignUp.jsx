import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import GoogleAuth from "../shared/GoogleAuth/GoogleAuth";
import useAuth from "../../Hook/useAuth";
import Lottie from "lottie-react";
import animation from "../../assets/authAnimation.json";

const SignUp = () => {
  const { createUser, setUser, updateUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync: saveUserToServer, isLoading } = useMutation({
    mutationFn: async (userData) => {
      const res = await fetch(`${import.meta.env.VITE_serverUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "User save failed");
      return data;
    },
  });

  const onSubmit = async (data) => {
    const { name, email, password, photoUrl } = data;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must contain at least one uppercase, one lowercase, and be 6+ characters.",
      });
    }

    try {
      const result = await createUser(email, password);
      const newUser = result.user;

      const token = await newUser.getIdToken();
      localStorage.setItem("access-token", token);

      await updateUser({ displayName: name, photoURL: photoUrl });

      setUser({
        ...newUser,
        displayName: name,
        photoURL: photoUrl,
        accessToken: token,
      });

      await saveUserToServer({
        name,
        email,
        photo: photoUrl,
        role: "student",
        createdAt: new Date(),
      });

      Swal.fire({
        title: `${name}, your account has been created!`,
        icon: "success",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sign up failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center p-6">
      <Helmet>
        <title>Mentorium - Sign Up</title>
      </Helmet>

      <div className="w-full container flex flex-col lg:flex-row justify-around items-center gap-5">
        <div className="w-full lg:w-1/3 mt-10 lg:mt-0 order-1 lg:order-2">
          <Lottie animationData={animation} loop />
        </div>

        <div className="bg-base-100 p-8 lg:mt-16 rounded-xl shadow-2xl w-full max-w-md order-2 lg:order-1">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Sign Up Now!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="text-sm font-medium text-text mb-1 block">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="text-sm font-medium text-text mb-1 block">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Profile Photo URL"
                className="input input-bordered w-full"
                {...register("photoUrl", {
                  required: "Photo URL is required",
                })}
              />
              {errors.photoUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photoUrl.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="text-sm font-medium text-text mb-1 block">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="text-sm font-medium text-text mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "At least 1 uppercase, 1 lowercase, and 6+ characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-primary-content font-semibold w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <GoogleAuth />

          <p className="text-sm mt-4 text-text text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
