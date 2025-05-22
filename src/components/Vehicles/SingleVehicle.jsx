import { useNavigate } from "react-router-dom";
import BackButton from "../../ui/BackButton";

import Table from "../../ui/Table";
import { useVehicles } from "../../hooks/useVehicles";
import { useCurrentVehicle } from "../../context/vehiclesProvider";
import Loader from "../../ui/Loader";
import BatteryLevel from "../../ui/BatteryLevel";

const headers = ["Properties", "Value"];

const SingleVehicle = () => {
  const { isLoading } = useVehicles();
  const { currentVehicle: vehicle } = useCurrentVehicle();
  const navigate = useNavigate();
  const filteredData = vehicle
    ? Object.entries(vehicle).filter(
        ([key]) => key !== "geoCoordinate" && key !== "id"
      )
    : [];

  const handleBack = () => {
    navigate("/vehicles");
  };

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
          <th className="mytable-cell capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </th>
          <td className="mytable-cell">
            {typeof value === "boolean" ? (
              value ? (
                "Yes"
              ) : (
                "No"
              )
            ) : key === "fuelLevel" ? (
              <div className="flex items-center gap-4">
                <p>{value}%</p>
                <BatteryLevel
                  fuelLevel={value}
                  key={key}
                  className="-rotate-90"
                />
              </div>
            ) : (
              value
            )}
          </td>
        </>
      )}
    />
  );
};

export default SingleVehicle;
