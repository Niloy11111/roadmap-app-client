import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../ui/navbar/Navbar";

const RootLayout = () => {
  const { pathname } = useLocation();
  const hideNavbarPaths = ["/login", "/change-password", "/register"];
  return (
    <div className="w-5/7 mx-auto font-Inter text-[#000000]">
      {!hideNavbarPaths.includes(pathname) && <Navbar />}
      <Outlet />
    </div>
  );
};

export default RootLayout;
