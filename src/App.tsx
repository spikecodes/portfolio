import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./components/ui/navbar";
import { ThemeToggle } from "./components/ui/theme-toggle";
import { Linkedin, Github, Mail, Palette } from "lucide-react";
import { StickyScroll } from "./components/ui/sticky-scroll-reveal";

const App = () => {
  const projects = [
    {
      title: "Web Page Search Engine",
      date: "Feb 2024 – Mar 2024",
      description:
        "Engineered a web page search engine in Python, implementing PageRank and cosine similarity for ranking. The project involved implementing zlib compression, which reduced index storage by 60% while maintaining search precision. A Streamlit web interface was created, enabling query response times of less than 2 seconds for multi-word searches, showcasing the efficiency and practicality of the search engine.",
      content: (
        <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-emerald-500" />
      ),
    },
    {
      title: "Full-Stack Stock Trading Simulator",
      date: "Jul 2023 – Aug 2023",
      description:
        "Developed a real-time stock trading simulator utilizing React with TypeScript for the frontend and Node.js/Express for the backend. The project included constructing an OpenAPI 3.0-compliant API with JWT authentication to interface with MongoDB and third-party APIs. AWS services were leveraged to host the backend (EC2, CloudFormation, Cloudfront) and deploy the frontend on AWS Amplify, demonstrating proficiency in full-stack development and cloud deployment.",
      content: (
        <div className="w-full h-full bg-gradient-to-br from-pink-500 to-indigo-500" />
      ),
    },
    {
      title: "Scholarship Management SaaS",
      date: "Jun 2023 – Apr 2024",
      description:
        "Created an internal CRUD tool for Culver City Scholarship Fund using Python, JavaScript, and PostgreSQL. The system allows for database management, AI data analysis, scoped user authentication, and form automation pipelines. This user-friendly system serves over 250 applicants, resulting in savings of $8000 per year and 40 hours for each cohort, showcasing the project's significant impact on efficiency and cost-saving.",
      content: (
        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-yellow-500" />
      ),
    },
    {
      title: "Libreddit: Full-Stack Web App",
      date: "Jun 2020 – Jul 2023",
      description:
        "Developed a full-stack web application using Rust, providing speedy and private Reddit access to 4,000,000 users per month. The project involved creating a custom HTTP2 client/server, which provided users with a 'Time to Interactive' of 2.8 seconds, significantly faster than Reddit's 12.4 seconds. A project network of over 100 Libreddit instances hosted by volunteers worldwide was formed, demonstrating the project's scalability and community impact.",
      content: (
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-red-500" />
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

  return (
    <div
      className={`min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300`}
    >
      <Navbar />
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <header id="home" className="pt-24 pb-16">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl font-bold mb-4 font-display"
            >
              Spike O'Carroll
            </motion.h1>
            <motion.p
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl sm:text-2xl mb-6 font-sans"
            >
              Full Stack Developer | UCI Computer Science Student
            </motion.p>
            <div className="flex flex-wrap gap-4">
              {[
                {
                  href: "mailto:career@spike.codes",
                  icon: Mail,
                  label: "Email",
                },
                {
                  href: "https://linkedin.com/in/spike-ocarroll",
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                {
                  href: "https://github.com/spikecodes",
                  icon: Github,
                  label: "GitHub",
                },
                {
                  href: "https://behance.net/yourusername",
                  icon: Palette,
                  label: "Behance",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                >
                  <social.icon size={24} />
                  <span className="font-medium">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </header>

          <section id="about" className="py-16">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="max-w-2xl">
              I'm a Computer Science student at UC Irvine with a passion for
              full-stack development and AI. Currently, I'm working as a Full
              Stack Software Intern at Portal AI, where I've shipped 80+
              features to an AI web browser serving 30,000 users/month.
            </p>
          </section>

          {/* Full-width projects section */}
          <section id="projects" className="w-full">
            <h2 className="text-4xl font-bold text-center mb-8">Projects</h2>
            <StickyScroll content={projects} />
          </section>

          {/* Wrap the remaining sections in a max-w-7xl container */}
          <div className="max-w-7xl mx-auto">
            <section id="experience" className="py-16">
              <h2 className="text-2xl font-semibold mb-4">Experience</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold">
                    Full Stack Software Intern - Portal AI
                  </h3>
                  <p className="text-sm text-gray-600">
                    Dec 2023 – Present | Remote
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      Shipped 80+ features to an AI web browser and LLM
                      interface
                    </li>
                    <li>Built a high-performance vector database in Rust</li>
                    <li>Launched a conversational voice AI in Python</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Freelance Web Developer</h3>
                  <p className="text-sm text-gray-600">
                    Nov 2021 – Dec 2023 | Culver City, CA
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      Created high-converting websites using Webflow, Figma, and
                      Framer
                    </li>
                    <li>
                      Increased web traffic by 2-3x for more than 90% of clients
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="skills" className="py-16">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-semibold mb-4"
              >
                Skills
              </motion.h2>
              <div className="flex flex-wrap gap-2">
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
                    className="bg-primary-dark text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
