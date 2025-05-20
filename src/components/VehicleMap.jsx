import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useVehicles } from "../context/vehiclesProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

function VehicleMap() {
  const { vehicles, currentVehicle, setCurrentVehicle } = useVehicles();
  const location = useLocation();
  const navigate = useNavigate();

  const { center, zoom } = useMemo(() => {
    if (location.pathname === "/vehicles") {
      return {
        center: [53.5511, 9.9937],
        zoom: 12,
      };
    } else if (currentVehicle) {
      return {
        center: [
          currentVehicle.geoCoordinate.latitude,
          currentVehicle.geoCoordinate.longitude,
        ],
        zoom: 16,
      };
    }
    return {
      center: [53.5511, 9.9937],
      zoom: 12,
    };
  }, [location.pathname, currentVehicle]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-[45%] h-[60vh] rounded-lg md:mx-12"
    >
      <ChangeMapCenter position={center} zoom={zoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {vehicles?.map((vehicle) => (
        <VehicleMarker
          key={vehicle.plate}
          vehicle={vehicle}
          onClick={() => {
            setCurrentVehicle(vehicle);
            navigate(`/vehicles/${vehicle.vin}`);
          }}
        />
      ))}
    </MapContainer>
  );
}

function ChangeMapCenter({ position, zoom }) {
  const map = useMap();
  map.setView(position, zoom);
  return null;
}

function VehicleMarker({ vehicle, onClick }) {
  return (
    <Marker
      position={[
        vehicle.geoCoordinate.latitude,
        vehicle.geoCoordinate.longitude,
      ]}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <p>
          <span className="font-bold">Plate:</span> {vehicle.plate}
        </p>
        <p>
          <span className="font-bold">Address:</span> {vehicle.address}
        </p>
      </Popup>
    </Marker>
  );
}

export default VehicleMap;
