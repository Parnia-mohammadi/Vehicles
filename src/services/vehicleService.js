import toast from "react-hot-toast";
import axios from "axios";

export const fetchAllVehicles = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/vehicles");
    return data;
  } catch (err) {
    toast.error(`Problem in fetching vehicles: ${err.message}`);
    return [];
  }
};
