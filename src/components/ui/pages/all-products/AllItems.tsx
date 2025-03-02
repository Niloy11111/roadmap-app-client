import { Button, Select } from "antd";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { categories, priceLists } from "../../../../constants/global";
import { useGetAllProductsQuery } from "../../../../redux/features/admin/productManagement.api";
import { TQueryParam } from "../../../../types";
import SingleProductItems from "./SingleProductItem";

const AllItems = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { register, handleSubmit, reset } = useForm();

  const searchedData = {};

  const {
    data: bikeData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(params);

  // console.log("search", bikeData);

  const onSubmit = async (data) => {
    if (data.searchTerm) {
      setParams([
        ...(params?.filter((p) => p.name !== "searchTerm") || []),
        { name: "searchTerm", value: data.searchTerm },
      ]);
    }
    reset();
  };

  const models = bikeData?.data?.map((item) => item.model);

  const modelOptions = [...new Set(models)]?.map((item) => ({
    value: item,
    label: item,
  }));
  const brands = bikeData?.data?.map((item) => item.brand);

  const brandOptions = [...new Set(brands)]?.map((item) => ({
    value: item,
    label: item,
  }));

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setParams([
      ...(params?.filter((p) => p.name !== "searchTerm") || []),
      { name: "searchTerm", value: value },
    ]);
  };

  return (
    <div className={`mt-10 mb-20 `}>
      <div
        onClick={() => setOpenFilter(!openFilter)}
        className="my-5 cursor-pointer"
      >
        <h1 className="flex  items-center justify-between  lg:hidden bg-[#1a1a1a] text-white p-4">
          SHOW FILTER {openFilter ? <Minus /> : <Plus />}
        </h1>
      </div>
      <h1 className="text-2xl smHidden font-bold mb-3"> All Products</h1>
      <div className="flex lg:flex-row flex-col gap-10">
        <div
          className={`${
            openFilter ? "lg:w-[300px] lg:block" : "hidden lg:block"
          } lg:w-[300px]`}
        >
          <div className="border-2 border-b1  py-2 px-2 uppercase font-semibold">
            Shop by Price
          </div>

          <div className="mt-5">
            {priceLists.map(({ minPrice, maxPrice }, index) => (
              <p
                key={index}
                onClick={() =>
                  setParams([
                    ...(params?.filter(
                      (p) => p.name !== "minPrice" && p.name !== "maxPrice"
                    ) || []),
                    { name: "minPrice", value: minPrice },
                    { name: "maxPrice", value: maxPrice },
                  ])
                }
                className="pt-2 text-sm cursor-pointer transition-all duration-300 hover:text-p1 border-b border-b2 pb-2"
              >
                ${minPrice}.00 - ${maxPrice}.00
              </p>
            ))}
          </div>

          <div className="text-sm mt-5 border-2 border-b1  py-2 px-2 uppercase font-semibold mb-2">
            category
          </div>

          <div className="mt-5">
            {categories.map((item, index) => (
              <p
                key={index}
                className="pt-2 text-sm cursor-pointer transition-all duration-300 hover:text-p1 border-b border-b2 pb-2"
                onClick={() =>
                  setParams([
                    ...(params?.filter((p) => p.name !== "searchTerm") || []),
                    { name: "searchTerm", value: item },
                  ])
                }
              >
                {item}
              </p>
            ))}
          </div>
          <div className="text-sm mt-5 border-2 border-b1  py-2 px-2 uppercase font-semibold mb-2">
            Model
          </div>

          <Select
            defaultValue="Filter By Models"
            style={{ width: "100%" }}
            size="large"
            onChange={handleChange}
            options={modelOptions}
          />
          <div className="text-sm mt-5 border-2 border-b1  py-2 px-2 uppercase font-semibold mb-2">
            Brand
          </div>

          <Select
            defaultValue="Filter By Brands"
            style={{ width: "100%" }}
            size="large"
            onChange={handleChange}
            options={brandOptions}
          />
        </div>

        <div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="" action="">
              <div className="mb-5  w-full lg:w-[350px]    flex gap-2 rounded-lg ">
                <input
                  {...register("searchTerm", { required: true })}
                  name="searchTerm"
                  onChange={(e) =>
                    setParams([
                      ...(params?.filter((p) => p.name !== "searchTerm") || []),
                      { name: "searchTerm", value: e.target.value },
                    ])
                  }
                  id="field-id"
                  className="pl-3  rounded-lg  w-full h-[50px] outline-none   "
                  type="text"
                  placeholder="Find Bike"
                />

                <Button
                  htmlType="submit"
                  type="default"
                  style={{
                    height: "50px",
                  }}
                >
                  {" "}
                  <BsSearch className="   text-lg"></BsSearch>
                </Button>
              </div>
            </form>
          </div>
          {isLoading || isFetching || !bikeData?.data ? (
            <div className="loader ml-40 ">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
              {bikeData?.data?.map((item) => (
                <SingleProductItems
                  item={item}
                  key={item._id}
                ></SingleProductItems>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllItems;
