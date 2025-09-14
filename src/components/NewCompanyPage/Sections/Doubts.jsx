export default function Doubts() {
  return (
      <div className="w-full lg:h-140 flex flex-col md:flex-row gap-8 px-6 py-16 relative">
          <div className="flex-1 lg:flex-3">
              <h1 className="text-4xl lg:text-5xl mb-6 lg:leading-14">
                  For every student, Every classroom. <br /> Every Doubt.
              </h1>
              <p className="text-sm sm:w-1/2 text-zinc-600 dark:text-zinc-400">
                  Your Exam Saathi transforms exam preparation with personalized
                  AI-driven solutions, ensuring no student is left behind.
              </p>
          </div>
          <div className="flex-1 lg:flex-2 h-full text-justify flex lg:items-end relative">
              <p className="text-xs">
                  At Your Exam Saathi, we go beyond simply digitalizing
                  educational content—we personalize it using cutting-edge AI
                  technology to cater to individual student needs. Our mission
                  is ambitious yet clear: no undergraduate student should ever
                  fail an exam, even if they begin studying just a night before.
                  By analyzing trends, predicting questions, and offering
                  tailored study plans, we simplify the preparation process and
                  ensure students focus on what truly matters. We understand the
                  challenges students face and are dedicated to providing them
                  with smarter, faster, and more effective tools. With Your Exam
                  Saathi, academic success is not just a goal; it’s a promise. <br /> <br />
                  Your Exam Saathi combines innovation with empathy to
                  revolutionize exam preparation. By integrating AI, we make
                  learning efficient, personalized, and focused. Our platform
                  adapts to your needs, ensuring you cover essential topics with
                  precision and ease. With us, even last-minute preparation
                  becomes a pathway to success, leaving no student behind.
              </p>
          </div>
          <h1
              className={`text-[220px] xl:text-[320px] font-normal absolute opacity-5 top-[15] right-10 font-dm-serif`}
          >
              YES
          </h1>
      </div>
  );
}
