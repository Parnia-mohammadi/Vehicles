import VehicleList from "./components/VehicleList";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import SingleVehicle from "./components/SingleVehicle";
import { Toaster } from "react-hot-toast";
import VehiclesProvider from "./context/vehiclesProvider";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <VehiclesProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<AppLayout />}>
            <Route index element={<VehicleList />} />
            <Route path=":vin" element={<SingleVehicle />} />
          </Route>
        </Routes>
      </VehiclesProvider>
    </ThemeProvider>
  );
}

export default App;
