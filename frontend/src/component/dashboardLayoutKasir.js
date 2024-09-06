import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import SidebarKasir from "./sidebarKasir";

const DashboardLayoutKasir = () => {
  return (
    <div style={{ display: "flex" }}>
      <SidebarKasir />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayoutKasir;
