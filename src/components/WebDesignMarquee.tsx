import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

// Import images
import artistservices from '../assets/web-design/artistservices.png';
import ccad from '../assets/web-design/ccad.png';
import ccaf from '../assets/web-design/ccaf.png';
import cdi from '../assets/web-design/cdi.png';
import cowboybrothers from '../assets/web-design/cowboybrothers.png';
import dsp from '../assets/web-design/dsp.png';
import hhbc from '../assets/web-design/hhbc.png';
import lorisinger from '../assets/web-design/lorisinger.png';
import map from '../assets/web-design/map.png';

const projects = [
  { image: artistservices, name: 'ArtistServices Therapy', description: 'Web design & SEO', url: 'https://artistservicestherapy.com/' },
  { image: ccad, name: 'Culver City Arts District', description: 'Web design', url: 'http://culvercityartsdistrict.com/' },
  { image: map, name: 'Maximize Athletic Performance', description: 'Web design, Social Media, SEO', url: 'https://maximizeathleticperformance.com/' },
  { image: ccaf, name: 'Culver City Arts Foundation', description: 'Web design', url: 'https://culverarts.org/' },
  { image: lorisinger, name: 'Lori Singer', description: 'Web design', url: 'https://www.lorisinger.com/' },
  { image: cdi, name: 'California Dance Institute', description: 'Web design', url: '#' },
  { image: dsp, name: 'Director Survey Pro', description: 'Web design', url: 'https://directorsurveypro.com/' },
  { image: hhbc, name: 'Hamilton High Booster Club', description: 'Web design', url: 'https://sites.google.com/hamiltonboosterclub.org/hamiltonboosterclub/' },
  { image: cowboybrothers, name: 'Cowboy Brothers Detailing', description: 'Web design', url: 'https://cowboydetailing.com/' },
];

const WebDesignMarquee: React.FC = () => {
  // Double the projects array to ensure continuous loop
  const doubledProjects = [...projects, ...projects];

  // Calculate the total width of all projects
  const totalWidth = doubledProjects.length * 384; // 384px is w-96

  return (
    <div className="py-20 overflow-hidden w-full relative">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">Freelance Web Design</h2>
      <div className="flex justify-center mb-12">
        <div className="bg-primary bg-opacity-20 text-text-light dark:text-text-dark rounded-full px-4 py-2 flex items-center">
          <Info size={20} className="mr-2" />
          <span>Note: I'm no longer taking on new freelance projects.</span>
        </div>
      </div>
      <div className="relative">
        <div className="marquee-mask rotate-[-4deg] scale-110">
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              className="flex space-x-4 mb-4"
              animate={{
                x: index === 0 ? [-totalWidth, 0] : [0, -totalWidth],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                },
              }}
              style={{
                width: `${totalWidth}px`,
              }}
            >
              {doubledProjects.map((project, i) => (
                <a
                  key={i}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex-shrink-0 w-96 h-72 rounded-lg overflow-hidden group"
                  style={{
                    transform: `translateX(${index * 192}px)`, // Offset the second row by half the width of a project
                  }}
                >
                  <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-lg pointer-events-none"></div>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                    <h3 className="text-xl font-semibold text-center">{project.name}</h3>
                    <p className="text-sm mt-2 text-center">{project.description}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebDesignMarquee;