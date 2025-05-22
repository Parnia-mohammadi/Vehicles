import { useCallback, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";
import Table from "../../ui/Table";
import { useVehicles } from "../../hooks/useVehicles";
import Error from "../../ui/Error";
import { useCurrentVehicle } from "../../context/vehiclesProvider";
import { BatteryChargingIcon, MousePointerClick } from "lucide-react";
import BatteryLevel from "../../ui/BatteryLevel";

const headers = ["Plate", "Fuel Type", "Address"];

function VehicleList() {
  const { page, setCurrentVehicle, currentVehicle } = useCurrentVehicle();
  const { data: vehicles = [], isLoading, error } = useVehicles();
  const vehiclesPerPage = 50;
  const rowRef = useRef([]);

  const fetchedVehiclesOfEachPage = useMemo(() => {
    if (isLoading || !vehicles) return [];
    const allVehiclesLength = vehicles.length;
    const start = (page - 1) * vehiclesPerPage;
    const end = Math.min(start + vehiclesPerPage, allVehiclesLength);
    if (start >= allVehiclesLength) {
      return [];
    }
    const VehiclesOfPage = vehicles.slice(start, end);
    return VehiclesOfPage;
  }, [page, vehiclesPerPage, vehicles]);

  useEffect(() => {
    if (!currentVehicle || !vehicles) return;
    const indexOfVehicle = vehicles.findIndex(
      (v) => v.vin === currentVehicle.vin
    );
    const vehicleIndexOfEachPage = indexOfVehicle % vehiclesPerPage;

    if (indexOfVehicle !== -1 && rowRef.current[vehicleIndexOfEachPage]) {
      rowRef.current[vehicleIndexOfEachPage].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentVehicle, vehicles]);

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <Table
      headers={headers}
      data={fetchedVehiclesOfEachPage}
      rowKey="vin"
      rowClass={(vehicle) =>
        vehicle.vin === currentVehicle?.vin ? "active-row" : ""
      }
      renderRow={(vehicle) => (
        <>
          <td className="mytable-cell">{vehicle.plate}</td>
          <td className="mytable-cell">
            <div className="flex items-center justify-center gap-1">
              <p>{vehicle.fuelType}</p>
              <BatteryLevel fuelLevel={vehicle.fuelLevel} />
            </div>
          </td>
          <td className="mytable-cell w-fit">
            <Link
              to={`/vehicles/${vehicle.vin}`}
              onClick={() => setCurrentVehicle(vehicle)}
              className="link flex items-center gap-1 max-w-1/2"
            >
              <p className="truncate">{vehicle.address}</p>
              <MousePointerClick size={20} />
            </Link>
          </td>
        </>
      )}
      ref={rowRef}
    />
  );
}

export default VehicleList;
