"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const StickyScroll = ({ content }: { content: ContentType[] }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = 1 / content.length;

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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: activeCard === index ? 1 : 0,
                scale: activeCard === index ? 1 : 0.8,
                transition: { duration: 0.5 },
              }}
            >
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
