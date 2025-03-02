import { slides } from "../../../constants/global";
import BannerSlider from "./BannerSlider";

const Banner = () => {
  return (
    <>
      <div className="w-full  lg:h-[680px] mx-auto  ">
        <BannerSlider slides={slides}> </BannerSlider>
      </div>
    </>
  );
};

export default Banner;
