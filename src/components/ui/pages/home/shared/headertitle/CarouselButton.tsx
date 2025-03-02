import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CarouselButton = ({ handlePrev, handleNext }) => {
  return (
    <div className="addFlexItems gap-3">
      <button
        onClick={handlePrev}
        className="w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] rounded-full cursor-pointer flex  justify-center items-center customShadow"
      >
        {" "}
        <IoIosArrowBack className="text-2xl text-t1" />{" "}
      </button>
      <button
        onClick={handleNext}
        className="w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] rounded-full cursor-pointer flex  justify-center items-center customShadow"
      >
        {" "}
        <IoIosArrowForward className="text-2xl text-p1" />{" "}
      </button>
    </div>
  );
};

export default CarouselButton;
