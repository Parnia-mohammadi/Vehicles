import { Outlet, useLocation } from "react-router-dom";
import VehicleMap from "../Map/VehicleMap";
import Pagination from "../../ui/Pagination";
import { useCurrentVehicle } from "../../context/vehiclesProvider";
import { useMemo, useState } from "react";

import { useVehicles } from "../../hooks/useVehicles";
import AppHeader from "./AppHeader";
import InfoMessage from "./InfoMessage";
import Footer from "./Footer";
import Modal from "../../ui/Modal";
import SearchForm from "../SearchForm";

function AppLayout() {
  const location = useLocation();
  const isVehicleListPage = location.pathname === "/vehicles";
  const { page, setPage } = useCurrentVehicle();
  const { data: vehicles, isLoading } = useVehicles();
  const totalVehicles = useMemo(
    () => (!isLoading && vehicles ? vehicles.length : 0),
    [vehicles, isLoading]
  );
  const vehiclesPerPage = 50;
  const [isOpen, setIsOpen] = useState(false);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="app-container">
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <SearchForm />
      </Modal>
      <AppHeader isVehicleListPage={isVehicleListPage} setIsOpen={setIsOpen} />
      <main className="main-content">
        <InfoMessage isVehicleListPage={isVehicleListPage} />
        <div className="layout-wrapper">
          <Outlet />
          <VehicleMap />
        </div>
        {isVehicleListPage && !isLoading && (
          <Pagination
            currentPage={page}
            handlePageChange={handlePageChange}
            totalVehicles={totalVehicles}
            vehiclesPerPage={vehiclesPerPage}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
