import { ChevronRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="">
      <div className="font-sans flex  items-center gap-1 bg-[#dadadb] p-2 rounded-full w-[37.5%] mx-auto mt-40">
        <button className="text-[10px] bg-p1 text-white p-2 rounded-full">
          New
        </button>
        Roadmap is a powerful and easy-to-use platform that helps teams
        collaborate seamlessly.
        <ChevronRight className="text-p1 text-xl" />
      </div>

      <div className="mt-12 gap-10  flex flex-col justify-center items-center">
        <h1 className="bannerTitle">Build Your Vision,</h1>
        <h1 className="bannerTitle">Drive Change Forward</h1>
      </div>

      <div>
        <p className="text-xl text-center my-10">
          Collaborate, prioritize, and track progress with<span>Roadmap</span> ,
          your team’s central roadmap hub.
        </p>

        <div className="mb-40 flex justify-center gap-4 mt-12">
          <button className="cursor-pointer bg-p1 text-sm px-4 py-2.5 text-white rounded-xl">
            Get Started
          </button>
          <button className="text-sm cursor-pointer bg-[#fefefe] px-4 py-2.5 rounded-xl">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
