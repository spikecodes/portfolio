import React from "react";
import { Mail, MapPin, ExternalLink } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="py-16 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-center sm:items-center sm:space-x-20">
        <div className="mb-6 sm:mb-0 text-left">
          <h3 className="text-2xl font-bold mb-3">Spike</h3>
          <div className="flex items-center mb-2 text-lg">
            <Mail className="mr-2 text-primary" size={20} />
            <a href="mailto:career@spike.codes" className="hover:underline">career@spike.codes</a>
          </div>
          <div className="flex items-center text-lg">
            <MapPin className="mr-2 text-primary" size={20} />
            <span>Irvine, CA</span>
          </div>
        </div>
        <div className="text-left">
          <h3 className="text-xl font-semibold mb-3">Made with</h3>
          <ul className="space-y-2 text-lg">
            {[
              { name: "React", url: "https://reactjs.org/" },
              { name: "Tailwind", url: "https://tailwindcss.com/" },
              { name: "Aceternity", url: "https://ui.aceternity.com/" },
            ].map((tech) => (
              <li key={tech.name}>
                <a
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline"
                >
                  {tech.name}
                  <ExternalLink className="ml-1" size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;