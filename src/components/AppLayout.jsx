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
    <header className="app-header">
      <div className="app-header-wraper">
        <h1 className="page-title">
          🚗 Vehicle Tracking System :
          <span className="sub-title">
            {isVehicleListPage
              ? "Vehicles List"
              : "Single Vehicle Data Overview"}
          </span>
        </h1>
        <nav className="nav-links">
          <ThemeToggleButton />
          <Link to="/" className="nav-link">
            <House size={20} />
            Home
          </Link>
          {!isVehicleListPage && (
            <Link to="/vehicles" className="nav-link">
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
    <p className="page-message">
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
    <div className="app-container">
      <AppHeader isVehicleListPage={isVehicleListPage} />

      <main className="main-content">
        <InfoMessage isVehicleListPage={isVehicleListPage} />

        <div className="layout-wrapper">
          <div className="outlet-wrapper">
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

      <footer className="footer">
        Developed by <span className="font-semibold">PARNIA MOHAMMADI</span>
      </footer>
    </div>
  );
}

export default AppLayout;
