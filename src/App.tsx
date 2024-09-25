import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { Navbar } from "./components/ui/navbar";
import { ThemeToggle } from "./components/ui/theme-toggle";
import {
  Linkedin,
  Github,
  Mail,
  Palette,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { StickyScroll } from "./components/ui/sticky-scroll-reveal";
import profilePhoto from "./assets/profile-photo.jpg";
import { BackgroundBoxesDemo } from "./components/ui/background-boxes";
import Carousel from "./components/Carousel";
import WebDesignMarquee from "./components/WebDesignMarquee";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedSection = ({
  children,
  variants,
  className,
}: {
  children: React.ReactNode;
  variants: {
    hidden: object;
    visible: object;
  };
  className?: string;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (headerRef.current) {
        const headerHeight = (headerRef.current as HTMLElement).offsetHeight;
        setIsScrolled(latest > headerHeight);
      }
    });
  }, [scrollY]);

  const navbarWidth = useTransform(
    scrollY,
    [0, 100],
    ["calc(100% - 120px)", "100%"]
  );

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isOverInteractable, setIsOverInteractable] = useState(false);

  useEffect(() => {
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

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

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

  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const handleCarouselImageHover = (isHovering: boolean, hoverText: string) => {
    setIsHovering(isHovering);
    setIsHoveringImage(isHovering);
    setHoverText(hoverText);
  };

  return (
    <div
      className={`min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 cursor-none`}
    >
      <Navbar isScrolled={isScrolled} />

      <div className="absolute inset-0 hero-gradient -z-[0] w-full">
        <BackgroundBoxesDemo />
      </div>
      {/* <div className="absolute inset-0 -z-[-1] w-full"></div> */}
      <div className="container-narrow relative">
        <div className="-z-[-2] relative">
          <AnimatedSection variants={fadeInDownVariants} className="">
            <div
              ref={headerRef}
              className="flex justify-between items-center py-6"
            >
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
          </AnimatedSection>

          <AnimatedSection
            variants={fadeInUpVariants}
            className="pt-24 pb-16 min-h-[70vh] flex flex-col justify-center"
          >
            <motion.h1
              variants={fadeInUpVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 font-display tracking-tight leading-tight"
            >
              Full-stack developer,{" "}
              <span className="animate-gradient bg-gradient-to-r from-primary via-primary-light to-primary-dark bg-[length:200%_200%] bg-clip-text text-transparent playfair-display-italic">
                designer
              </span>{" "}
              and
              <br /> aspiring entrepreneur
            </motion.h1>
            <motion.div
              variants={fadeInUpVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              {[
                {
                  href: "mailto:career@spike.codes",
                  icon: Mail,
                  label: "",
                },
                {
                  href: "https://linkedin.com/in/spike-ocarroll",
                  icon: Linkedin,
                  label: "",
                },
                {
                  href: "https://github.com/spikecodes",
                  icon: Github,
                  label: "",
                },
                {
                  href: "https://behance.net/spikecodes",
                  icon: Palette,
                  label: "",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="social-icon hover:bg-primary/10 dark:hover:bg-primary/20"
                >
                  <social.icon size={24} className="sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </motion.div>
            <div className="flex justify-end">
              <motion.button
                variants={fadeInUpVariants}
                className="btn bg-primary text-text-light hover:bg-primary-dark dark:hover:bg-primary-light transition-colors group"
                whileHover={{ scale: 1.05 }}
              >
                Get in touch
                <motion.div
                  className="ml-2 w-8 h-8 rounded-full bg-transparent flex items-center justify-center overflow-hidden group-hover:bg-white"
                  animate={{ rotate: 0 }}
                  whileHover={{ rotate: -45 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-text-light group-hover:text-text-light"
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
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="container-wide relative w-full overflow-hidden">
        <Carousel onImageHover={handleCarouselImageHover} />
      </div>

      <div className="container-narrow" id="about">
        <AnimatedSection variants={fadeInUpVariants}>
          <div className="mt-20 mb-12">
            <motion.h2
              variants={fadeInUpVariants}
              className="text-2xl sm:text-3xl font-semibold mb-4"
            >
              About Me
            </motion.h2>
            <motion.p
              variants={fadeInUpVariants}
              className="text-base sm:text-lg"
            >
              I'm a Computer Science student at UC Irvine with a passion for
              full-stack development and AI. I love badminton, hackathons, and
              building innovative consumer products.
            </motion.p>
          </div>
        </AnimatedSection>

        <section id="projects" className="w-full pt-12 sm:pt-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8">
            Projects
          </h2>
          <StickyScroll />
        </section>
      </div>

      {/* WebDesignMarquee component outside of any container */}
      <WebDesignMarquee />

      <div className="container-narrow">
        <section className="w-full py-12 sm:py-16 bg-background-light dark:bg-background-dark">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {[
              {
                title: "Full Stack Software Intern",
                company: "Portal AI",
                date: "Dec 2023 – Present",
                responsibilities: [
                  "Shipped 80+ features to a venture-backed startup's AI web browser and LLM interface serving 30,000 users/mo",
                  "Built a high-performance vector database in Rust with SQL query support and cloud syncing with Postgres server",
                  "Launched a conversational voice AI in Python with < 600ms latency, web agent capabilities, and RAG",
                  "Worked closely with fast-paced teams to develop Electron-based browser in Node, TypeScript, React, and Tailwind",
                ],
              },
              {
                title: "Freelance Web Designer and Developer",
                company: "Self-employed",
                date: "Nov 2021 – Dec 2023",
                responsibilities: [
                  "Created high-converting websites for businesses and public figures using Webflow, Figma, and Framer",
                  "Organically increased web traffic by 2-3x for more than 90% of clients through maximizing SEO and page speed",
                  "Designed stunning landing pages and 0→1 web branding featured in 32 Behance and Dribbble collections",
                ],
              },
              {
                title: "Frontend and Webmaster Intern",
                company: "Maximize Athletic Performance",
                date: "Mar 2023 – Nov 2023",
                responsibilities: [
                  "Designed and maintained website, Shopify store, and JotForm assessment form for private gym",
                  "Architected automation pipelines saving 10 hours/week on client processing using webhooks and Zapier",
                ],
              },
            ].map((job, index, array) => (
              <div key={index}>
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-semibold">
                        {job.title}
                      </h3>
                      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-1">
                        {job.company}
                      </p>
                    </div>
                    <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">
                      {job.date}
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-2">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="text-base sm:text-lg">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < array.length - 1 && (
                  <div className="border-b border-gray-200 dark:border-gray-700 my-8"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <AnimatedSection variants={fadeInUpVariants} className="py-20">
          <div className="cta-mesh-gradient rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Create Something Amazing Together</h2>
            <p className="text-lg mb-8">I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
            <motion.a
              href="mailto:career@spike.codes"
              className="inline-flex items-center px-10 py-4 bg-primary text-black rounded-full text-lg font-semibold hover:bg-primary-light transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="mr-2" size={24} />
              Get in Touch
            </motion.a>
          </div>
        </AnimatedSection>

        {/* Footer */}
        <footer className="py-16 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-20">
            <div className="mb-6 sm:mb-0 text-center sm:text-left">
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
            <div className="text-center sm:text-left">
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
                      className="flex items-center justify-center sm:justify-start hover:underline"
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
      </div>

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
    </div>
  );
};

export default App;
