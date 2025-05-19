import { Outlet } from "react-router-dom";
import VehicleMap from "./VehicleMap";

function AppLayout() {
  return (
    <div className="flex justify-between items-center gap-2">
      <div>
        <Outlet />
      </div>
      <VehicleMap />
    </div>
  );
}

export default AppLayout;
