import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TUser } from "../../types";
import { verifyToken } from "../../utils/verifyToken";
import "./login.scss";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  // const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(credentials);

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: "LOGIN_START" });
  //   try {
  //     const res = await axios.post("/auth/login", credentials);
  //     if (res.data.isAdmin) {
  //       dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
  //       navigate("/");
  //     } else {
  //       dispatch({
  //         type: "LOGIN_FAILURE",
  //         payload: { message: "You are not allowed" },
  //       });
  //     }
  //   } catch (err) {
  //     dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in");

    try {
      const res = await login(credentials).unwrap();
      console.log(credentials);
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/`);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="login">
      <form className="lContainer">
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button onClick={handleClick} className="lButton">
          Login
        </button>

        <p className="mt-2 ">
          Don't have an account?{" "}
          <Link className="text-[#29b170]" to="/register">
            Create Account
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
