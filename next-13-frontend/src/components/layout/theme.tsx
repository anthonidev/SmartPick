"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
type Props = {};

const Theme = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { theme, setTheme } = useTheme();
  const toggleSwitch = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const renderThemeChanger = () => {
    if (!mounted) return null;
    // const currentTheme = theme === "system" ? systemTheme : theme;

    if (theme === "dark") {
      return (
        <SunIcon className="w-7 h-7 text-yellow-500 bg-white  rounded-full p-1" />
      );
    } else {
      return (
        <MoonIcon className="w-7 h-7 text-gray-900 bg-white rounded-full p-1" />
      );
    }
  };
  return (
    <div>
      {theme && mounted && (
        <div
          className={`flex items-center justify-center w-16 h-9  rounded-full p-1 ${
            theme === "dark" ? "bg-gray-400" : "bg-gray-900"
          }`}
          style={{
            justifyContent: theme === "dark" ? "flex-end" : "flex-start",
          }}
          onClick={toggleSwitch}
        >
          <motion.div
            className="w-7 h-7  rounded-full  "
            layout
            transition={spring}
          >
            {renderThemeChanger()}
          </motion.div>
        </div>
      )}
    </div>
  );
};
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
export default Theme;
