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
      navigate(`/`);
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
          className="lInput border border-b2 rounded "
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput border border-b2 rounded"
        />
        <button onClick={handleClick} className="lButton ">
          Login
        </button>

        <p className="mt-2 ">
          Don't have an account?{" "}
          <Link className="text-p1 " to="/register">
            Create Account
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
