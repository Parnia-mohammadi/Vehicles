import { useMemo } from "react";
import { useCurrentVehicle } from "../context/VehiclesProvider";
import { useFilteredVehicles } from "../hooks/useFilteredVehicles";
import { useVehicles } from "../hooks/useVehicles";

function Pagination({}) {
  const { page: currentPage, setPage } = useCurrentVehicle();
  const vehicles = useFilteredVehicles();
  const { isLoading } = useVehicles();
  const totalVehicles = useMemo(
    () => (!isLoading && vehicles ? vehicles.length : 0),
    [vehicles, isLoading]
  );
  const vehiclesPerPage = 50;

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div className="flex justify-center items-center my-6 space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300"
        >
          &lt;
        </button>
      )}

      <span className="px-4 py-2 bg-blue-200 text-gray-900 rounded-md shadow-md">
        Page {currentPage}
      </span>

      {currentPage < Math.ceil(totalVehicles / vehiclesPerPage) && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300"
        >
          &gt;
        </button>
      )}
    </div>
  );
}

export default Pagination;
