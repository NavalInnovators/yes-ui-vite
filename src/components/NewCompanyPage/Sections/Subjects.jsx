export default function Subjects() {
    const Subjects = [
      {
        img: "/subject.png",
        title: "Subject Name",
        desc: "Subject Description: Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        tags: ["University", "1st year", "Branch"],
      },
      {
        img: "/subject.png",
        title: "Subject Name",
        desc: "Subject Description: Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        tags: ["University", "1st year", "Branch"],
      },
    ];

  return (
    <div className="w-full md:h-140 sm:px-6 my-10 flex flex-col lg:flex-row">
      <h1 className="text-5xl flex-1">
        Checkout free stuff!
      </h1>
      <div className="flex-1 flex gap-4 flex-col mt-12">
        {Subjects.map((item, index) => {
          return (
            <SubjectCard
              key={index}
              img={item.img}
              title={item.title}
              desc={item.desc}
              tags={item.tags}
            />
          );
        })}
        <button className="text-start px-8 py-2 rounded-lg bg-black dark:bg-white w-fit text-white dark:text-black">Know More</button>
      </div>
    </div>
  );
}

function SubjectCard({ img, title, desc, tags }) {
    return (
        <div className="w-full lg:w-[560px] xl:w-full md:h-50 bg-[#E6E6E6] dark:bg-[#282828] flex flex-col md:flex-row p-4 gap-4 rounded-lg">
            <div className="order-2 md:order-1 flex flex-col justify-between">
                <div>
                    <h1 className="text-xl mb-2">{title}</h1>
                    <p className="text-sm border-b border-zinc-500 mb-2 pb-2 md:pb-5 text-zinc-700 dark:text-zinc-300">
                        {desc}
                    </p>
                </div>

                <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {tags.map((tag, index) => {
                        return (
                            <h2
                                key={index}
                                className="text-sm bg-white dark:bg-zinc-900 px-4 py-1 rounded-2xl"
                            >
                                {tag}
                            </h2>
                        );
                    })}
                </div>
            </div>
            <img
                src={img}
                height={100}
                width={100}
                alt="subject"
                className="order-1 md:order-2 object-cover h-[168px] w-full md:w-[186px] rounded-md"
            />
        </div>
    );
}
