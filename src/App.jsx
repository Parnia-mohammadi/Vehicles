import { useState } from "react";
import VehicleList from "./components/VehicleList";
import VehicleMap from "./components/VehicleMap";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import SingleVehicle from "./components/SingleVehicle";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/vehicles"
        element={
          <AppLayout
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
          />
        }
      >
        <Route
          index
          element={
            <VehicleList vehicles={vehicles} setVehicles={setVehicles} />
          }
        />
        <Route path=":vin" element={<SingleVehicle />} />
      </Route>
    </Routes>
  );
}

export default App;
