import { useQuery } from "@tanstack/react-query";
import { fetchAllVehicles } from "../services/vehicleService";

export function useVehicles() {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: () => fetchAllVehicles(),
    staleTime: 1000 * 60 * 60 * 1,
    retry: 2,
  });
}
