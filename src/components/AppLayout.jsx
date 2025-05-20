import { Link, Outlet, useLocation } from "react-router-dom";
import VehicleMap from "./VehicleMap";
import { House, Undo2 } from "lucide-react";
import Pagination from "../ui/Pagination";
import { useVehicles } from "../context/vehiclesProvider";
import { loadFromCache } from "../services/cacheService";
import { useMemo } from "react";

// ----------------- Header -----------------
function AppHeader({ isVehicleListPage }) {
  return (
    <header className="w-full py-4 px-6 bg-black dark:bg-gray-900 bg-opacity-70 shadow-lg text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-y-4">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-center md:text-left">
          🚗 Vehicle Tracking System :
          <span className="block md:inline text-base md:text-xl font-semibold px-2 md:px-5">
            {isVehicleListPage
              ? "Vehicles List"
              : "Single Vehicle Data Overview"}
          </span>
        </h1>
        <nav className="space-x-4 flex flex-wrap justify-center md:justify-end">
          <Link to="/" className="hover:underline flex items-center gap-1">
            <House size={20} />
            <span>Home</span>
          </Link>
          {!isVehicleListPage && (
            <Link
              to="/vehicles"
              className="hover:underline flex items-center gap-1"
            >
              <span>Back to Vehicles</span>
              <Undo2 size={20} />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

// ----------------- Message -----------------
function InfoMessage({ isVehicleListPage }) {
  return (
    <p className="text-base sm:text-lg text-center my-4 md:my-6 font-semibold text-gray-700 dark:text-gray-200 px-4">
      {isVehicleListPage
        ? "Choose your vehicle from the map or the list to view its properties."
        : "Now you can see the details of your selected vehicle."}
    </p>
  );
}

// ----------------- Layout -----------------
function AppLayout() {
  const location = useLocation();
  const isVehicleListPage = location.pathname === "/vehicles";
  const { page, setPage } = useVehicles();
  const totalVehicles = useMemo(() => loadFromCache("totalVehiclesLength"), []);
  const vehiclesPerPage = 50;

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <AppHeader isVehicleListPage={isVehicleListPage} />

      <main className="flex-1 bg-gradient-to-br from-gray-300 via-gray-500 to-gray-900 dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <InfoMessage isVehicleListPage={isVehicleListPage} />

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 px-4">
          <div className="w-full lg:w-1/2 max-w-[700px]">
            <Outlet />
          </div>
          <div className="w-full lg:w-[45%]">
            <VehicleMap />
          </div>
        </div>

        {isVehicleListPage && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              handlePageChange={handlePageChange}
              totalVehicles={totalVehicles}
              vehiclesPerPage={vehiclesPerPage}
            />
          </div>
        )}
      </main>

      <footer className="w-full py-4 text-white bg-black dark:bg-gray-800 bg-opacity-70 text-center text-sm">
        Developed by <span className="font-semibold">PARNIA MOHAMMADI</span>
      </footer>
    </div>
  );
}

export default AppLayout;
