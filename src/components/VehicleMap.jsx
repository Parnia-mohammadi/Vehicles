import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useVehicles } from "../context/vehiclesProvider";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function VehicleMap() {
  const { vehicles, currentVehicle, setCurrentVehicle } = useVehicles();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!currentVehicle) {
      map.setView([53.5511, 9.9937], 12);
    } else {
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
      style={{
        width: "50%",
        height: "100vh",
        borderRadius: "8px",
      }}
      ref={mapRef}
    >
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
            <Popup ref={markerRef}>
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
