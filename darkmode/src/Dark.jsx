import { useEffect, useState } from "react";

export default function DarkMode() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen transition-all duration-700
      ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-yellow-300"}`}
    >
      <h1 className="text-4xl font-bold mb-6">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </h1>
      <button
        onClick={toggleTheme}
        className="px-6 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
      >
        Toggle Theme
      </button>
    </div>
  );
}
