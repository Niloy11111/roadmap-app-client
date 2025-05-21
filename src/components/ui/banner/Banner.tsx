import { slides } from "../../../constants/global";
import BannerSlider from "./BannerSlider";

const Banner = () => {
  return (
    <>
      <div className=" lg:h-[680px]  -mx-[20%] ">
        <BannerSlider slides={slides}> </BannerSlider>
      </div>
    </>
  );
};

export default Banner;
