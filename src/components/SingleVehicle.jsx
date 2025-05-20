import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVehicles } from "../context/vehiclesProvider";
import toast from "react-hot-toast";
import BackButton from "../ui/BackButton";
import Loader from "./Loader";

const SingleVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { vin } = useParams();
  const {
    vehicles,
    setCurrentVehicle,
    currentVehicle: vehicle,
  } = useVehicles();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/vehicles");
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      const vehicle = vehicles.find((v) => v.vin === vin);
      setCurrentVehicle(vehicle);
    } catch (err) {
      toast.error(`single vehicle's fetch has problem: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [vin]);

  if (isLoading) return <Loader />;
  if (!vehicle) {
    return (
      <div className="flex flex-col items-center">
        <p>⚠ Vehicle not found</p>
        <BackButton onClick={handleBack} className="py-2 my-2 px-4" />
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center h-[60vh] w-full p-0">
      <div className="flex-grow items-center overflow-y-auto rounded-lg h-full shadow-lg mx-12">
        <table className="w-full border-collapse bg-white">
          <thead className="sticky top-0 bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Properties</th>
              <th className="p-3 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(vehicle)
              .filter(([key]) => key !== "geoCoordinate" && key !== "id")
              .map(([key, value]) => (
                <tr
                  key={key}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <th className="p-3 text-left capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </th>
                  <td className="p-3 text-gray-700">
                    {typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : key === "fuelLevel"
                      ? `${value}%`
                      : value}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleVehicle;
