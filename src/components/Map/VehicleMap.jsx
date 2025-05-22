import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useVehicles } from "../../hooks/useVehicles";
import { useCurrentVehicle } from "../../context/vehiclesProvider";

function VehicleMap() {
  const { data: vehicles } = useVehicles();
  const { currentVehicle, setCurrentVehicle, setPage } = useCurrentVehicle();
  const location = useLocation();
  const navigate = useNavigate();
  const vehiclesOfPerPage = 50;

  const pageOfCurrentVehicle = useMemo(() => {
    if (currentVehicle && vehicles) {
      return Math.ceil(
        vehicles.findIndex((v) => v.vin === currentVehicle.vin) /
          vehiclesOfPerPage
      );
    }
  }, [currentVehicle, vehicles]);

  const { center, zoom } = useMemo(() => {
    if (location.pathname === "/vehicles") {
      return {
        center: [53.5511, 9.9937],
        zoom: 11,
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
      zoom: 11,
    };
  }, [location.pathname, currentVehicle]);

  useEffect(() => {
    if (pageOfCurrentVehicle) setPage(pageOfCurrentVehicle);
  }, [currentVehicle, vehicles]);

  return (
    <MapContainer center={center} zoom={zoom} className="map-container">
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
      <ChangeMapCenter position={center} zoom={zoom} />
    </MapContainer>
  );
}

function ChangeMapCenter({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, zoom);
    }
  }, [position, zoom, map]);
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
