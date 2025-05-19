import { useEffect } from "react";
import { FixedSizeList } from "react-window";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useVehicles } from "../context/vehiclesProvider";

const VehicleList = () => {
  const { ref, inView } = useInView();
  const { vehicles, getVehicle, setPage, isLoading, totalVehicles } =
    useVehicles();

  useEffect(() => {
    if (inView && vehicles.length < totalVehicles) setPage((prev) => prev + 1);
  }, [inView, vehicles.length, totalVehicles]);

  if (isLoading) return <p>Loading ...</p>;
  return (
    <div>
      <h1>Vehicle List :</h1>
      <FixedSizeList
        height={500}
        width={400}
        itemSize={50}
        itemCount={vehicles.length}
      >
        {({ index, style }) => (
          <div style={style}>
            {
              <Link
                key={vehicles[index]}
                to={`${vehicles[index]?.vin}`}
                onClick={() => getVehicle(vehicles[index].vin)}
              >
                {vehicles[index]?.vin}
              </Link>
            }
          </div>
        )}
      </FixedSizeList>
      <div ref={ref} style={{ height: "20px" }} />
    </div>
  );
};
export default VehicleList;
