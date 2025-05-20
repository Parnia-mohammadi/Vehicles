import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useVehicles } from "../context/vehiclesProvider";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VehicleMap() {
  const { vehicles, currentVehicle, setCurrentVehicle } = useVehicles();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (location.pathname === "/vehicles") {
      map.setView([53.5511, 9.9937], 12);
    } else if (currentVehicle) {
      map.setView(
        [
          currentVehicle?.geoCoordinate.latitude,
          currentVehicle?.geoCoordinate.longitude,
        ],
        16
      );
    }
  }, [currentVehicle]);

  return (
    <MapContainer
      center={[53.5511, 9.9937]}
      zoom={12}
      className="w-[45%] h-[60vh] rounded-lg md:mx-12"
      ref={mapRef}
    >
      <ChangeMapCenter
        position={
          location.pathname === "/vehicles"
            ? [53.5511, 9.9937]
            : currentVehicle
            ? [
                currentVehicle.geoCoordinate.latitude,
                currentVehicle.geoCoordinate.longitude,
              ]
            : [53.5511, 9.9937]
        }
        zoom={location.pathname === "/vehicles" ? 12 : 16}
      />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {vehicles &&
        vehicles.map((vehicle) => (
          <Marker
            key={vehicle.plate}
            position={[
              vehicle.geoCoordinate.latitude,
              vehicle.geoCoordinate.longitude,
            ]}
            eventHandlers={{
              click: () => {
                setCurrentVehicle(vehicle);
                navigate(`/vehicles/${vehicle.vin}`);
              },
            }}
          >
            <Popup>
              <p>
                <span className="font-bold">Plate :</span>
                {vehicle.plate}
              </p>
              <p>
                <span className="font-bold">Address :</span>
                {vehicle.address}
              </p>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
export default VehicleMap;

function ChangeMapCenter({ position, zoom }) {
  const map = useMap();
  map.setView(position, zoom);
  return null;
}
