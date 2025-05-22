import { House, Undo2 } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggleButton from "../../ui/ThemeToggleButton";

export default function AppHeader({ isVehicleListPage }) {
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
