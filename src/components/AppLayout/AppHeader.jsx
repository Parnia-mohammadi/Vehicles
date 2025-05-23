import { House, ScanSearch, Undo2 } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggleButton from "../../ui/ThemeToggleButton";

export default function AppHeader({ isVehicleListPage,setIsOpen }) {
  return (
    <header className="app-header">
      <div className="app-header-wraper">
        <h1 className="page-title">🚗 Vehicle Tracking System :</h1>
        <nav className="nav-links">
          <div className="gap-1 flex-center" onClick={() => setIsOpen(true)}>
            <ScanSearch size={25} />
            <p>Search</p>
          </div>
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
