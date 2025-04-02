import React from "react";
import {
  Mail,
  Linkedin,
  Github,
  Palette,
  FileText,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  const socialIcons = [
    { href: "mailto:career@spike.codes", icon: Mail, label: "Email" },
    {
      href: "https://linkedin.com/in/spike-ocarroll",
      icon: Linkedin,
      label: "LinkedIn",
    },
    { href: "https://github.com/spikecodes", icon: Github, label: "GitHub" },
    { href: "https://behance.net/spikecodes", icon: Palette, label: "Behance" },
    { href: "/Spike_O'Carroll_Resume.pdf", icon: FileText, label: "Resume" },
  ];

  return (
    <footer className="py-8 pb-16 md:pb-8 mt-16">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-md font-semibold text-gray-500 dark:text-gray-300">
              © 2024 Spike O'Carroll. All rights reserved.
            </p>
            <p className="text-md text-gray-500 dark:text-gray-300">
              Built with{" "}
              <a
                href="https://react.dev/"
                className="text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 underline"
              >
                React
              </a>
              ,{" "}
              <a
                href="https://tailwindcss.com/"
                className="text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 underline"
              >
                Tailwind
              </a>
              , and{" "}
              <a
                href="https://aceternity.com/"
                className="text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 underline"
              >
                Aceternity
              </a>
              . Source available on{" "}
              <a
                href="https://github.com/spikecodes/portfolio"
                className="text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-2">
              <MapPin size={16} className="mr-2" />
              <span className="text-md">Irvine, CA</span>
            </div>
            <div className="flex space-x-4 mt-2">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 relative group"
                  title={social.label}
                >
                  <social.icon size={24} />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
