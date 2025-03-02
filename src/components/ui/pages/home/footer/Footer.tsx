import { Link } from "react-router-dom";
import { links, storeDetails } from "../testimonials/testimonials.constants";

const Footer = () => {
  return (
    <section className=" w-full addFlexItems bg-blend-overlay bg-[#000000CC]  h-[999px] lg:h-[719px] bg-center  bg-cover  bg-no-repeat bg-[url('https://cycletribe.ie/cdn/shop/files/bike-to-work.png?v=1731166036&width=2000')]">
      <div className="customWidth h-[939px] lg:h-[429px] addFlexBetween flex-col">
        <div className="h-[708px] lg:h-[236px] addFlexBetween flex-col">
          <h3 className="regularTitle  uppercase font-semibold text-white text-center ">
            Get ready for the best cycling experience with us!
          </h3>
          <div className="grid lg:grid-cols-4 gap-6  ">
            {storeDetails.map(({ id, title, icon, subOne, subTwo }) => (
              <div
                key={id}
                className="h-[136px] lg:h-[144px] addFlexBetween flex-col"
              >
                <img className="mx-auto" src={icon} alt="" />
                <h4 className="cardTitle text-white">{title}</h4>
                <div>
                  <p className="subTitleCard text-[#F7F8F9] ">{subOne}</p>
                  <p className="subTitleCard text-[#F7F8F9] ">{subTwo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="  addFlexBetween flex-col h-[71px] lg:h-[103px]">
          <div className="addFlexBetween w-[192px] lg:w-[285px]">
            {links.map((link, index) => (
              <Link to="https://www.facebook.com/cyclesuperstore" key={index}>
                <div className="cursor-pointer w-[36px] lg:w-[53px] h-[36px] lg:h-[53px] addFlex border border-[#E5E7EB] rounded-full">
                  <img src={link} alt="" />
                </div>
              </Link>
            ))}
          </div>
          <p className="font-Roboto text-white lg:text-[21px]">
            © 2023 All Rights Reserved{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
