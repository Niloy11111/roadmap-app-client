import { Link } from "react-router-dom";

const SingleProductItem = ({ item }) => {
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
  } = item;

  return (
    <div className="hover:shadow-xl transition-all duration-500 p-4 relative">
      {inStock === false ? (
        <button className="bg-p1 w-[130px] h-[45px] rounded-l-full absolute right-0 text-white">
          <p className="font-semibold">Stock Out</p>
        </button>
      ) : (
        ""
      )}

      <p className="uppercase text-[#363636] text-[11px]">
        2025 // {brand} // {model}{" "}
      </p>

      <img className="rounded-xl w-full h-[220px]" src={photoURL} alt="" />

      {/* <div className="flex justify-center  gap-5 my-2">
        <span className="px-4 py-2 bg-[#FF381112] rounded-full text-sm">
          {brand}
        </span>
        <span className="bg-[#FF381112] px-4 py-2  rounded-full text-sm">
          {category}
        </span>
        <span className="bg-[#FF381112] px-4 py-2  rounded-full text-sm">
          {model}
        </span>
      </div> */}

      <div className=" mt-3 flex items-center border-t-4 border-[#363636] justify-between">
        <h1 className="text-[#363636]  text-[18px] font-bold ">{name}</h1>
        <h1 className="text-sm w-[70px] flex justify-center mt-3  text-[#29B170] border rounded-lg p-0.5">
          {category}
        </h1>
      </div>
      <p className=" text-sm font-semibold ">$ {price}*</p>

      <Link to={`/details/${_id}`}>
        <button className=" cursor-pointer hover:bg-white hover:text-[#29B170] mt-2 px-5 py-3 text-white bg-[#29B170] text-[12.8px] uppercase">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default SingleProductItem;
