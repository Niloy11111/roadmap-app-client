import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../../redux/features/admin/productManagement.api";

const BikeDetails = () => {
  const { id } = useParams();
  const { data: bikeData, isLoading, isFetching } = useGetProductByIdQuery(id);

  if (isLoading || isFetching || !bikeData?.data) {
    return (
      <div className="h-[100vh]">
        <div className="loader ">Loading...</div>;
      </div>
    ); // Handle loading or missing data case
  }

  const {
    brand,
    category,
    createdAt,
    description,
    inStock,
    model,
    name,
    photoURL,
    price,
    quantity,
    updatedAt,
    _id,
  } = bikeData.data;

  const arr = [category, brand, quantity, model];

  console.log(inStock);

  const result = true;

  return (
    <div className="mt-[50px] mb-[130px]">
      <div
        className="mb-16 lg:mb-[130px] relative detailsBg  w-full h-[30vh] lg:h-[45vh] 
         bg-no-repeat 
         rounded-xl flex items-center "
      >
        <h1 className="ml-5 lg:ml-[100px] text-[40px] lg:text-[45px] font-bold text-white">
          Bike Details
        </h1>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  w-full lg:max-w-[296px] max-w-[200px]">
          <svg
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 296 50"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d="M296 49.3H0L27.8 0H268.3L296 49.3Z" fill="#FF3811" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              fill="white"
              fontSize="16"
            >
              Home/Bike Details
            </text>
          </svg>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-6">
        <div className="flex-1">
          <img className="h-[400px] w-full" src={photoURL} alt="" />

          <h1 className=" mt-[50px] text-[35px] font-bold ">
            {name} {model}
          </h1>

          <p className="text-d1 mt-[30px]">{description}</p>
        </div>

        <div className=" w-[364px]">
          <div className="bg-[#D9D9D9] h-[490px] rounded-xl ">
            <h1 className="text-[#151515] text-[25px] font-bold pt-[40px] ml-[40px] mb-[20px]">
              Features
            </h1>

            {arr.map((item) => (
              <div className="w-[284px] h-[56px] flex justify-between bg-p1 items-center px-[18px] rounded ml-[40px] mb-5">
                <div>
                  <p className="font-semibold text-white">
                    {item === model
                      ? `Model ${item}`
                      : item === quantity
                      ? inStock
                        ? `${item} Available`
                        : "Stock Out"
                      : item}
                  </p>
                </div>

                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h1 className="font-bold text-[35px] my-[30px]">
              Price ${price}.00
            </h1>

            <Link to={`/checkout/${id}`}>
              <button className="cursor-pointer w-full h-[56px]  bg-p1 items-center  rounded text-white font-semibold text-[18px] flex justify-center">
                Proceed Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
