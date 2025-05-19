import { Outlet } from "react-router-dom";
import VehicleMap from "./VehicleMap";

function AppLayout({ vehicles, selectedVehicle, onSelectVehicle }) {
  return (
    <div className="flex justify-between items-center gap-2">
      <div>
        <Outlet />
      </div>
      <VehicleMap
        vehicles={vehicles}
        selectedVehicle={selectedVehicle}
        onSelectVehicle={onSelectVehicle}
      />
    </div>
  );
}

export default AppLayout;
