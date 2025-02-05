import { Outlet } from "react-router-dom";
import Navbar from "../ui/navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="w-5/7 mx-auto font-Inter text-[#000000]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
