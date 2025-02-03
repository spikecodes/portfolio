import React from "react";
import { motion } from "framer-motion";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutMe: React.FC = () => {
  return (
    <motion.section
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      id="about"
    >
      <div className="mt-20 mb-12">
        <motion.h2
          variants={fadeInUpVariants}
          className="text-2xl sm:text-3xl font-semibold mb-4"
        >
          About Me
        </motion.h2>
        <motion.p variants={fadeInUpVariants} className="text-lg sm:text-xl">
          I'm a Computer Science student at UC Irvine with a passion for
          full-stack development and AI. I love startups, hackathons, and building
          innovative consumer products.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutMe;
