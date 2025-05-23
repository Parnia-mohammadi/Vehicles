import { useMemo } from "react";

export default function usePageOfCurrentVehicle({ currentVehicle, vehicles }) {
  const vehiclesOfPerPage = 50;
  return useMemo(() => {
    if (currentVehicle && vehicles) {
      return Math.ceil(
        vehicles.findIndex((v) => v.vin === currentVehicle.vin) /
          vehiclesOfPerPage
      );
    }
  }, [currentVehicle, vehicles]);
}
