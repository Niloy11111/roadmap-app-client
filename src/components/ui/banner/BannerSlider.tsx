import { useState } from "react";
import { TSlides } from "../../../types";

interface BannerSliderProps {
  slides: TSlides;
}

const BannerSlider = ({ slides }: BannerSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="h-[40vh] lg:h-[60vh] relative ">
      <div
        className="bg-white transition-all duration-300 p-2 rounded-full absolute top-[50%] translate-x-[0%]
        
        translate-y-[-50%] left-8 cursor-pointer z-10"
        onClick={goToPrevious}
      >
        {" "}
        <img
          className="w-[30px]"
          src="https://i.ibb.co/n6gknx7/left-arrow.png"
        ></img>{" "}
      </div>
      <div
        className=" bg-white transition-all duration-300 p-2 rounded-full absolute top-[50%] translate-x-[0%]
        
        translate-y-[-50%] right-8 cursor-pointer z-10"
        onClick={goToNext}
      >
        <img
          className="w-[30px]"
          src="https://i.ibb.co/CJRK8Bf/right-arrow.png"
        ></img>
      </div>
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex].url}`,
        }}
        className=" mt-10 w-full h-full bg-cover
         bg-no-repeat bg-center
         rounded-xl "
      ></div>

      <div className="lg:flex hidden cursor-pointer  gap-2 mt-6  ">
        {slides.map((slide, slideIndex) => (
          <div
            className="border border-[#7CFAC6]"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            <img className="w-[80px] h-[60px]" src={slide.url}></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
