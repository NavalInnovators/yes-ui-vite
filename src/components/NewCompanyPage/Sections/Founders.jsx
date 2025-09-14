import { MobiusStrip, CreatorA, CreatorB, CreatorC, CreatorD } from "../../../assets";

export default function Founders() {
    const Person = [
        { name: "Sachin", post: "Post Description", img: CreatorA },
        { name: "Sachin", post: "Post Description", img: CreatorB },
        { name: "Sachin", post: "Post Description", img: CreatorC },
        { name: "Sachin", post: "Post Description", img: CreatorD },
    ];

    return (
        <div className="w-full md:p-20 lg:px-40 xl:px-52 lg:mb-16 xl:mb-20 flex flex-col items-center gap-16 xl:gap-24">
            <div className="relative">
                <img
                    src={MobiusStrip}
                    width={400}
                    height={400}
                    alt="img"
                    className="animate-[spin_10s_linear_infinite]"
                />
                <h1 className="absolute top-[35%] text-center text-4xl sm:text-5xl w-full">
                    <span className="text-2xl">Product By</span> <br />
                    Naval Innovators
                </h1>
            </div>
            {/* <div className="flex w-full justify-between px-4 flex-wrap items-center gap-4">
                {Person.map((item) => {
                    return (
                        <PersonCard
                            key={item.img}
                            name={item.name}
                            desc={item.post}
                            img={item.img}
                        />
                    );
                })}
            </div> */}
            <div className="flex flex-col gap-12">
                <h1 className="text-3xl sm:text-5xl">
                    Revolutionizing Exam Preparation Through Personalized AI
                    Solutions
                </h1>
                <p className="px-2 sm:px-0 sm:w-3/4 text-justify mx-auto text-xs sm:text-sm text-zinz-900 dark:text-zinc-200">
                    At the heart of Your Exam Saathi lies a vision to redefine
                    how students prepare for exams. We aim to simplify learning
                    by merging technology with education, ensuring every student
                    has access to personalized tools that fit their unique
                    needs. Our platform leverages advanced AI to analyze trends,
                    predict questions, and craft tailored study plans. By
                    addressing individual learning gaps and providing focused
                    resources, we ensure students optimize their efforts. Your
                    Exam Saathi is more than just a tool—it’s a companion that
                    empowers students to succeed, no matter their starting point
                    or preparation timeline. <br /> <br /> With a focus on
                    personalization, Your Exam Saathi addresses the diverse
                    challenges faced by students. From providing concise notes
                    and mind maps to predictive analytics and customized
                    preparation, our platform is designed to maximize
                    efficiency. Whether you’re revising months in advance or
                    preparing the night before, our AI-driven solutions ensure
                    you stay ahead in today’s competitive academic landscape.
                    We’re here to make success accessible to every student.
                    <br /> <br /> Your Exam Saathi stands as a beacon of
                    innovation in education, transforming challenges into
                    opportunities for growth. By combining modern technology
                    with a student-first approach, we make exam preparation
                    smarter, faster, and more effective. Join us in
                    revolutionizing the way students learn and achieve their
                    academic dreams with confidence.
                </p>
            </div>
        </div>
    );
}

function PersonCard({ name, desc, img }) {
    return (
        <div className=" flex flex-col justify-center items-center">
            <img
                src={img}
                height={150}
                width={150}
                alt="Person"
                className="rounded-full h-[100px] w-[100px] xl:h-[150px]  xl:w-[150px] object-cover mb-6"
            />
            <h1 className="text-lg font-medium">{name}</h1>
            <h2 className="text-sm">{desc}</h2>
        </div>
    );
}
