import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import CarouselButton from "../shared/headertitle/CarouselButton.jsx";
import SharedHeaderTitle from "../shared/headertitle/SharedHeaderTitle.jsx";
import { testimonials } from "./testimonials.constants";
import Group from "/assets/Group.png";
const Testimonials = () => {
  const [currentId, setCurrentId] = useState(1);
  const currectReview = testimonials.find(
    (testimonial) => testimonial.id === currentId
  );

  const { image, name, address, review } = currectReview;

  const handleNext = () => {
    if (currentId === 4) {
      return;
    } else {
      setCurrentId((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentId === 1) {
      return;
    } else {
      setCurrentId((prev) => prev - 1);
    }
  };

  return (
    <section className="lg:mt-0 mt-16 z-0 relative overflow-hidden h-[861px] lg:h-[965px]  addFlexItems">
      <div className="w-full z-30 customWidth">
        <div className="mb-10">
          <SharedHeaderTitle
            handleNext={handleNext}
            handlePrev={handlePrev}
            heading="What Some of my Customers Say"
            title="Smooth Rides, Every Turn Matters"
          />
        </div>
        <div className="lg:h-[555px] flex flex-col-reverse lg:flex-row w-full">
          <div className="relative lg:flex-1 bg-p1 h-[335px] lg:h-full addFlex ">
            <div className="h-[285px] lg:h-[411px] w-[280px] lg:w-[386px] addFlexBetween flex-col">
              <div>
                <p className="subTitle ">{review}</p>
              </div>

              <div className="relative border-b  border-white pb-4  addFlexBetween w-full">
                <div>
                  <h3 className="text-white font-Bebas font-lg font-medium">
                    {name}
                  </h3>
                  <p className="text-white text-sm">{address}</p>
                </div>

                <div className="border-b-4 right-0 -top-0.5 border-white absolute pb-5">
                  <img
                    className="w-[39px] h-[39px] rounded-full"
                    src={image}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div>
              <img
                className="absolute w-[24px] lg:w-[39px] left-0 -bottom-0.5 lg:bottom-12"
                src={Group}
                alt=""
              />
            </div>
          </div>

          <div className="bg-[url('https://d3k81ch9hvuctc.cloudfront.net/company/V9KZ9Y/images/a962b2f4-8b2f-4194-b3ed-13de0c234ccc.jpeg')] addFlex   h-[240px] lg:h-full  lg:w-[763px]">
            <div className="w-[49px] h-[49px] addFlex bg-p1 rounded-full">
              <FaPlay className="text-lg" />
            </div>
          </div>
        </div>
        <div className="flex justify-center  lg:hidden mt-5 ">
          <CarouselButton handleNext={handleNext} handlePrev={handlePrev} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
