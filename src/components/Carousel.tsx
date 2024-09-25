import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hackathon images
import ucb from "../assets/hackathons/ucb.png";
import aic from "../assets/hackathons/aic.jpg";
import ucla from "../assets/hackathons/ucla.jpg";
import nvc from "../assets/hackathons/nvc.jpg";

// Project images
import dispatchai from "../assets/projects/dispatchai.jpg";
import adapted from "../assets/projects/adapted.jpg";
import notive from "../assets/projects/notive.png";
import sentinel from "../assets/projects/sentinel.png";

interface CarouselItem {
  image: string;
  alt: string;
  tagline: string;
  description: string;
  hoverImage?: string; // New optional property for hover images
  projectUrl: string;
  projectName: string;
}

interface CarouselProps {
  onImageHover: (isHovering: boolean, hoverText: string) => void;
}

const carouselContent: CarouselItem[] = [
  {
    image: ucb,
    alt: "UC Berkeley AI Hackathon",
    tagline: "UC Berkeley AI Hackathon, <span class='font-normal'>June 2024</span>",
    description: "Presented our project <a href='https://devpost.com/software/dispatch-ai' target='_blank' rel='noopener noreferrer' class='inline-flex items-center hover:underline text-primary group'>DispatchAI</a> to an audience of 1000. Our team was awarded 1st Place Grand Prize and >$50,000 in investments and grants.",
    hoverImage: dispatchai,
    projectUrl: "https://devpost.com/software/dispatch-ai",
    projectName: "DispatchAI"
  },
  {
    image: aic,
    alt: "UCI AI Innovation Challenge",
    tagline: "UCI AI Innovation Challenge, <span class='font-normal'>January 2024</span>",
    description: "Won 1st place and $10,000 with our AI-driven project <a href='https://news.uci.edu/2024/02/02/uc-irvines-antrepreneur-center-announces-winners-of-ai-innovation-challenge/' target='_blank' rel='noopener noreferrer' class='inline-flex items-center hover:underline text-primary group'>Notive</a>, revolutionizing the student note-taking experience through innovative AI applications.",
    hoverImage: notive,
    projectUrl: "https://news.uci.edu/2024/02/02/uc-irvines-antrepreneur-center-announces-winners-of-ai-innovation-challenge/",
    projectName: "Notive"
  },
  {
    image: ucla,
    alt: "LAHacks Google Company Challenge",
    tagline: "LAHacks Google Company Challenge, <span class='font-normal'>April 2024</span>",
    description: "Secured 1st place (out of 142 teams) and $3000 with our project <a href='https://devpost.com/software/adapted' target='_blank' rel='noopener noreferrer' class='inline-flex items-center hover:underline text-primary group'>AdaptEd</a>, an adaptive, interactive, and personalized AI-powered lecture system.",
    hoverImage: adapted,
    projectUrl: "https://devpost.com/software/adapted",
    projectName: "AdaptEd"
  },
  {
    image: nvc,
    alt: "UCI Stella Zhang New Venture Competition",
    tagline: "UCI Stella Zhang New Venture Competition, <span class='font-normal'>May 2024</span>",
    description: "Won 1st place overall ($20,000) and 1st in Business Products and Services Track ($10,000) with our project <a href='#' class='inline-flex items-center hover:underline text-primary group'>Sentinel</a>, the first driver-conscious AI dashcam to detect distraction and fatigue.",
    hoverImage: sentinel,
    projectUrl: "#",
    projectName: "Sentinel"
  }
];

const Carousel: React.FC<CarouselProps> = ({ onImageHover }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselContent.length) % carouselContent.length);
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsHoveringLink(true);
  };

  const handleLinkLeave = () => {
    setIsHoveringLink(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHoveringLink) {
      setHoverPosition({
        x: e.clientX + 10, // 10px to the right
        y: e.clientY + 10, // 10px down
      });
    }
  };

  const handleDescriptionClick = () => {
    window.open(carouselContent[currentSlide].projectUrl, '_blank');
  };

  return (
    <>
      <motion.div
        className="relative rounded-3xl shadow-lg overflow-hidden h-[600px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={carouselContent[currentSlide].image}
            alt={carouselContent[currentSlide].alt}
            className="w-full h-full object-cover"
            draggable="false"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => onImageHover(true, " " + carouselContent[currentSlide].alt)}
            onMouseLeave={() => onImageHover(false, "")}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% sm:from-70% to-black opacity-70 pointer-events-none"></div>
        <div 
          ref={descriptionRef}
          className="absolute bottom-0 left-0 right-0 p-8 text-white"
          onClick={handleDescriptionClick}
        >
          <h3 className="text-2xl font-semibold mb-1" dangerouslySetInnerHTML={{ __html: carouselContent[currentSlide].tagline }}></h3>
          <p className="text-lg">
            {carouselContent[currentSlide].description.split(/<a.*?<\/a>/).map((text, index, array) => (
              <React.Fragment key={index}>
                {text}
                {index < array.length - 1 && (
                  <a
                    href={carouselContent[currentSlide].projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary group"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={handleLinkHover}
                    onMouseLeave={handleLinkLeave}
                    onMouseMove={handleMouseMove}
                  >
                    <span className="group-hover:underline">{carouselContent[currentSlide].projectName}</span>
                  </a>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </motion.div>
      {!isMobile && isHoveringLink && carouselContent[currentSlide].hoverImage && (
        <motion.div
          className="fixed rounded-lg overflow-hidden z-50 pointer-events-none"
          style={{
            left: hoverPosition.x,
            top: hoverPosition.y,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-black bg-opacity-50 backdrop-blur-md p-2 rounded-lg">
            <img
              src={carouselContent[currentSlide].hoverImage}
              alt="Project preview"
              className="w-64 h-auto rounded-md"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Carousel;