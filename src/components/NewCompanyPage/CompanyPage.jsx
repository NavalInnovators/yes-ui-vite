import Hero from "./Sections/Hero";
import Doubts from "./Sections/Doubts";
import Founders from "./Sections/Founders";
import Features from "./Sections/Features";
import Subjects from "./Sections/Subjects";
import Blogs from "./Sections/Blogs";
import CTA from "./Sections/CTA";
import Testimonials from "./Sections/Testimonials";
import "./style.css"

function CompanyPage() {
    return (
        <div className="min-h-screen bg-[#fff] text-black dark:bg-black dark:text-zinc-50 transition-colors flex justify-center items-start relative">
            <main className="flex max-w-[2160px] w-full justify-center items-center flex-col pt-27 px-4 sm:px-6">
                <Hero />
                <Doubts />
                <Founders />
                {/* <Features /> */}
                {/* <Subjects />
                <Blogs /> */}
                {/* <Testimonials /> */}
                <CTA />
            </main>
        </div>
    );
}

export default CompanyPage