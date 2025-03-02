import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../ui/navbar/Navbar";
import Footer from "../ui/pages/home/footer/Footer";

const RootLayout = () => {
  const { pathname } = useLocation();
  const hideNavbarPaths = ["/login", "/change-password", "/register"];

  return (
    <div>
      <div className="w-5/7 mx-auto font-Inter text-[#000000]">
        {!hideNavbarPaths.includes(pathname) && <Navbar />}
        <Outlet />
      </div>

      {/* Conditionally render Footer */}
      {!hideNavbarPaths.includes(pathname) && <Footer />}
    </div>
  );
};

export default RootLayout;
