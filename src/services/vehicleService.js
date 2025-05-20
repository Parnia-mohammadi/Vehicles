import toast from "react-hot-toast";
import axios from "axios";
import { loadFromCache, saveToCache } from "../services/cacheService";

export const fetchVehicles = async (page, limit = 50) => {
  const cacheKey = `vehicles-page-${page}`;
  const cachedVehicles = loadFromCache(cacheKey);
  if (cachedVehicles) return cachedVehicles;

  try {
    const { data } = await axios.get("http://localhost:5000/vehicles");
    const totalVehicles = data.length;
    saveToCache("totalVehiclesLength", totalVehicles);
    const start = (page - 1) * limit;
    const end = Math.min(start + limit, totalVehicles);

    if (start >= totalVehicles) {
      return [];
    }

    const reducedVehicles = data.slice(start, end);
    saveToCache(cacheKey, reducedVehicles);
    return reducedVehicles;
  } catch (err) {
    toast.error(`Problem in fetching vehicles: ${err.message}`);
    return [];
  }
};
