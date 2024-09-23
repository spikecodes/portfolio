import React from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
];

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md rounded-full shadow-md px-6 py-3"
      >
        <ul className="flex space-x-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};
