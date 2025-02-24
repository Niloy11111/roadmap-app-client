import { Layout, Menu } from "antd";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";

import { customerPaths } from "../../routes/customer.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { verifyToken } from "../../utils/verifyToken";

const { Header, Content, Footer, Sider } = Layout;

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const userRole = {
    ADMIN: "admin",
    STUDENT: "customer",
  };

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(customerPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Bike Shop
      </div>
      <Menu
        theme="light" // Use light theme for white background
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
        style={{ backgroundColor: "#1a1a1a", color: "black" }} // White background for menu
      />
    </Sider>
  );
};

export default Sidebar;
