"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Project logos
import stotra_logo from "../../assets/projects/stotra_logo.png";
import libreddit_logo from "../../assets/projects/libreddit_logo.png";
import peacock_logo from "../../assets/projects/peacock_logo.png";

// Project images
import stotra from "../../assets/projects/stotra.png";
import libreddit from "../../assets/projects/libreddit.png";
import peacock from "../../assets/projects/peacock.png";

interface ContentType {
  title: string;
  date: string;
  description: string;
  icon: string;
  image: string;
  url: string;
}

const projects: ContentType[] = [
  {
    title: "Stotra: Multiplayer Stock Trade Simulator",
    date: "Jul 2023 – Aug 2023",
    description:
      "Developed a real-time stock trading simulator utilizing React with TypeScript for the frontend and Node.js/Express for the backend. The project included constructing an OpenAPI 3.0-compliant API with JWT authentication to interface with MongoDB and third-party APIs. AWS services were leveraged to host the backend (EC2, CloudFormation, Cloudfront) and deploy the frontend on AWS Amplify, demonstrating proficiency in full-stack development and cloud deployment.",
    icon: stotra_logo,
    image: stotra,
    url: "https://github.com/spikecodes/stotra",
  },
  {
    title: "Libreddit: Private Frontend for Reddit",
    date: "Jun 2020 – Jul 2023",
    description:
      "Developed a full-stack web application using Rust, providing speedy and private Reddit access to 4,000,000 users per month. The project involved creating a custom HTTP2 client/server, which provided users with a 'Time to Interactive' of 2.8 seconds, significantly faster than Reddit's 12.4 seconds. A project network of over 100 Libreddit instances hosted by volunteers worldwide was formed",
    icon: libreddit_logo,
    image: libreddit,
    url: "https://github.com/libreddit/libreddit",
  },
  {
    title: "Peacock: The Privacy Web Browser",
    date: "Aug 2022 – Present",
    description:
      "Developed an experimental private-by-default web browser using Electron, JavaScript, and Node.js to gain a deeper understanding of Internet protocols and browser architecture. The project has garnered significant interest, with over 25,000 downloads on GitHub",
    icon: peacock_logo,
    image: peacock,
    url: "https://github.com/spikecodes/peacock",
  },
];

export const StickyScroll = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollFraction = scrollYProgress.get();
      const newActiveCard = Math.floor(scrollFraction * projects.length);
      setActiveCard(newActiveCard);
    };

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    const unsubscribe = scrollYProgress.onChange(handleScroll);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="w-full">
          {projects.map((item, index) => (
            <motion.div
              key={item.title}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, y: "50%" }}
              animate={{
                opacity: index === activeCard ? 1 : isMobile ? 0 : 0.3,
                y: `${(index - activeCard) * 60}%`,
                display: isMobile && index !== activeCard ? "none" : "flex",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="space-y-4">
                    <img
                      src={item.icon}
                      alt={`${item.title} icon`}
                      className="w-12 h-12 rounded-full mb-2"
                    />
                    <h3 className="text-2xl font-bold group">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center group"
                      >
                        <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] group-hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-all duration-500">
                          {item.title.split(":")[0]}
                          {item.title.includes(":") && ":"}
                          <span className="font-normal">
                            {item.title.split(":")[1]}
                          </span>
                        </span>
                        <ExternalLink size={18} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <p className="text-base">{item.description}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
