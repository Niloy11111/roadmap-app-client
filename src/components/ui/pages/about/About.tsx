import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/rKHsBJLn/Screenshot-2025-02-11-134639.png')",
        }}
        className=" bg-no-repeat  bg-blend-overlay  bg-cover lg:h-[70vh] h-[30vh] mx-[-20%]  flex items-center lg:bg-cover bg-center"
      >
        <div className="ml-5 lg:ml-24  ">
          <div className="space-y-6 lg:space-y-5">
            <h2
              className="text-white text-4xl md:text-5xl lg:text-6xl  
      font-semibold  "
            >
              Best Bike options <br />
              <span className=" text-p1"> for customers</span>
            </h2>

            <div className="">
              <Link to={`/`}>
                <button className=" px-4 py-3 rounded-xl text-white  bg-p1">
                  <span className=""> Start Now</span>
                </button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="mission my-10">
        <h2 className=" mt-10 text-center text-[45px] font-semibold">
          Our Mission
        </h2>
        <p className="text-center text-d1">
          Our mission at BikeBari is simple: to provide premium bikes, gear, and
          services at an affordable price while maintaining the highest level of
          customer satisfaction. We aim to foster a love for cycling and build
          lasting relationships with our customers.
        </p>
      </section>

      <section className="my-10 flex lg:flex-col flex-col items-center justify-center gap-10">
        <div className="flex gap-5">
          <img
            className="w-[500px] rounded-xl"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeUn_DrX-peFK8Zv83FG4fFR4tW-G3EHTKGQ&s"
            alt=""
          />
          <img
            className="w-[500px] rounded-xl"
            src="https://www.sefiles.net/merchant/3379/images/site/slideshow-JC-checkpoint.jpg"
            alt=""
          />
        </div>
        <div>
          <h2 className="  text-[25px] font-semibold">What Sets Us Apart</h2>
          <ul>
            <li>**Experienced and passionate staff ready to assist you.</li>
            <li>**Custom bikes and accessories to suit every rider's needs.</li>
            <li>**Top-tier brands, handpicked for quality and performance.</li>
            <li>
              ** Repair services for all bike types, ensuring you're always on
              the road.
            </li>
          </ul>
        </div>
      </section>

      <section className=" mx-[-20%]">
        <h2 className="  text-center text-[45px] font-semibold">Contact Us</h2>

        <p className="text-center text-d1 mb-4">
          If you have any questions, feel free to get in touch with us:
        </p>
        <ul className="flex  lg:flex-row flex-col py-10 text-center  justify-center items-center gap-5 bg-p1 text-white text-2xl lg:h-[100px] ">
          <li>
            Email: <a href="mailto:info@bikebari.com">info@bikebari.com</a>
          </li>
          <li>Phone: +123 456 789</li>
          <li>Address: 123 BikeBari Dublin, Ireland, </li>
        </ul>
      </section>
    </>
  );
};

export default About;
