import axios from "axios";
import { useState } from "react";

import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userInputs } from "../../constants/global";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import "./register.scss";
const Register = () => {
  const [register] = useRegisterMutation();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const defaultValues = {
    name: "John doe",
    email: "johndoe@gmail.com",
    password: "securepassword",
    phone: "018232342342",
    country: "Bangladesh",
    city: "Dhaka",
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    const toastId = toast.loading("Regestering..");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dofbykuhh/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const userInfo = {
        ...info,
        img: url,
      };
      console.log("newuser", userInfo);
      const res = await register(userInfo).unwrap();
      console.log("new res", res);
      toast.success("Regestered", { id: toastId, duration: 2000 });
      navigate(`/login`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="w-4/6 mx-auto">
      <div className=" new flex items-center h-[100vh]">
        {/* <Sidebar /> */}
        <div className="newContainer">
          {/* <Navbar /> */}
          <div className="top ">
            <h1 className="!text-d2">User Registration Form</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <Upload className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>

                {userInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                      className=""
                    />
                  </div>
                ))}
                <button onClick={handleClick}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
