import React from "react";
import logo from "../../assets/logo.png";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral">
      <div className="relative w-24 h-24 mb-6">
        {/* Spinner */}
        <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin"></div>
        
        {/* Logo centered perfectly inside spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logo}
            alt="Mentorium Logo"
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>
      
      {/* Text below the spinner */}
      <p className="text-text text-xl font-semibold">
        Loading Mentorium...
      </p>
    </div>
  );
};

export default Loader;
