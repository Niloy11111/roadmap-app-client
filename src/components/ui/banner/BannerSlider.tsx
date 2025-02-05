import { useState } from "react";
import { BsSearch } from "react-icons/bs";
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
    <div className="h-[60vh] relative ">
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
        className="mt-10 w-full h-full bg-contain
         bg-no-repeat bg-center
         rounded-xl "
      >
        <div
          style={{
            backgroundColor: "rgba(11, 11, 11, 0.50)",
          }}
          className="rounded-xl flex justify-center items-center h-full  "
        >
          <div className="    ">
            <h2 className="text-white uppercase mt-5 text-4xl font-bold font-Inter slide text-center">
              Experience Driving Beyond <br />
              Your Expectations
            </h2>
            <div className="mx-auto  mt-5 border-2 flex rounded py-1   bg-[#FFF]  w-[300px] md:w-[300px] lg:w-[470px] border-[#C9F620]">
              <button
                type="submit"
                className=" flex items-center justify-center w-[50px] h-[40px] rounded-full ml-2 text-lg font-semibold text-[#333F]"
              >
                {" "}
                <BsSearch></BsSearch>
              </button>
              <input
                name="category"
                id="field-id"
                className="pl-1 outline-none w-full rounded"
                type="text"
                placeholder="Search for your favourite cars"
              />
            </div>

            <div className="flex gap-6 mt-10">
              <div className="bg-white w-[90px] rounded">
                <img src="https://i.ibb.co/xL3hR5R/tesla-logo.webp"></img>
              </div>
              <div className="bg-white w-[90px] rounded">
                <img src="https://i.ibb.co/0ssVz0t/mercedes-benz-logo.webp"></img>
              </div>
              <div className="bg-white w-[90px] rounded">
                <img src="https://i.ibb.co/9ZZS17j/bmw-logo.webp"></img>
              </div>
              <div className="bg-white w-[90px] rounded">
                <img src="https://www.carlogos.org/car-logos/ford-logo.png"></img>
              </div>
              <div className="bg-white w-[90px] rounded">
                <img src="https://i.ibb.co/gJd47dF/honda-logo.webp"></img>
              </div>
              <div className="bg-white w-[90px] rounded">
                <img src="https://i.ibb.co/Gpp5b0Q/toyota-logo.webp"></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex cursor-pointer  gap-2 mt-6  ">
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
