import { Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="font-Inter text-5xl">
      <Layout
        style={{
          height: "100vh",

          overflow: "hidden",
        }}
      >
        <Sidebar />
        <Layout>
          <Header style={{ backgroundColor: "#1a1a1a", color: "black" }}>
            <Link to="/">
              <Button className="ant-button hoverButton">Go Home</Button>
            </Link>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "auto",
              height: "calc(100vh - 64px)",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
