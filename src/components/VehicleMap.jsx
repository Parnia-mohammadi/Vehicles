// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const VehicleMap = ({ vehicles, selectedVehicle, onSelectVehicle }) => {
//   return (
//     <MapContainer
//       center={[53.5511, 9.9937]}
//       zoom={12}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {vehicles.map((vehicle) => (
//         <Marker
//           key={vehicle.plate}
//           position={[
//             vehicle.geoCoordinate.latitude,
//             vehicle.geoCoordinate.longitude,
//           ]}
//           eventHandlers={{
//             click: () => onSelectVehicle(vehicle),
//           }}
//         >
//           <Popup>{vehicle.plate}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };
// export default VehicleMap;
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";

const VehicleMap = ({ vehicles }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const markerClusterGroup = L.markerClusterGroup();

    vehicles.forEach((vehicle) => {
      const marker = L.marker([
        vehicle.geoCoordinate.latitude,
        vehicle.geoCoordinate.longitude,
      ]).bindPopup(`
        <strong>${vehicle.plate}</strong><br/>
        موقعیت: (${vehicle.geoCoordinate.latitude}, ${vehicle.geoCoordinate.longitude})
      `);

      marker.on("click", () =>
        map.setView(
          [vehicle.geoCoordinate.latitude, vehicle.geoCoordinate.longitude],
          14
        )
      );
      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [vehicles]);

  return (
    <MapContainer
      center={[53.5511, 9.9937]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default VehicleMap;
