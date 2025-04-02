import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CallToAction: React.FC = () => {
  return (
    <motion.section
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      className="pt-20"
    >
      <div className="cta-mesh-gradient rounded-3xl p-12 py-20 text-center text-black dark:text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Let's create something amazing together
        </h2>
        <p className="text-lg mb-8">
          I'm always open to new opportunities and collaborations. Feel free to
          reach out!
        </p>
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
    </motion.section>
  );
};

export default CallToAction;
