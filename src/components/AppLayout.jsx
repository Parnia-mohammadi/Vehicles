import { Link, Outlet, useLocation } from "react-router-dom";
import VehicleMap from "./VehicleMap";
import { House, Undo2 } from "lucide-react";
import Pagination from "../ui/Pagination";
import { useVehicles } from "../context/vehiclesProvider";
import { loadFromCache } from "../services/cacheService";
import { useMemo } from "react";
import ThemeToggleButton from "../ui/ThemeToggleButton";

function AppHeader({ isVehicleListPage }) {
  return (
    <header className="w-full py-4 px-6 bg-black bg-opacity-70 shadow-lg text-white dark:bg-gray-900">
      <div className="w-full mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold tracking-wide">
          🚗 Vehicle Tracking System :
          <span className="text-xl font-semibold px-5">
            {isVehicleListPage
              ? "Vehicles List"
              : "Single Vehicle Data Overview"}
          </span>
        </h1>
        <nav className="space-x-6 flex items-center justify-center">
          <ThemeToggleButton />
          <Link to="/" className="hover:underline flex gap-x-1">
            <House size={20} />
            Home
          </Link>
          {!isVehicleListPage && (
            <Link to="/vehicles" className="hover:underline flex gap-x-1">
              Back to Vehicles List
              <Undo2 size={20} />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function InfoMessage({ isVehicleListPage }) {
  return (
    <p className="text-xl text-center my-6 font-bold text-gray-700 dark:text-gray-200">
      {isVehicleListPage
        ? "Choose your vehicle from the map or the list, to show its properties.You can scroll on the list"
        : "Now you can see the properties of your vehicle, Scroll to see data in the table."}
    </p>
  );
}

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
    <div className="h-screen flex flex-col justify-between dark:bg-gray-900 transition-colors duration-300">
      <AppHeader isVehicleListPage={isVehicleListPage} />

      <main className="flex-1 bg-gradient-to-br from-gray-300 via-gray-500 to-gray-900 dark:from-gray-700 dark:via-gray-900 dark:to-black">
        <InfoMessage isVehicleListPage={isVehicleListPage} />

        <div className="flex items-center justify-center px-4">
          <div className="w-[50%] max-w-[700px]">
            <Outlet />
          </div>
          <VehicleMap />
        </div>

        {isVehicleListPage && (
          <Pagination
            currentPage={page}
            handlePageChange={handlePageChange}
            totalVehicles={totalVehicles}
            vehiclesPerPage={vehiclesPerPage}
          />
        )}
      </main>

      <footer className="w-full py-4 text-white bg-black bg-opacity-70 text-center text-sm dark:bg-gray-800">
        Developed by <span className="font-semibold">PARNIA MOHAMMADI</span>
      </footer>
    </div>
  );
}

export default AppLayout;
