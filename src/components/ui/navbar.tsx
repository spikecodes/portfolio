import React from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
];

interface NavbarProps {
  isScrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50"
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.5 }}
      style={{ transform: "translateX(-50%)" }}
    >
      <div className="bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md rounded-full shadow-md px-6 py-3">
        <ul className="flex items-center justify-center space-x-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 cursor-none"
              >
                {item.name}
              </a>
            </li>
          ))}
          <motion.li
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: isScrolled ? 1 : 0,
              width: isScrolled ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <button className="bg-primary text-text-light px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap hover:bg-primary-dark transition-colors cursor-none">
              Contact
            </button>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  );
};
