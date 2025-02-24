const FeatureadItem = ({ item }) => {
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
    <div className="border border-[#D9D9D9] rounded-xl p-4">
      <img className="rounded-xl w-full h-[220px]" src={photoURL} alt="" />

      <div className="flex justify-center  gap-5 my-2">
        <span className="px-4 py-2 bg-[#FF381112] rounded-full text-sm">
          {brand}
        </span>
        <span className="bg-[#FF381112] px-4 py-2  rounded-full text-sm">
          {category}
        </span>
        <span className="bg-[#FF381112] px-4 py-2  rounded-full text-sm">
          {model}
        </span>
      </div>

      <h1 className="mt-3 text-[25px] font-bold text-center">{name}</h1>
      <p className="text-p1 text-[20px] font-semibold text-center">${price}</p>
    </div>
  );
};

export default FeatureadItem;
