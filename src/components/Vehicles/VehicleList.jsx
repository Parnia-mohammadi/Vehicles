import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";
import Table from "../../ui/Table";
import { useVehicles } from "../../hooks/useVehicles";
import Error from "../../ui/Error";
import { useCurrentVehicle } from "../../context/vehiclesProvider";
import { MousePointerClick } from "lucide-react";

const headers = ["Plate", "Address", "Free For Rental"];

function VehicleList() {
  const { page, setCurrentVehicle, currentVehicle } = useCurrentVehicle();
  const { data: vehicles = [], isLoading, error } = useVehicles();
  const vehiclesPerPage = 50;
  const rowRef = useRef([]);

  const fetchVehiclesOfEachPage = useCallback(() => {
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
    const vehicleIndex = vehicles.findIndex(
      (v) => v.vin === currentVehicle?.vin
    );
    if (vehicleIndex !== -1 && rowRef.current[vehicleIndex]) {
      rowRef.current[vehicleIndex].scrollIntoView({
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
      data={fetchVehiclesOfEachPage()}
      rowKey="vin"
      rowClass={(vehicle) =>
        vehicle.vin === currentVehicle?.vin ? "active-row" : ""
      }
      renderRow={(vehicle) => (
        <>
          <td className="table-cell">{vehicle.plate}</td>
          <td className="table-cell w-fit">
            <Link
              to={`/vehicles/${vehicle.vin}`}
              onClick={() => setCurrentVehicle(vehicle)}
              className="link flex items-center gap-1 max-w-1/2"
            >
              <p className="truncate">{vehicle.address}</p>
              <MousePointerClick size={20} />
            </Link>
          </td>
          <td className="table-cell">{vehicle.freeForRental ? "Yes" : "No"}</td>
        </>
      )}
      ref={rowRef}
    />
  );
}

export default VehicleList;
