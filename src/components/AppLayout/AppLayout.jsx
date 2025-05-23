import { Outlet, useLocation } from "react-router-dom";
import VehicleMap from "../Map/VehicleMap";
import Pagination from "../../ui/Pagination";
import { useState } from "react";
import { useVehicles } from "../../hooks/useVehicles";
import AppHeader from "./AppHeader";
import InfoMessage from "./InfoMessage";
import Footer from "./Footer";
import Modal from "../../ui/Modal";
import SearchForm from "../form/SearchForm";

function AppLayout() {
  const location = useLocation();
  const isVehicleListPage = location.pathname === "/vehicles";
  const { isLoading } = useVehicles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-container">
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <SearchForm setIsOpen={setIsOpen} />
      </Modal>
      <AppHeader isVehicleListPage={isVehicleListPage} setIsOpen={setIsOpen} />
      <main className="main-content">
        <InfoMessage isVehicleListPage={isVehicleListPage} />
        <div className="layout-wrapper">
          <Outlet />
          <VehicleMap />
        </div>
        {isVehicleListPage && !isLoading && <Pagination />}
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
