import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { quoteImg } from "../../../assets";

export default function Testimonials() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -290 : 290;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const testimonials = [
      {
          name: "Ravi Sharma",
          role: "Engineering Student",
          text: "Your Exam Saathi transformed my exam preparation. The AI-driven insights and personalized study plans made a huge difference. I was able to focus on high-probability topics and improve my score significantly!",
      },
      {
          name: "Priya Desai",
          role: "University Student",
          text: "I’ve always struggled with time management while studying. With the customized preparation and time-based question banks, Your Exam Saathi helped me prioritize my weak areas and study smarter, not harder",
      },
      {
          name: "Anil Kumar",
          role: "B.Tech Student, Electrical Engineering",
          text: "The Mind Maps feature was a game-changer for me! It helped me visualize complex topics, making them easier to understand and retain. I feel more confident in my exam preparation now. I was able to learn using the tricks very easily. Even in no time. Thank you YES!",
      },
      {
          name: "Sanya Patel",
          role: "Final Year Engineering Student",
          text: "I’ve tried many study resources, but nothing compares to Your Exam Saathi. The personalized study plans and detailed unit summaries helped me cover everything effectively, even with limited time before exams.",
      },
      {
          name: "Rohan Mehta",
          role: "Community Mentor",
          text: "Your Exam Saathi helped me focus on the most important topics. The Exam Insights feature provided me with trends from past papers, guiding me to focus on the areas most likely to appear in my exams.",
      },
      {
          name: "Aarti Singh",
          role: "Civil Engineering",
          text: "The AI-powered features, especially the QnA and performance analytics, made studying so much easier. I could track my progress, identify weak points, and improve them in time for my exams.",
      },
      {
        name: "Vikram Yadav",
        role: "Engineering Aspirant",
        text: "As someone new to AI-based learning tools, I was amazed at how personalized and efficient the platform was. From detailed notes to tailored practice questions, Your Exam Saathi made my preparation much more organized. Thank you so much YES @yourExamSaathi."

      }
  ];

  return (
    <div className="w-full sm:h-140 sm:px-6 my-10">
      <h1 className="text-3xl sm:text-5xl text-center mb-8 sm:mb-12">
        What students say about us!
      </h1>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar"
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-l-lg bg-[#E6E6E6] hover:bg-[#dedddd] dark:bg-[#282828] hover:dark:bg-[#414141]"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-r-lg bg-[#E6E6E6] hover:bg-[#dedddd] dark:bg-[#282828] hover:dark:bg-[#2e2e2e]"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

function TestimonialCard({ name, role, text }) {
  return (
      <div className="min-w-[280px] bg-gradient-to-b from-[#F2F2F2] to-[#E6E6E6] dark:from-[#282828] dark:to-[#1d1d1d] rounded-2xl p-6 flex flex-col relative">
          <div>
              <h3 className="text-lg font-medium">{name}</h3>
              <p className="text-gray-500 text-xs">{role}</p>
          </div>

          <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300 text-sm ">
              {text}
          </p>

          {/* <div className="mt-4 text-8xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text absolute right-5 rotate-180 -top-12">
        “
      </div> */}
          <img
              src={quoteImg}
              alt="quote"
              className="absolute right-4 top-3 h-10 w-10"
          />
      </div>
  );
}
