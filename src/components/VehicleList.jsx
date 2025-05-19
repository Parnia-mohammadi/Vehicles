import { useState, useEffect } from "react";
import { FixedSizeList } from "react-window";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { loadFromCache, saveToCache } from "../services/cacheService";

const fetchVehicles = async (page, limit = 50) => {
  const cacheKey = `vehicles-page-${page}`;
  const cachedVehicles = loadFromCache(cacheKey);
  if (cachedVehicles) return cachedVehicles;

  try {
    const response = await axios.get("http://localhost:5000/vehicles");
    const start = (page - 1) * limit;
    const end = start + limit;
    const reducedVehicles = response.data.slice(start, end);
    saveToCache(cacheKey, reducedVehicles);
    return reducedVehicles;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};

const VehicleList = ({ vehicles, setVehicles }) => {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    const loadData = async () => {
      const newVehicles = await fetchVehicles(page, 50);
      setVehicles((prev) => [...prev, ...newVehicles]);
    };
    loadData();
  }, [page]);

  useEffect(() => {
    if (inView) setPage((prev) => prev + 1);
  }, [inView]);

  return (
    <div>
      <FixedSizeList
        height={500}
        width={400}
        itemSize={50}
        itemCount={vehicles.length}
      >
        {({ index, style }) => <div style={style}>{vehicles[index]?.vin}</div>}
      </FixedSizeList>
      <div ref={ref} style={{ height: "20px" }} />
    </div>
  );
};
export default VehicleList;
