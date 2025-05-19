import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useVehicles } from "../context/vehiclesProvider";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VehicleMap() {
  const { vehicles, currentVehicle, getVehicle } = useVehicles();
  const navigate = useNavigate();
  const { vin } = useParams();
  const [mapCenter, setMapCenter] = useState(
    currentVehicle?.geoCoordinate
      ? [
          currentVehicle.geoCoordinate.latitude,
          currentVehicle.geoCoordinate.longitude,
        ]
      : [53.5511, 9.9937]
  );

  useEffect(() => {
    if (!currentVehicle || !currentVehicle.geoCoordinate) return;
    setMapCenter([
      currentVehicle?.geoCoordinate.latitude,
      currentVehicle?.geoCoordinate.longitude,
    ]);
  }, [currentVehicle]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={16}
      style={{
        width: "50%",
        height: "100vh",
        borderRadius: "8px",
      }}
    >
      <ChangeCenter position={mapCenter} />
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
                getVehicle(vin);
                navigate(`/vehicles/${vehicle.vin}`);
              },
            }}
          >
            <Popup>
              <p>{`plate:${vehicle.plate}`}</p>
              {` address:${vehicle.address}`}
              <p></p>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
export default VehicleMap;

function ChangeCenter({ position }) {
  const Map = useMap();
  Map.setView(position);
  return null;
}

// import { useEffect, useRef, useState } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet.markercluster";
// import { useNavigate } from "react-router-dom";
// import { useVehicles } from "../context/vehiclesProvider";

// const VehicleMap = () => {
//   const { vehicles, currentVehicle } = useVehicles();
//   const [mapCenter, setMapCenter] = useState([53.5511, 9.9937]);
//   const mapRef = useRef(null);
//   const markerClusterRef = useRef(null); // ذخیره گروه مارکرها
//   const navigate = useNavigate();

//   // مقداردهی نقشه هنگام mount شدن
//   useEffect(() => {
//     if (!mapRef.current) return;
//     const map = mapRef.current;

//     // مقداردهی گروه مارکرها
//     if (!markerClusterRef.current) {
//       markerClusterRef.current = L.markerClusterGroup();
//       map.addLayer(markerClusterRef.current);
//     }

//     // افزودن مارکرها
//     markerClusterRef.current.clearLayers();
//     vehicles.forEach((vehicle) => {
//       const marker = L.marker([
//         vehicle.geoCoordinate.latitude,
//         vehicle.geoCoordinate.longitude,
//       ]).bindPopup(`
//         <strong>${vehicle.plate}</strong><br/> address: ${vehicle.address}
//       `);

//       marker.on("click", () => {
//         navigate(`/vehicles/${vehicle.vin}`);
//         map.setView(
//           [vehicle.geoCoordinate.latitude, vehicle.geoCoordinate.longitude],
//           16
//         );
//       });

//       markerClusterRef.current.addLayer(marker);
//     });
//   }, [vehicles]);

//   // تغییر مرکز نقشه هنگام انتخاب وسیله
//   useEffect(() => {
//     if (!currentVehicle || !mapRef.current) return;
//     mapRef.current.setView(
//       [
//         currentVehicle.geoCoordinate.latitude,
//         currentVehicle.geoCoordinate.longitude,
//       ],
//       16
//     );
//   }, [currentVehicle]);

//   return (
//     <MapContainer
//       center={[53.5511, 9.9937]}
//       zoom={12}
//       style={{ height: "500px", width: "50%", borderRadius: "8px" }}
//       ref={mapRef}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//     </MapContainer>
//   );
// };

// export default VehicleMap;
