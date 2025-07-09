import React from "react";
import logo from "../../../assets/logo.png";

const LoaderPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral">
      <div className="relative w-24 h-24">
        {/* Spinner ring */}
        <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin"></div>

        {/* Logo centered inside spinner */}
        <img
          src={logo}
          alt="Mentorium Logo"
          className="relative w-16 h-16 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <p className="mt-6 text-text text-xl font-semibold text-center">
        Loading Mentorium...
      </p>
    </div>
  );
};

export default LoaderPage;
