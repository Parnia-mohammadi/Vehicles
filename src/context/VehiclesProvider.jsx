import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchVehicles } from "../services/vehicleService";

const VehiclesContext = createContext();

export default function VehiclesProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [page, setPage] = useState(1);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [isLoadingCurrentVehicle, setIsLoadingCurrentVehicle] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const { vehicles: newVehicles, totalVehicles } = await fetchVehicles(
          page,
          50
        );
        if (newVehicles.length > 0) {
          setVehicles((prev) => [...prev, ...newVehicles]);
          setTotalVehicles(totalVehicles);
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

  async function getVehicle(vin) {
    setIsLoadingCurrentVehicle(true);
    try {
      setCurrentVehicle(() => vehicles.find((v) => v.vin === vin));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentVehicle(false);
    }
  }

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        isLoading,
        setVehicles,
        currentVehicle,
        isLoadingCurrentVehicle,
        getVehicle,
        page,
        setPage,
        totalVehicles,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}

export function useVehicles() {
  return useContext(VehiclesContext);
}
