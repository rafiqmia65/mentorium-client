import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkLightMode = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-secondary text-white hover:bg-secondary/80 hover:scale-110 transition-all duration-300 shadow-md"
    >
      {theme === "light" ? (
        <FaMoon className="text-sm" />
      ) : (
        <FaSun className="text-sm" />
      )}
    </button>
  );
};

export default DarkLightMode;
