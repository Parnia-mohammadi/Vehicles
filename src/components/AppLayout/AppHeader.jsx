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
    <>
      <header className="app-header">
        <div className="app-header-wraper">
          <p className="page-title">🚗 Vehicle Tracking System :</p>
          <nav className="nav-links">
            <Nav
              searchParams={searchParams}
              isVehicleListPage={isVehicleListPage}
              setIsOpen={setIsOpen}
            />
            <div className="nav-hamburger" onClick={handleNavbar}>
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
            ? "bg-gray-900 text-white w-full h-fit flex-center md:hidden"
            : "hidden"
        }`}
      >
        <ul className="text-base text-gray-300 flex flex-col gap-y-4 p-4 md:hidden *:gap-4 *:flex *:items-center *:justify-center *:w-full  *:hover:text-blue-400">
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
    </>
  );
}

function Nav({ isVehicleListPage, searchParams, setIsOpen }) {
  return (
    <div className="hidden md:flex items-center justify-between gap-x-2">
      <div className="gap-1 flex-center" onClick={() => setIsOpen(true)}>
        <ScanSearch size={25} />
        <p>Search</p>
      </div>
      <ThemeToggleButton />
      <Link to="/" className="flex gap-x-1">
        <House size={20} />
        Home
      </Link>
      {(!isVehicleListPage || searchParams.size !== 0) && (
        <Link to="/vehicles" className="flex gap-x-1">
          <p className="tracking-tight text-nowrap">Back to Vehicles List</p>
          <Undo2 size={20} />
        </Link>
      )}
    </div>
  );
}
