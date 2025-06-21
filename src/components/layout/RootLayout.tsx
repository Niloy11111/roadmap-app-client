import Favicon from "react-favicon";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../ui/navbar/Navbar.jsx";
const RootLayout = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const hideNavbarPaths = [
    "/login",
    "/change-password",
    "/register",
    "/all-products",
    `/details/${id}`,
    "/about",
  ];

  return (
    <div className="bg-[#eff0f2] py-8">
      <Favicon url="https://i.ibb.co.com/tMxXTP6M/download-1.png" />
      <div className=" font-Lato text-[#000000] ">
        {!hideNavbarPaths.includes(pathname) && <Navbar />}
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
