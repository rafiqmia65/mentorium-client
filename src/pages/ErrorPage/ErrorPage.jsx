import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral px-6 text-text">
      <h1 className="text-9xl font-extrabold text-primary mb-6 select-none">
        404
      </h1>
      <p className="text-2xl md:text-3xl mb-4 font-semibold">
        Oops! Page Not Found
      </p>
      <p className="text-text-secondary mb-10 max-w-md text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center bg-primary text-base-100 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-button-hover transition"
      >
        <FaHome className="mr-2" /> Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
