import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
];

interface NavbarProps {
  isScrolled: boolean;
}

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      d={isOpen ? "M18 6L6 18M6 6L18 18" : "M4 6h16M4 12h16M4 18h16"}
      animate={{
        d: isOpen ? "M18 6L6 18M6 6L18 18" : "M4 6h16M4 12h16M4 18h16",
      }}
      transition={{ duration: 0.3 }}
    />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 z-50 w-full sm:w-auto max-w-[95vw]"
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 0.5 }}
        style={{ transform: "translateX(-50%)" }}
      >
        {/* Desktop Menu */}
        <div
          className={`hidden sm:block bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md rounded-full ${
            isScrolled ? "shadow-md" : ""
          } px-6 py-3`}
        >
          <ul
            className="flex items-center justify-center space-x-2 relative"
            onMouseLeave={() => {
              setPosition((pv) => ({
                ...pv,
                opacity: 0,
              }));
            }}
          >
            {navItems.map((item) => (
              <Tab key={item.name} setPosition={setPosition} href={item.href}>
                {item.name}
              </Tab>
            ))}
            <motion.li
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: isScrolled ? 1 : 0,
                width: isScrolled ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="mailto:career@spike.codes"
                className="inline-block bg-primary text-text-light px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap hover:bg-primary-dark transition-colors cursor-none"
              >
                Contact
              </a>
            </motion.li>
            <Cursor position={position} />
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Menu Button and Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="relative flex justify-center">
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md rounded-t-3xl shadow-lg"></div>
          <button
            onClick={toggleMenu}
            className="relative z-10 w-14 h-14 rounded-full bg-primary text-text-light flex items-center justify-center shadow-lg mb-3"
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sm:hidden fixed bottom-24 left-4 right-4 bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden z-40"
          >
            <ul className="py-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block px-6 py-3 text-lg font-medium transition-colors text-gray-900 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="px-6 pt-2 pb-4">
                <button
                  className="w-full px-4 py-3 text-lg font-medium bg-primary text-text-light hover:bg-primary-dark transition-colors rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Add these interfaces
interface TabProps {
  children: React.ReactNode;
  setPosition: (position: { left: number; width: number; opacity: number }) => void;
  href: string;
}

interface CursorProps {
  position: { left: number; width: number; opacity: number };
}

const Tab: React.FC<TabProps> = ({ children, setPosition, href }) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft - 8,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10"
    >
      <a
        href={href}
        className="block px-4 py-2 rounded-full text-md font-medium transition-colors text-gray-900 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-none"
      >
        {children}
      </a>
    </li>
  );
};

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-full rounded-full bg-gray-200 dark:bg-gray-700"
    />
  );
};

export default Navbar;
