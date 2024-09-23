import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Navbar } from "./components/ui/navbar";
import { ThemeToggle } from "./components/ui/theme-toggle";
import { Linkedin, Github, Mail, Palette } from "lucide-react";
import { StickyScroll } from "./components/ui/sticky-scroll-reveal";
import heroImage from "./assets/stage.png";
import profilePhoto from "./assets/profile-photo.jpg";

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
  const projects = [
    {
      title: "Web Page Search Engine",
      date: "Feb 2024 – Mar 2024",
      description:
        "Engineered a web page search engine in Python, implementing PageRank and cosine similarity for ranking. The project involved implementing zlib compression, which reduced index storage by 60% while maintaining search precision. A Streamlit web interface was created, enabling query response times of less than 2 seconds for multi-word searches, showcasing the efficiency and practicality of the search engine.",
      content: (
        <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark" />
      ),
    },
    {
      title: "Full-Stack Stock Trading Simulator",
      date: "Jul 2023 – Aug 2023",
      description:
        "Developed a real-time stock trading simulator utilizing React with TypeScript for the frontend and Node.js/Express for the backend. The project included constructing an OpenAPI 3.0-compliant API with JWT authentication to interface with MongoDB and third-party APIs. AWS services were leveraged to host the backend (EC2, CloudFormation, Cloudfront) and deploy the frontend on AWS Amplify, demonstrating proficiency in full-stack development and cloud deployment.",
      content: (
        <div className="w-full h-full bg-gradient-to-br from-primary to-gray" />
      ),
    },
    {
      title: "Scholarship Management SaaS",
      date: "Jun 2023 – Apr 2024",
      description:
        "Created an internal CRUD tool for Culver City Scholarship Fund using Python, JavaScript, and PostgreSQL. The system allows for database management, AI data analysis, scoped user authentication, and form automation pipelines. This user-friendly system serves over 250 applicants, resulting in savings of $8000 per year and 40 hours for each cohort, showcasing the project's significant impact on efficiency and cost-saving.",
      content: (
        <div className="w-full h-full bg-gradient-to-br from-gray to-primary" />
      ),
    },
    {
      title: "Libreddit: Full-Stack Web App",
      date: "Jun 2020 – Jul 2023",
      description:
        "Developed a full-stack web application using Rust, providing speedy and private Reddit access to 4,000,000 users per month. The project involved creating a custom HTTP2 client/server, which provided users with a 'Time to Interactive' of 2.8 seconds, significantly faster than Reddit's 12.4 seconds. A project network of over 100 Libreddit instances hosted by volunteers worldwide was formed, demonstrating the project's scalability and community impact.",
      content: (
        <div className="w-full h-full bg-gradient-to-br from-primary-dark to-primary" />
      ),
    },
  ];

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

  return (
    <div
      className={`min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300`}
    >
      <Navbar isScrolled={isScrolled} />

      <div className="container-narrow">
        <AnimatedSection variants={fadeInDownVariants} className="">
          <div
            ref={headerRef}
            className="flex justify-between items-center py-4"
          >
            <div className="flex items-center">
              <img
                src={profilePhoto}
                alt="Spike O'Carroll"
                className="w-14 h-14 rounded-full mr-3"
              />
              <span className="font-semibold text-xl">Spike O'Carroll</span>
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
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 font-display"
          >
            Developer, designer and
            <br /> aspiring entrepreneur
          </motion.h1>
          <motion.p
            variants={fadeInUpVariants}
            className="text-xl sm:text-2xl lg:text-3xl mb-6 font-sans"
          >
            Full Stack Developer | UCI Computer Science Student
          </motion.p>
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
                href: "https://behance.net/yourusername",
                icon: Palette,
                label: "",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
              >
                <social.icon size={20} className="sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base font-medium">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
          <div className="flex justify-end">
            <motion.button
              variants={fadeInUpVariants}
              className="bg-primary text-text-light px-6 py-3 rounded-md font-medium text-lg inline-flex items-center hover:bg-primary-dark transition-colors"
            >
              Get in touch <span className="ml-2">→</span>
            </motion.button>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection
        variants={fadeInUpVariants}
        className="container-wide relative w-full overflow-hidden mb-16"
      >
        <motion.img
          src={heroImage}
          alt="Hero image showcasing development work"
          className="w-full h-auto object-cover rounded-3xl shadow-lg"
          variants={fadeInUpVariants}
        />
      </AnimatedSection>

      <div className="container-narrow">
        <AnimatedSection variants={fadeInUpVariants} className="py-12 sm:py-16">
          <motion.h2
            variants={fadeInUpVariants}
            className="text-2xl sm:text-3xl font-semibold mb-4"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={fadeInUpVariants}
            className="max-w-2xl text-base sm:text-lg"
          >
            I'm a Computer Science student at UC Irvine with a passion for
            full-stack development and AI. Currently, I'm working as a Full
            Stack Software Intern at Portal AI, where I've shipped 80+ features
            to an AI web browser serving 30,000 users/month.
          </motion.p>
        </AnimatedSection>

        <section id="projects" className="w-full py-12 sm:py-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8">
            Projects
          </h2>
          <StickyScroll content={projects} />
        </section>

        <AnimatedSection variants={fadeInUpVariants} className="py-12 sm:py-16">
          <motion.h2
            variants={fadeInUpVariants}
            className="text-2xl sm:text-3xl font-semibold mb-4"
          >
            Experience
          </motion.h2>
          <motion.div variants={fadeInUpVariants} className="space-y-6">
            {[
              {
                title: "Full Stack Software Intern - Portal AI",
                date: "Dec 2023 – Present | Remote",
                responsibilities: [
                  "Shipped 80+ features to an AI web browser and LLM interface",
                  "Built a high-performance vector database in Rust",
                  "Launched a conversational voice AI in Python",
                ],
              },
              {
                title: "Freelance Web Developer",
                date: "Nov 2021 – Dec 2023 | Culver City, CA",
                responsibilities: [
                  "Created high-converting websites using Webflow, Figma, and Framer",
                  "Increased web traffic by 2-3x for more than 90% of clients",
                ],
              },
            ].map((job, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base sm:text-lg">
                  {job.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {job.date}
                </p>
                <ul className="list-disc list-inside mt-2 text-sm sm:text-base">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>

        <AnimatedSection variants={fadeInUpVariants} className="py-12 sm:py-16">
          <motion.h2
            variants={fadeInUpVariants}
            className="text-2xl sm:text-3xl font-semibold mb-4"
          >
            Skills
          </motion.h2>
          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-wrap gap-2"
          >
            {[
              "TypeScript",
              "JavaScript",
              "Python",
              "React",
              "Node.js",
              "Rust",
              "AWS",
              "Docker",
            ].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-primary text-text-light px-3 py-1.5 rounded-full text-sm sm:text-base"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default App;
