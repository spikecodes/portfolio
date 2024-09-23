import React from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  toggleTheme,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-primary p-2 rounded-full text-white"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};
