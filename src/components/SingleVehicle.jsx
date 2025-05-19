import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useVehicles } from "../context/vehiclesProvider";

const SingleVehicle = () => {
  const { vin } = useParams();
  const { currentVehicle, isLoadingCurrentVehicle, getVehicle } = useVehicles();

  useEffect(() => {
    getVehicle(vin);
  }, [vin]);

  if (isLoadingCurrentVehicle && !currentVehicle) return <p>loading ...</p>;

  return (
    <div>
      <h1>Properties :</h1>
      <table
        className="border-1 border-gray-700 w-full"
        style={{ margin: "auto", textAlign: "left" }}
      >
        <tbody>
          <tr>
            <th>نام</th>
            <td>{currentVehicle?.vin}</td>
          </tr>
          <tr>
            <th>شناسه</th>
            <td>{currentVehicle?.plate}</td>
          </tr>
          <tr>
            <th>مکان</th>
            <td>{currentVehicle?.address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleVehicle;
