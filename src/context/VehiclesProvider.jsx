import { createContext, useContext, useState } from "react";

const VehiclesContext = createContext();

export default function VehiclesProvider({ children }) {
  const [page, setPage] = useState(1);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  return (
    <VehiclesContext.Provider
      value={{
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

export function useCurrentVehicle() {
  return useContext(VehiclesContext);
}
