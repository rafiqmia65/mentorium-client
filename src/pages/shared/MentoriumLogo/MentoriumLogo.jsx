import React from "react";
import logo from "../../../assets/logo.png";

const MentoriumLogo = () => {
  return (
    <div className="flex items-end gap-2">
      <img src={logo} className="w-8 h-8 object-contain" alt="Mentorium" />
      <h3 className="text-2xl font-bold leading-tight text-primary">
        Mentorium
      </h3>
    </div>
  );
};

export default MentoriumLogo;
