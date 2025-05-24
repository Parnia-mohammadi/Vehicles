import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { useVehicles } from "../../hooks/useVehicles";
import { useCurrentVehicle } from "../../context/VehiclesProvider";
// import MarkerClusterGroup from "react-leaflet-markercluster";
import Loader from "../../ui/Loader";
import { useFilteredVehicles } from "../../hooks/useFilteredVehicles";
import usePageOfCurrentVehicle from "../../hooks/usePageOfCurrentVehicle";

function VehicleMap() {
  const { isLoading } = useVehicles();
  const { currentVehicle, setCurrentVehicle, setPage } = useCurrentVehicle();
  const location = useLocation();
  const navigate = useNavigate();
  const vehicles = useFilteredVehicles();
  const pageOfCurrentVehicle = usePageOfCurrentVehicle({
    currentVehicle,
    vehicles,
  });

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

  if (isLoading) return <Loader />;

  return (
    <MapContainer
      minZoom={10}
      center={center}
      zoom={zoom}
      className="map-container"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {vehicles?.map((vehicle) => (
        <VehicleMarker
          key={vehicle.plate}
          vehicle={vehicle}
          currentVehicle={currentVehicle}
          onClick={() => {
            setCurrentVehicle(vehicle);
            navigate(`/vehicles/${vehicle.vin}`);
          }}
        />
      ))}
      <ChangeMapCenter position={center} zoom={zoom} />
    </MapContainer>
    // <MapContainer center={center} zoom={zoom} className="map-container">
    //   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    //   <MarkerClusterGroup>
    //     {vehicles.map((vehicle) => (
    //       <VehicleMarker
    //         key={vehicle.plate}
    //         vehicle={vehicle}
    //         onClick={() => {
    //           setCurrentVehicle(vehicle);
    //           navigate(`/vehicles/${vehicle.vin}`);
    //         }}
    //       />
    //     ))}
    //     <ChangeMapCenter position={center} zoom={zoom} />
    //   </MarkerClusterGroup>
    // </MapContainer>
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

function VehicleMarker({ vehicle, currentVehicle, onClick }) {
  const markerRef = useRef(null);
  useEffect(() => {
    if (
      currentVehicle &&
      currentVehicle.vin === vehicle.vin &&
      markerRef.current
    ) {
      markerRef.current.openPopup();
    }
  }, [currentVehicle, vehicle]);
  return (
    <Marker
      ref={markerRef}
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
