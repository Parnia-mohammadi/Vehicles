import VehicleList from "./components/Vehicles/VehicleList";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout/AppLayout";
import SingleVehicle from "./components/Vehicles/SingleVehicle";
import { Toaster } from "react-hot-toast";
import VehiclesProvider from "./context/VehiclesProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
