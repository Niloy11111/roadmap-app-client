import { ConfigProvider } from "antd";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fff",
          fontFamily: "Inter, sans-serif",
          // colorPrimaryHover: "black",
          colorPrimaryActive: "black",
          colorTextBase: "black",
          colorBgContainer: "#ffffff", // Main content background (Pure White)
          colorText: "#111111", // Dark text for readability
          colorBgLayout: "#f5f5f5", // Soft Gray for layout background
          colorTextLightSolid: "#ffffff", // Light text color (For contrast)
        },
        components: {
          Input: {
            activeBorderColor: "black", // Border color when input is focused
            colorBgContainer: "#fff",
          },

          DatePicker: {
            activeBorderColor: "black", // Black border when clicked
            colorBgContainer: "#fff", // Background remains white
            colorBorder: "#fff", // Default white border before active
          },
          Button: {
            colorText: "#000", // Default button text color
            colorPrimaryHover: "black",
            colorPrimary: "black",
            colorBgTextHover: "#f0f0f0",
          },

          Checkbox: {
            colorPrimary: "black",
            colorText: "#000", // Default button text color
            colorPrimaryHover: "black",
          },
          Layout: {
            headerBg: "#1f1f1f", // Dark Gray header for smoothness
            siderBg: "#1a1a1a", // Slightly lighter Black for sidebar
            footerBg: "#1f1f1f", // Footer matching header
          },
          Menu: {
            itemBg: "#1a1a1a", // Menu background matching sidebar
            itemHoverBg: "#333333", // Hover effect with smooth transition
            itemSelectedBg: "#444444", // Slightly brighter selected menu
            itemHoverColor: "#ffffff", // White text on hover
            itemSelectedColor: "#ffffff", // White text for selected item
            itemColor: "#cccccc", // Light gray for better readability
            horizontalItemHoverBg: "#292929", // Soft hover for horizontal menu
            itemActiveBg: "#444444",
          },
        },
      }}
    >
      <ProtectedRoute role={undefined}>
        <MainLayout />
      </ProtectedRoute>
    </ConfigProvider>
  );
}

export default App;
