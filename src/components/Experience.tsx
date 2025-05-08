import React from "react";
import portal from "../assets/experience/portal.png";
import map from "../assets/experience/map.png";
import freelance from "../assets/experience/freelance.png";
import dispatchai from "../assets/experience/dispatchai.jpg";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
      <div className="space-y-8">
        {[
          {
            title: "CEO / Co-Founder",
            company: "Dispatch AI",
            date: "Jun 2024 – Dec 2024",
            responsibilities: [
              "AI 911 operator using empathy-driven emergency response to empower dispatch centers",
              "Grants from OpenAI, Intel, Skydeck, Mistral AI and Academic Catalyst",
              "$50,000 Grand Prize Winners at the 2024 UC Berkeley AI Hackathon, out of over 1500 participants",
              "Accepted into Berkeley Skydeck's Pad-13 Program (1% acceptance rate, Forbes #2 Best University Accelerator)",
            ],
            icon: dispatchai,
          },
          {
            title: "Software Engineer Intern",
            company: "Portal",
            date: "Dec 2023 – Sep 2024",
            responsibilities: [
              "Shipped 80+ features to a venture-backed startup's AI web browser and LLM interface serving 30,000 users/mo",
              "Built a high-performance vector database in Rust with SQL query support and cloud syncing with Postgres server",
              "Launched a conversational voice AI in Python with < 600ms latency, web agent capabilities, and RAG",
              "Worked closely with fast-paced teams to develop Electron-based browser in Node, TypeScript, React, and Tailwind",
            ],
            icon: portal,
          },
          {
            title: "Freelance Web Developer",
            company: "Spike Designs",
            date: "Nov 2021 – Dec 2023",
            responsibilities: [
              "Building 10x-converting websites and 0→1 branding for businesses and public figures",
              "Driving actionable results with stunning UI/UX featured in over 30 Adobe Behance collections",
            ],
            icon: freelance,
          },
          {
            title: "Webmaster and IT Administrator",
            company: "Maximize Athletic Performance",
            date: "Mar 2023 – Sep 2023",
            responsibilities: [
              "Designed Wordpress website, Shopify store, and JotForm assessment form",
              "Created and ran client acquisition strategy using social media, SMS (via Twilio), and email marketing",
              "Architected automation pipelines to save 10 hours/week on client processing using webhooks and Zapier",
            ],
            icon: map,
          },
        ].map((job, index, array) => (
          <div key={index} className="flex items-start">
            <div className="mr-4 flex-shrink-0">
              {job.company === "Maximize Athletic Performance" ? (
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <img
                    src={job.icon}
                    alt={`${job.company} icon`}
                    width={40}
                    height={40}
                    className="rounded-full invert"
                  />
                </div>
              ) : job.company === "Portal" ? (
                <img
                  src={job.icon}
                  alt={`${job.company} icon`}
                  width={48}
                  height={48}
                  className="rounded-full bg-black"
                />
              ) : (
                <img
                  src={job.icon}
                  alt={`${job.company} icon`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <p className="text-md text-gray-500 hidden sm:block">
                  {job.date}
                </p>
              </div>
              <p className="text-sm text-gray-500 sm:hidden mt-1">{job.date}</p>
              <ul className="list-disc list-inside mt-2">
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
  );
};

export default Experience;
