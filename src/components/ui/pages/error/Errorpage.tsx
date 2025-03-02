import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div>
        <img
          className="w-[500px]"
          src="https://i.ibb.co/gjC7Ttm/error-404-concept-illustration-114360-1811.jpg"
        ></img>
        <h1 className=" text-4xl uppercase font-extrabold mb-3 text-center">
          404 - Not Found!
        </h1>
        <NavLink to="/">
          <div className="flex justify-center">
            <button className="ml-2 lg:ml-4 bg-p1 px-7 py-2.5 transition-all text-white  duration-300   rounded">
              Go Home
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
