import Table from "../../ui/Table";
import { useVehicles } from "../../hooks/useVehicles";
import { useCurrentVehicle } from "../../context/VehiclesProvider";
import Loader from "../../ui/Loader";
import NotFound from "../../ui/NotFound";

const headers = ["Properties", "Value"];

const SingleVehicle = () => {
  const { isLoading } = useVehicles();
  const { currentVehicle: vehicle } = useCurrentVehicle();
  const filteredData = vehicle
    ? Object.entries(vehicle).filter(
        ([key]) => key !== "geoCoordinate" && key !== "id"
      )
    : [];

  if (isLoading) return <Loader />;
  if (!vehicle) {
    return <NotFound />;
  }

  return (
    <Table
      headers={headers}
      data={filteredData}
      rowKey={(item) => item[0]}
      renderRow={([key, value]) => (
        <>
          <th className="mytable-cell capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </th>
          <td className="mytable-cell w-auto overflow-visible whitespace-normal wrap-anywhere">
            {typeof value === "boolean" ? (
              value ? (
                "Yes"
              ) : (
                "No"
              )
            ) : key === "fuelLevel" ? (
              <div className="flex items-center gap-4">
                <p>{value}%</p>
                <meter
                  id="fuel"
                  min="0"
                  max="100"
                  low="33"
                  high="66"
                  optimum="80"
                  value={value}
                  className="z-10"
                >
                  {value}
                </meter>
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
