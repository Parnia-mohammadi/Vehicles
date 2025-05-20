import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchVehicles } from "../services/vehicleService";

const VehiclesContext = createContext();

export default function VehiclesProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentVehicle, setCurrentVehicle] = useState(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const newVehicles = await fetchVehicles(page, 50);
        if (newVehicles.length > 0) {
          setVehicles(newVehicles);
        } else {
          toast.info("No more vehicles to load.");
        }
      } catch (err) {
        toast.error(`Problem in fetching vehicles: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [page]);

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        isLoading,
        setVehicles,
        currentVehicle,
        setCurrentVehicle,
        page,
        setPage,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}

export function useVehicles() {
  return useContext(VehiclesContext);
}
