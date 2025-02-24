import { NavLink } from "react-router-dom";
import OverviewDashboard from "../pages/overviewDashboard/OverviewDashboard";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { TSidebarItem, TUserPath } from "../types";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  return <div onClick={() => dispatch(logout())}>Logout</div>;
};

export const commonPaths = [
  {
    name: "Overview Dshboard",
    path: "overview-dashboard",
    element: <OverviewDashboard />,
  },
];

export const sidebarItemsGenerator = (items: TUserPath, role: string) => {
  const sidebarItems = [...commonPaths, ...items].reduce(
    (acc: TSidebarItem[], item) => {
      if (item.path && item.name) {
        acc.push({
          key: item.name,
          label: <NavLink to={`/${role}/${item.path}`}>{item.name} </NavLink>,
        });
      }

      if (item.children) {
        acc.push({
          key: item.name,
          label: item.name,
          children: item.children.map((child) => {
            if (child.name) {
              return {
                key: child.name,
                label: (
                  <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                ),
              };
            }
          }),
        });
      }

      return acc;
    },
    []
  );

  // Add Logout at the end of the menu
  sidebarItems.push({
    key: "logout",
    label: <LogoutButton />,
  });

  return sidebarItems;
};
