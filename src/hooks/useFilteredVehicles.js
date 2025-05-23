import { useMemo } from "react";
import { useVehicles } from "./useVehicles";
import { useSearchParams } from "react-router-dom";

export function useFilteredVehicles() {
  const { data: vehicles, isLoading } = useVehicles();
  const [searchParams] = useSearchParams();

  const filters = {
    address: searchParams?.get("address")?.toLowerCase() || null,
    globalVersion: JSON.parse(searchParams?.get("globalVersion") || null),
    plate: searchParams?.get("plate")?.toLowerCase() || null,
    fuelType: searchParams?.get("fuelType")?.toLowerCase() || null,
    fuelLevel: JSON.parse(searchParams?.get("fuelLevel") || null),
    buildSeries: searchParams?.get("buildSeries")?.toLowerCase() || null,
  };

  return useMemo(() => {
    if (!vehicles || isLoading) return vehicles;

    const hasValidFilter = Object.values(filters).some(
      (value) => value !== null && value !== ""
    );

    if (!hasValidFilter) return vehicles;

    return vehicles.filter((vehicle) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === null || value === "" || value === 0) return true;
        return typeof vehicle[key] === "string"
          ? vehicle[key].toLowerCase().includes(value)
          : key === "fuelLevel"
          ? vehicle[key] >= value
          : vehicle[key] === value;
      });
    });
  }, [vehicles, searchParams, isLoading]);
}
