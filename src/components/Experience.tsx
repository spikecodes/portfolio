import React from "react";

const Experience: React.FC = () => {
  return (
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
  );
};

export default Experience;