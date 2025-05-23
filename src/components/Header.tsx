import React from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ui/theme-toggle";
import profilePhoto from "../assets/profile-photo.jpg";
import { Mail, Linkedin, Github, Palette, FileText } from "lucide-react";

const fadeInDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ isDark, toggleTheme }, ref) => {
    const socialIcons = [
      { href: "mailto:career@spike.codes", icon: Mail, label: "Email" },
      {
        href: "https://linkedin.com/in/spike-ocarroll",
        icon: Linkedin,
        label: "LinkedIn",
      },
      { href: "https://github.com/spikecodes", icon: Github, label: "GitHub" },
      {
        href: "https://behance.net/spikecodes",
        icon: Palette,
        label: "Behance",
      },
      { href: "/Spike_O'Carroll_Resume.pdf", icon: FileText, label: "Resume" },
    ];

    return (
      <div className="-z-[-2] relative">
        <motion.section
          variants={fadeInDownVariants}
          animate="visible"
          initial="hidden"
          className=""
        >
          <div ref={ref} className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img
                src={profilePhoto}
                alt="Spike O'Carroll"
                className="w-12 h-12 rounded-full mr-5"
                draggable="false"
              />
              <span className="font-medium text-xl">Spike O'Carroll</span>
            </div>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
        </motion.section>

        <motion.section
          variants={fadeInUpVariants}
          animate="visible"
          initial="hidden"
          className="pt-24 pb-16 min-h-[70vh] flex flex-col justify-center"
        >
          <motion.h1
            variants={fadeInUpVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 font-display tracking-tight leading-tight pointer-events-none"
          >
            Full-stack developer,{" "}
            <span className="dark:animate-gradient dark:bg-gradient-to-r dark:from-primary-light dark:to-primary-dark bg-primary-dark bg-[length:200%_200%] bg-clip-text text-transparent playfair-display-italic">
              designer
            </span>{" "}
            and
            <br /> aspiring entrepreneur
          </motion.h1>
          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.label === "Resume" ? "_blank" : undefined}
                rel={
                  social.label === "Resume" ? "noopener noreferrer" : undefined
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon hover:bg-primary/10 dark:hover:bg-primary/20 relative group pointer-events-auto"
              >
                <social.icon size={24} className="sm:w-6 sm:h-6" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-500 pointer-events-none">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
          <div className="flex justify-end">
            <motion.a
              href="mailto:career@spike.codes"
              variants={fadeInUpVariants}
              className="btn bg-primary text-text-light hover:bg-primary-dark hover:text-white dark:hover:bg-primary-light transition-colors group"
              whileHover={{ scale: 1.05 }}
            >
              Get in touch
              <motion.div className="ml-2 w-8 h-8 rounded-full bg-transparent flex items-center justify-center overflow-hidden group-hover:bg-white">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-text-light group-hover:text-text-light group-hover:-rotate-45 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </motion.div>
            </motion.a>
          </div>
        </motion.section>
      </div>
    );
  }
);

export default Header;
