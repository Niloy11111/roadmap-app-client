import AllBikes from "../pages/admin/academicManagement/AllBikes";
import CreateBike from "../pages/admin/academicManagement/CreateBike";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Courses from "../pages/admin/courseManagement/Courses";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import OfferCourse from "../pages/admin/courseManagement/OffereCourse";
import RegisteredSemesters from "../pages/admin/courseManagement/RegesteredSemesters";
import OrderLists from "../pages/admin/orderManagemnt/OrderLists";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import StudentDetails from "../pages/admin/userManagement/studentDetails";
import UserData from "../pages/admin/userManagement/UserData";

export const adminPaths = [
  {
    name: "Profile",
    path: "profile",
    element: <AdminDashboard />,
  },

  {
    name: "Product Management",
    children: [
      {
        name: "Create Bike",
        path: "create-bike",
        element: <CreateBike />,
      },
      {
        name: "All Bikes",
        path: "all-bikes",
        element: <AllBikes />,
      },
      // {
      //   name: "Academic Faculty",
      //   path: "academic-faculty",
      //   element: <AcademicFaculty />,
      // },
      // {
      //   name: "Create A. Department",
      //   path: "create-academic-department",
      //   element: <CreateAcademicDepartment />,
      // },
      // {
      //   name: "Academic Department",
      //   path: "academic-department",
      //   element: <AcademicDepartment />,
      // },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "User Lists",
        path: "user-lists",
        element: <UserData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
  {
    name: "Order Management",
    children: [
      {
        name: "Order Lists",
        path: "order-lists",
        element: <OrderLists />,
      },
      {
        name: "Registered Semesters",
        path: "registered-semesters",
        element: <RegisteredSemesters />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      // {
      //   name: 'Offered Courses',
      //   path: 'offered-courses',
      //   element: <OfferedCourse />,
      // },
    ],
  },
];
