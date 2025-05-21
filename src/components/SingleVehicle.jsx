import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVehicles } from "../context/vehiclesProvider";
import toast from "react-hot-toast";
import BackButton from "../ui/BackButton";
import Loader from "./Loader";
import Table from "../ui/Table";

const headers = ["Properties", "Value"];

const SingleVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { vin } = useParams();
  const {
    vehicles,
    setCurrentVehicle,
    currentVehicle: vehicle,
  } = useVehicles();
  const navigate = useNavigate();
  const filteredData = vehicle
    ? Object.entries(vehicle).filter(
        ([key]) => key !== "geoCoordinate" && key !== "id"
      )
    : [];

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
      <div className="self-container rounded-lg items-center shadow-2xl dark:text-white">
        <p className="text-xl">⚠ Vehicle not found</p>
        <BackButton onClick={handleBack} />
      </div>
    );
  }

  return (
    <Table
      headers={headers}
      data={filteredData}
      rowKey={(item) => item[0]}
      rowClass={() => ""}
      renderRow={([key, value]) => (
        <>
          <th className="table-cell capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </th>
          <td className="table-cell">
            {typeof value === "boolean"
              ? value
                ? "Yes"
                : "No"
              : key === "fuelLevel"
              ? `${value}%`
              : value}
          </td>
        </>
      )}
    />
  );
};

export default SingleVehicle;
