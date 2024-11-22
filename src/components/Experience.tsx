import React from "react";
import portal from "../assets/experience/portal.png";
import map from "../assets/experience/map.png";
import freelance from "../assets/experience/freelance.png";

const Experience: React.FC = () => {
  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
      <div className="space-y-8">
        {[
          {
            title: "Full Stack Software Intern",
            company: "Portal AI",
            date: "Dec 2023 – Present",
            responsibilities: [
              "Shipped 80+ features to a venture-backed startup's AI web browser serving 30,000 users/mo",
              "Built a high-performance vector database in Rust with SQL query support and cloud syncing with Postgres",
              "Launched a conversational voice AI in Python with < 600ms latency, web agent capabilities, and RAG",
              "Worked closely with fast-paced teams to develop Electron-based browser in Node, TypeScript, React, and Tailwind",
            ],
            icon: portal,
          },
          {
            title: "Freelance Web Designer and Developer",
            company: "Self-employed",
            date: "Nov 2021 – Dec 2023",
            responsibilities: [
              "Created high-converting websites for businesses and public figures using Webflow, Figma, and Framer",
              "Organically increased web traffic by 2-3x for >90% of clients through maximizing SEO and page speed",
              "Designed stunning landing pages and 0→1 web branding featured in 32 Behance and Dribbble collections",
            ],
            icon: freelance,
          },
          {
            title: "Frontend and Webmaster Intern",
            company: "Maximize Athletic Performance",
            date: "Mar 2023 – Nov 2023",
            responsibilities: [
              "Designed and maintained website, Shopify store, and JotForm assessment form for private gym",
              "Architected automation pipelines saving 10 hours/week on client processing using webhooks and Zapier",
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
              ) : job.company === "Portal AI" ? (
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
