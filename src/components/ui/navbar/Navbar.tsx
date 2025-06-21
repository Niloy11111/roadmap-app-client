import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="fixed z-30 top-8 left-1/2 transform -translate-x-1/2  px-10  w-3/5 mx-auto py-5 border-b shadow-2xl rounded-full bg-[#f8fafc] border-b1 pb-4 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-center ">RoadMap</h1>
      </div>

      {user?._id ? (
        <div className="flex items-center gap-3">
          <div className="flex">
            <img
              className="w-[40px]  rounded-full"
              src={user?.img}
              alt={user?.name}
            />
          </div>
          <div>
            <p>{user?.name?.slice(0, 12)}.</p>
            <button
              onClick={handleLogout}
              className="text-sm flex items-center gap-1 font-Inter font-semibold  text-p1 hover:text-red-500 cursor-pointer"
            >
              Logout <LogOut className="w-[20px]" />
            </button>
          </div>
        </div>
      ) : (
        <Link to={`/login`}>
          <button className="cursor-pointer hover:bg-gray-900 hover:text-white text-xl px-6 py-2 border border-b1 rounded-lg">
            Log in
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
