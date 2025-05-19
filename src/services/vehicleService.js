import toast from "react-hot-toast";
import axios from "axios";
import { loadFromCache, saveToCache } from "../services/cacheService";

export const fetchVehicles = async (page, limit = 50) => {
  const cacheKey = `vehicles-page-${page}`;
  const cachedVehicles = loadFromCache(cacheKey);
  if (cachedVehicles)
    return { vehicles: cachedVehicles, totalVehicles: cachedVehicles.length };

  try {
    const { data } = await axios.get("http://localhost:5000/vehicles");
    const totalVehicles = data.length;
    const start = (page - 1) * limit;
    const end = Math.min(start + limit, totalVehicles);

    if (start >= totalVehicles) {
      return []; // اگر `start` از تعداد کل بیشتر شد، داده‌ای برنگردان
    }

    const reducedVehicles = data.slice(start, end);
    saveToCache(cacheKey, reducedVehicles);
    return { vehicles: reducedVehicles, totalVehicles };
  } catch (err) {
    toast.error(`Problem in fetching vehicles: ${err.message}`);
    return [];
  }
};
