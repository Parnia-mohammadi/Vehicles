import { useState } from "react";
import VehicleList from "./components/VehicleList";
import VehicleMap from "./components/VehicleMap";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div>
      <VehicleList vehicles={vehicles} setVehicles={setVehicles} />
      <VehicleMap
        vehicles={vehicles}
        selectedVehicle={selectedVehicle}
        onSelectVehicle={setSelectedVehicle}
      />
    </div>
  );
}

export default App;
