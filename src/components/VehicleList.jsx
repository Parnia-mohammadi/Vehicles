import { useEffect, useRef } from "react";
import { useVehicles } from "../context/vehiclesProvider";
import { Link } from "react-router-dom";
import Loader from "./Loader";

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
    <div className="w-full h-[60vh] flex flex-col justify-center">
      <div className="flex-grow h-full items-center overflow-y-auto rounded-lg ml-12">
        <table className="w-full border-collapse bg-white">
          <thead className="sticky top-0 bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Index</th>
              <th className="p-3 text-left">VIN</th>
              <th className="p-3 text-left">Build Series</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr
                key={vehicle.vin}
                className={`border-b border-gray-300 hover:bg-gray-100 ${
                  vehicle.vin === currentVehicle?.vin ? "bg-indigo-100" : ""
                }`}
                ref={(el) => (rowRefs.current[index] = el)}
              >
                <td className="p-3">
                  {index + 1 + (page - 1) * vehiclesPerPage}
                </td>
                <td className="p-3">
                  <Link
                    to={`/vehicles/${vehicle.vin}`}
                    onClick={() => setCurrentVehicle(vehicle)}
                    className="text-blue-500 hover:underline"
                  >
                    {vehicle.vin}
                  </Link>
                </td>
                <td className="p-3">{vehicle.buildSeries}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleList;
