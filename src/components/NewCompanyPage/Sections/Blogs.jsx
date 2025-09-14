export default function Blogs() {
    const Blogs = [
      {
        img: "/subject.png",
        title: "Lorem ipsum dolor sit amet, consectetuer se",
        desc: "Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore...",
        date: "16 Aug, 2024",
      },
      {
        img: "/subject.png",
        title: "Lorem ipsum dolor sit amet, consectetuer se",
        desc: "Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore...",
        date: "16 Aug, 2024",
      },
      {
        img: "/subject.png",
        title: "Lorem ipsum dolor sit amet, consectetuer se",
        desc: "Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore...",
        date: "16 Aug, 2024",
      },
      {
        img: "/subject.png",
        title: "Lorem ipsum dolor sit amet, consectetuer se",
        desc: "Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore...",
        date: "16 Aug, 2024",
      },
    ];

  return (
    <div className="w-full lg:h-140 sm:px-6 my-10 flex flex-col gap-6">
      <h1 className="text-5xl text-center mb-8">Blogs & Articles</h1>
      <div className="flex gap-4 flex-wrap lg:flex-nowrap justify-center">
        {Blogs.map((item, index) => {
          return (
            <BlogCard
              key={index}
              img={item.img}
              title={item.title}
              desc={item.desc}
              date={item.date}
            />
          );
        })}
      </div>
      <div className="text-center">
        <button className="px-8 py-2 rounded-lg bg-black dark:bg-white w-fit text-white dark:text-black">
          View More
        </button>
      </div>
    </div>
  );
}

function BlogCard({ img, title, desc, date }) {
    return (
        <div className="w-[280px] xl:w-full bg-[#E6E6E6] dark:bg-[#282828] flex flex-col p-2 gap-4 rounded-lg">
            <img
                src={img}
                height={100}
                width={100}
                alt="subject"
                className="object-cover w-full rounded-md h-[150px]"
            />
            <div className="flex flex-col gap-4 p-2">
                <div>
                    <h1 className="text-xl mb-2">{title}</h1>
                    <p className="text-sm border-b border-zinc-500 pb-4 text-zinc-700 dark:text-zinc-300">
                        {desc}
                    </p>
                </div>

                <h2 className="text-xs bg-white dark:bg-zinc-900 px-4 py-1 rounded-2xl w-fit">
                    {date}
                </h2>
            </div>
        </div>
    );
}
