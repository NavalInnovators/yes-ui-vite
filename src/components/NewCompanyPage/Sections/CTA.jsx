import { useNavigate } from "react-router-dom";

export default function CTA() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-120 flex flex-col justify-center items-center gap-3 rounded-2xl py-4  text-white bg-animated-radial mt-16 md:mt-0 mb-16 xl:mb-20 relative">
            <h1 className="text-4xl sm:text-5xl z-10 px-12">
                Still have a question?
            </h1>
            <p className="text-sm mb-4 z-10 px-8">
                Feel free to write to us at{" "}
                <b>info@navalinnovators.com / navalinnovators@gmail.com</b> or
                contact us by clicking on the following button:
            </p>
            <button
                className="bg-white text-black px-8 py-3 text-sm rounded-lg z-10 border-2 border-white hover:bg-white/10 hover:backdrop-blur-md hover:text-white transition-all"
                onClick={() => navigate("/contacts")}
            >
                Contact Us
            </button>
            <h1
                className={`text-[200px] sm:text-[250px] md:text-[350px] font-normal absolute opacity-10 font-dm-serif`}
            >
                YES
            </h1>
        </div>
    );
}
