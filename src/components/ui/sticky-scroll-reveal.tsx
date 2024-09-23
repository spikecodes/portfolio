"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

interface ContentType {
  title: string;
  date: string;
  description: string;
  content: React.ReactNode;
}

export const StickyScroll = ({ content }: { content: ContentType[] }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollFraction = scrollYProgress.get();
      const newActiveCard = Math.floor(scrollFraction * content.length);
      setActiveCard(newActiveCard);
    };

    const unsubscribe = scrollYProgress.onChange(handleScroll);
    return () => unsubscribe();
  }, [content.length, scrollYProgress]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${content.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="w-full">
          {content.map((item, index) => (
            <motion.div
              key={item.title}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, y: "50%" }}
              animate={{
                opacity: index === activeCard ? 1 : 0.3,
                y: `${(index - activeCard) * 60}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div
                  className={`absolute inset-0 ${
                    index < activeCard
                      ? "bg-gradient-to-b from-background-light dark:from-background-dark to-transparent"
                      : index > activeCard
                      ? "bg-gradient-to-t from-background-light dark:from-background-dark to-transparent"
                      : ""
                  }`}
                ></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <p className="text-base">{item.description}</p>
                  </div>
                  <div className="aspect-square w-full h-full">
                    {item.content}
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
