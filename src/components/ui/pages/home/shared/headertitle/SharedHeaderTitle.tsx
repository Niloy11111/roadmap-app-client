import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SharedHeaderTitle = ({ title, heading, handleNext, handlePrev }) => {
  return (
    <div className=" flex justify-between items-center">
      <div>
        <div className="flex flex-row items-center gap-2 mb-3 lg:mb-4">
          <p className="bg-p1 #BD1F17 w-[10px] h-[10px]"></p>
          <p className="text-p1 font-Inter lg:text-xl font-bold">{title}</p>
        </div>
        <h3
          className={`${
            heading === "Book Your Table" ? "text-white" : "text-t2"
          } text-[30px] uppercase lg:text-[42px] font-bold  leading-[38px] lg:leading-[62px] `}
        >
          {heading}
        </h3>
      </div>

      <div className="lg:flex gap-3 hidden">
        <button
          onClick={handlePrev}
          className=" w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] rounded-full cursor-pointer flex  justify-center items-center customShadow "
        >
          {" "}
          <IoIosArrowBack className="text-2xl text-t1" />{" "}
        </button>
        <button
          onClick={handleNext}
          className="bg-white cursor-pointer w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] rounded-full flex  justify-center items-center customShadow"
        >
          {" "}
          <IoIosArrowForward className="text-2xl text-p1" />{" "}
        </button>
      </div>
    </div>
  );
};

export default SharedHeaderTitle;
