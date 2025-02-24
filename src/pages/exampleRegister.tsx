import { useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
const exampleRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    name: "David",
    email: "david@gmail.com",
    password: "securepassword",
    phone: "018232342342",
  };

  const [register] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Regestering..");

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await register(userInfo).unwrap();
      console.log("new res", res);

      // const user = verifyToken(res.data.accessToken) as TUser;
      // dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Regestered", { id: toastId, duration: 2000 });

      navigate(`/login`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      {/* <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput type="text" name="name" label="Full Name:" />
          <PHInput type="email" name="email" label="Email:" />

          <PHInput type="text" name="password" label="Password:" />

          <Button htmlType="submit">exampleRegister</Button>

          <p className="mt-2">
            Already have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </PHForm>
      </Row> */}

      {/* <AddUser inputs={userInputs} title="Add New User" /> */}
    </>
  );
};

export default exampleRegister;
