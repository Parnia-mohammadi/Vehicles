import { Link, Outlet, useLocation } from "react-router-dom";
import VehicleMap from "./VehicleMap";
import { House, Undo2 } from "lucide-react";
import Pagination from "../ui/Pagination";
import { useVehicles } from "../context/vehiclesProvider";
import { loadFromCache } from "../services/cacheService";

function AppLayout() {
  const location = useLocation();
  const { page, setPage } = useVehicles();
  const totalVehicles = loadFromCache("totalVehiclesLength");
  const vehiclesPerPage = 50;
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="h-screen flex flex-col justify-around justify-items-stretch">
      <header className="w-full py-4 px-6 bg-black bg-opacity-70 shadow-lg text-white">
        <div className="w-full mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold tracking-wide">
            🚗 Vehicle Tracking System :
            <span className="text-xl font-semibold px-5">
              {location.pathname === "/vehicles"
                ? "Vehicles List"
                : "Single Vehicle Data Overview"}
            </span>
          </h1>
          <nav className="space-x-6 flex">
            <Link to="/" className="hover:underline flex gap-x-1">
              <House size={20} />
              Home
            </Link>
            {location.pathname !== "/vehicles" && (
              <Link to="/vehicles" className="hover:underline flex gap-x-1">
                Back to Vehicles List
                <Undo2 size={20} />
              </Link>
            )}
          </nav>
        </div>
      </header>

      <div className="flex flex-col h-full bg-gradient-to-br from-gray-300 via-gray-500 to-gray-900">
        <p className="text-xl text-center my-6 font-bold text-gray-700">
          {location.pathname === "/vehicles"
            ? "Choose your vehicle from the map or the list, to show it's properties."
            : "Now you can see the properthies of your vehicle"}
        </p>
        <div className="flex items-center justify-center ">
          <div className="mx-auto w-[50%]">
            <Outlet />
          </div>
          <VehicleMap />
        </div>
        {location.pathname === "/vehicles" && (
          <Pagination
            currentPage={page}
            handlePageChange={handlePageChange}
            totalVehicles={totalVehicles}
            vehiclesPerPage={vehiclesPerPage}
          />
        )}
      </div>

      <footer className="w-full py-4 text-white bg-black bg-opacity-70 text-center text-sm">
        Developed by <span className="font-semibold">PARNIA MOHAMMADI</span>
      </footer>
    </div>
  );
}

export default AppLayout;
