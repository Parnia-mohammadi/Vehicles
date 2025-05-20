import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVehicles } from "../context/vehiclesProvider";
import toast from "react-hot-toast";
import BackButton from "../ui/BackButton";

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
    try {
      setIsLoading(true);
      const vehicle = vehicles.find((v) => v.vin === vin);
      setCurrentVehicle(vehicle);
    } catch (err) {
      toast.error(`single vehicle's fetch has problem: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [vin]);

  if (isLoading) return <p>loading ...</p>;
  if (!vehicle) {
    return (
      <div className="flex flex-col items-center">
        <p>⚠ Vehicle not found</p>
        <BackButton onClick={handleBack} className="py-2 my-2 px-4" />
      </div>
    );
  }
  return (
    <div className="w-full p-4 shadow-lg overflow-hidden rounded-2xl ">
      <div className="flex justify-between ">
        <h2 className="text-xl font-bold text-center mb-4 ">
          Vehicle Information
        </h2>
        <BackButton onClick={handleBack} className="mb-2" />
      </div>

      <table className="w-full border-collapse bg-white rounded-xl">
        <tbody>
          <tr className="hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">VIN</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.vin}
            </td>
          </tr>
          <tr className="bg-gray-50 hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Plate</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.plate}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Fuel Level</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.fuelLevel}%
            </td>
          </tr>
          <tr className="bg-gray-50 hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Address</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.address}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Build Series</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.buildSeries}
            </td>
          </tr>
          <tr className="bg-gray-50 hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Fuel Type</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.fuelType}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Primary Color</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.primaryColor}
            </td>
          </tr>
          <tr className="bg-gray-50 hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Secondary Color</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.secondaryColor}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Charging</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.charging ? "Yes" : "No"}
            </td>
          </tr>
          <tr className="bg-gray-50 hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Free for Rental</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.freeForRental ? "Yes" : "No"}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Hardware Version</th>
            <td className="p-3 border-b border-gray-300 text-gray-700">
              {vehicle.hardwareVersion}
            </td>
          </tr>
          <tr className="bg-gray-50 hover:bg-gray-100">
            <th className="bg-primary p-3 text-left">Global Version</th>
            <td className="p-3  text-gray-700 rounded-b-xl">
              {vehicle.globalVersion}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleVehicle;
