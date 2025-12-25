import { imgA, imgB, imgC } from "../../../assets";

export default function Features() {
    const Features = [
        {
            icon: imgC,
            title: "Personalized learning",
            desc: "Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        },
        {
            icon: imgB,
            title: "Trusted Answers",
            desc: "Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        },
        {
            icon: imgA,
            title: "Personalized learning",
            desc: "Lorem ipsum dolor sit amet, consec er adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        },
    ];

    return (
        <div className="w-full gap-20 flex flex-col justify-between rounded-2xl px-4 sm:px-8 py-11 text-white mt-16 md:mt-0 mb-16 xl:mb-20 bg-animated-radial">
            <h1 className="text-3xl sm:text-5xl">
                Integrity. Innovation. Impact. <br />
                Shaping the Future Together.
            </h1>
            <div className="w-full flex flex-col md:flex-row gap-4 justify-center">
                {Features.map((f) => {
                    return (
                        <FeatureCard
                            key={f.icon}
                            icon={f.icon}
                            title={f.title}
                            desc={f.desc}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="bg-white text-black md:w-65 py-4 md:py-10 px-4 rounded-2xl">
            <div className="flex justify-end">
                <div className="rounded-full">
                    <img
                        src={icon}
                        height={100}
                        width={100}
                        alt="icon"
                        className="w-18 h-18"
                    />
                </div>
            </div>

            <h1 className="font-semibold text-xl md:text-lg my-4">{title}</h1>
            <p className="text-sm text-zinc-500">{desc}</p>
        </div>
    );
}
