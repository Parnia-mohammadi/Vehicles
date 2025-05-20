import { Outlet } from "react-router-dom";
import VehicleMap from "./VehicleMap";

function AppLayout() {
  return (
    <div className="flex justify-between items-center gap-2 bg-[#f1f5f9] text-text">
      <div className="flex items-center justify-center mx-auto w-[45%]">
        <Outlet />
      </div>
      <VehicleMap />
    </div>
  );
}

export default AppLayout;
