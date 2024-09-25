import { useState, useEffect, useRef } from "react";
import {
  motion,
  // useInView,
  useScroll,
  // useTransform,
  useMotionValue,
  // AnimatePresence,
} from "framer-motion";
import Lenis from '@studio-freight/lenis'
import { Navbar } from "./components/ui/navbar";
// import { ThemeToggle } from "./components/ui/theme-toggle";
// import {
//   Linkedin,
//   Github,
//   Mail,
//   Palette,
//   MapPin,
//   ExternalLink,
// } from "lucide-react";
import { StickyScroll } from "./components/ui/sticky-scroll-reveal";
// import profilePhoto from "./assets/profile-photo.jpg";
import { BackgroundBoxesDemo } from "./components/ui/background-boxes";
import Carousel from "./components/Carousel";
import WebDesignMarquee from "./components/WebDesignMarquee";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

// const fadeInUpVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const fadeInDownVariants = {
//   hidden: { opacity: 0, y: -20 },
//   visible: { opacity: 1, y: 0 },
// };

// const AnimatedSection = ({
//   children,
//   variants,
//   className,
// }: {
//   children: React.ReactNode;
//   variants: {
//     hidden: object;
//     visible: object;
//   };
//   className?: string;
// }) => {
//   const ref = useRef<HTMLElement | null>(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });

//   return (
//     <motion.section
//       ref={ref}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//       variants={variants}
//       transition={{ duration: 0.5 }}
//       className={className}
//     >
//       {children}
//     </motion.section>
//   );
// };

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check system preference and localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const { scrollY } = useScroll();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isOverInteractable, setIsOverInteractable] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (headerRef.current) {
        const headerHeight = (headerRef.current as HTMLElement).offsetHeight;
        setIsScrolled(latest > headerHeight);
      }
    });
  }, [scrollY]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"]')) {
        setIsOverInteractable(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"]')) {
        setIsOverInteractable(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleCarouselImageHover = (isHovering: boolean, hoverText: string) => {
    setIsHovering(isHovering);
    setIsHoveringImage(isHovering);
    setHoverText(hoverText);
  };

  const createCircularText = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        style={{
          transform: `rotate(${i * (360 / text.length)}deg) translateY(0px)`,
          color: isDark || isHoveringImage ? "white" : "black",
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div
      className={`pb-10 min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 ${isLargeScreen ? 'cursor-none' : ''}`}
    >
      <Navbar isScrolled={isScrolled} />

      <div className="absolute inset-0 hero-gradient -z-[0] w-full">
        <BackgroundBoxesDemo />
      </div>

      <div className="container-narrow relative">
        <Header ref={headerRef} isDark={isDark} toggleTheme={toggleTheme} />
        
        <div className="container-wide relative w-full overflow-hidden">
          <Carousel onImageHover={handleCarouselImageHover} />
        </div>

        <AboutMe />

        <section id="projects" className="w-full pt-12 sm:pt-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-center">
            Projects
          </h2>
          <StickyScroll />
        </section>
      </div>

      <WebDesignMarquee />

      <div className="container-narrow">
        <Experience />
        <CallToAction />
        <Footer />
      </div>

      {isLargeScreen && (
        <motion.div
          className={`custom-cursor ${
            isDark || isHoveringImage ? "dark-cursor" : ""
          } ${isHovering ? "hovering" : ""} ${
            isOverInteractable ? "over-interactable" : ""
          } ${isHoveringImage ? "image-hover" : ""}`}
          style={{
            left: cursorX,
            top: cursorY,
          }}
          animate={{
            scale: isPressed ? 0.8 : 1,
            backgroundColor: isPressed
              ? isDark || isHoveringImage
                ? "var(--primary)"
                : "var(--text-light)"
              : "transparent",
            borderColor:
              isDark || isHoveringImage ? "var(--primary)" : "var(--text-light)",
            borderWidth: isOverInteractable ? "3px" : isHovering ? "3px" : "2px",
            borderStyle: "solid",
          }}
          transition={{ duration: 0.1 }}
        >
          {isHovering && (
            <motion.div
              className={`cursor-text ${isHoveringImage ? "image-hover" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                color: isDark || isHoveringImage ? "white" : "black",
              }}
            >
              {createCircularText(hoverText)}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default App;
