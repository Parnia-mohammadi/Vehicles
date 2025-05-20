import { useState } from "react";
import { useVehicles } from "../context/vehiclesProvider";
import { Link } from "react-router-dom";
import { loadFromCache } from "../services/cacheService";

function VehicleList() {
  const { vehicles, setPage, setCurrentVehicle, isLoading, currentVehicle } =
    useVehicles();
  const totalVehicles = loadFromCache("totalVehiclesLength");
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 50;

  const handlePageChange = (page) => {
    setPage(page);
    setCurrentPage(page);
  };

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen flex flex-col">
      <h1 className="text-xl font-bold text-center mb-4">Vehicle List</h1>
      <div className="flex-grow overflow-y-auto border border-gray-300 rounded-lg shadow-lg">
        <table className="w-full border-collapse bg-white">
          <thead className="sticky top-0 bg-blue-200 text-gray-700">
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
              >
                <td className="p-3">
                  {index + 1 + (currentPage - 1) * vehiclesPerPage}
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

      {/* کنترل صفحه‌بندی */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(totalVehicles / vehiclesPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded-md shadow-2xl ${
                currentPage === i + 1
                  ? "bg-blue-300 text-gray-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default VehicleList;
