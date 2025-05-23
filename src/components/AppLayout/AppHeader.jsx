import { House, ScanSearch, Undo2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ThemeToggleButton from "../../ui/ThemeToggleButton";
import { useState } from "react";

export default function AppHeader({ isVehicleListPage, setIsOpen }) {
  const [searchParams] = useSearchParams();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleNavbar = () => {
    setIsNavOpen((is) => !is);
  };

  return (
    <div>
      <header className="app-header">
        <div className="app-header-wraper">
          <h1 className="page-title">🚗 Vehicle Tracking System :</h1>
          <nav className="nav-links">
            <Nav
              searchParams={searchParams}
              isVehicleListPage={isVehicleListPage}
            />
            <div
              className="flex flex-col gap-y-[7px] md:hidden"
              onClick={handleNavbar}
            >
              <span
                className={`hamburger-class ${
                  isNavOpen ? "-rotate-45 translate-y-[9px]" : ""
                }`}
              ></span>
              <span
                className={`hamburger-class ${isNavOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`hamburger-class ${
                  isNavOpen ? "rotate-45 -translate-y-[9px]" : ""
                }`}
              ></span>
            </div>
          </nav>
        </div>
      </header>
      <div
        className={`${
          isNavOpen
            ? "bg-gray-900 text-white w-full h-fit opacity-100 transition-all ease-in-out duration-1000 md:opacity-0 md:h-0"
            : "opacity-0 h-0"
        }`}
      >
        <ul className="text-base text-gray-300 flex flex-col gap-y-4 p-4 *:gap-4 *:flex *:items-center *:justify-center *:w-full  *:hover:text-blue-400">
          <li onClick={() => setIsOpen(true)}>
            <ScanSearch size={25} />
            <p>Search</p>
          </li>
          <li>
            <Link to="/" className="flex-center gap-4">
              <House size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <ThemeToggleButton className="gap-x-4" />
          </li>
          {(!isVehicleListPage || searchParams.size !== 0) && (
            <li>
              <Link to="/vehicles" className="flex-center gap-4">
                Back to Vehicles List
                <Undo2 size={20} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function Nav({ isVehicleListPage, searchParams }) {
  return (
    <div className="hidden md:flex md:items-center md:justify-between">
      <div className="gap-1 flex-center" onClick={() => setIsOpen(true)}>
        <ScanSearch size={25} />
        <p>Search</p>
      </div>
      <ThemeToggleButton />
      <Link to="/" className="nav-link">
        <House size={20} />
        Home
      </Link>
      {(!isVehicleListPage || searchParams.size !== 0) && (
        <Link to="/vehicles" className="nav-link">
          Back to Vehicles List
          <Undo2 size={20} />
        </Link>
      )}
    </div>
  );
}
