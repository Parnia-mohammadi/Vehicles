import { useEffect, useRef } from "react";
import { useVehicles } from "../context/vehiclesProvider";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Table from "../ui/Table";

const headers = ["Index", "VIN", "Build Series"];

function VehicleList() {
  const { vehicles, page, setCurrentVehicle, isLoading, currentVehicle } =
    useVehicles();
  const vehiclesPerPage = 50;
  const rowRefs = useRef([]);

  useEffect(() => {
    if (!currentVehicle) return;
    const vehicleIndex = vehicles.findIndex(
      (v) => v.vin === currentVehicle?.vin
    );
    if (vehicleIndex !== -1 && rowRefs.current[vehicleIndex]) {
      rowRefs.current[vehicleIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentVehicle]);

  if (isLoading) return <Loader />;

  return (
    <Table
      headers={headers}
      data={vehicles}
      rowKey="vin"
      rowClass={(vehicle) =>
        vehicle.vin === currentVehicle?.vin ? "active-row" : ""
      }
      renderRow={(vehicle, index) => (
        <>
          <td className="table-cell">
            {index + 1 + (page - 1) * vehiclesPerPage}
          </td>
          <td className="table-cell">
            <Link
              to={`/vehicles/${vehicle.vin}`}
              onClick={() => setCurrentVehicle(vehicle)}
              className="link"
            >
              {vehicle.vin}
            </Link>
          </td>
          <td className="table-cell">{vehicle.buildSeries}</td>
        </>
      )}
    />
  );
}

export default VehicleList;
