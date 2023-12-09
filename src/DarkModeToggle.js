import React, { useState, useEffect } from "react";
import moon from "./images/moon.svg";
import sun from "./images/sun.svg";
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="dark-mode-toggle" onClick={toggleDarkMode}>
      {isDarkMode ? <img src={sun} alt="sun" /> : <img src={moon} alt="moon" />}
    </div>
  );
};

export default DarkModeToggle;
