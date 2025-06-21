import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useGetAllRoadmapsQuery } from "../../../../../redux/features/roadmap/roadmapManagement.api";
import { TQueryParam } from "../../../../../types/global";
import RoadmapCard from "./RoadmapCard";

const Feature = () => {
  const [params, setParams] = useState<TQueryParam[] | []>([]);
  const upvoteParam = params?.find((item) => item.name === "sort");
  const {
    data: roadmapItems,
    isLoading,
    isFetching,
  } = useGetAllRoadmapsQuery(params);

  const upvoteValue = upvoteParam?.value;
  const handleChange = (value: string) => {
    if (value === "all") {
      setParams([]);
      return;
    }
    setParams([{ name: "searchTerm", value: value }]);
  };

  const handleSort = (value: string) => {
    setParams((prev) => [
      ...(prev?.filter((p) => p.name !== "sort") || []),
      { name: "sort", value: value },
    ]);
  };
  // handleChange(value);
  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setParams([]);
      return;
    }
    setParams((prev) => [
      ...prev.filter((item) => item.name !== "searchTerm"),
      { name: "searchTerm", value },
    ]);
  };

  // console.log("roadmaps", params);
  return (
    <div className="w-3/5 mx-auto shadow-2xl rounded-xl bg-[#f3f4f6]">
      <div className=" flex  gap-5 justify-center border-b py-3 border-b1">
        {" "}
        <button
          onClick={() => handleChange("all")}
          className={`tabBtn ${params?.length === 0 ? "bg-p1 text-white" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => handleChange("Planned")}
          className={`tabBtn ${
            params?.length > 0 && params[0]?.value === "Planned"
              ? "bg-p1 text-white"
              : ""
          }`}
        >
          Planned
        </button>
        <button
          onClick={() => handleChange("In Progress")}
          className={`tabBtn ${
            params?.length > 0 && params[0]?.value === "In Progress"
              ? "bg-p1 text-white"
              : ""
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => handleChange("Completed")}
          className={`tabBtn ${
            params?.length > 0 && params[0]?.value === "Completed"
              ? "bg-p1 text-white"
              : ""
          }`}
        >
          Completed
        </button>
        {(!upvoteValue || upvoteValue === "false") && (
          <button
            onClick={() => handleSort("true")}
            className={`tabBtn ${
              upvoteValue === "true" ? "bg-p1 text-white" : ""
            }`}
          >
            Most Upvoted
          </button>
        )}
        {upvoteValue === "true" && (
          <button
            onClick={() => handleSort("false")}
            className={`tabBtn ${
              upvoteValue === "true" ? "bg-p1 text-white" : ""
            }`}
          >
            Least Upvoted
          </button>
        )}
        <div className="flex items-center ">
          <select
            onChange={(e) => handleSelect(e)}
            className="rounded-xl py-3 appearance-none  border border-gray-300 px-3   w-[160px]"
          >
            <option value="all">All Category</option>
            <option value="Authentication">Authentication</option>
            <option value="Features">Features</option>
            <option value="Security">Security</option>
            <option value="Performance">Performance</option>
            <option value="Admin">Admin</option>
          </select>
          <div>
            <ChevronDown className="-ml-10" />
          </div>
        </div>
      </div>

      <div className="my-5 pb-5">
        {roadmapItems?.data?.map((item) => (
          <RoadmapCard key={item?._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Feature;
