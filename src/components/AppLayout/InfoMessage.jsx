export default function InfoMessage({ isVehicleListPage }) {
  return (
    <p className="page-message">
      {isVehicleListPage
        ? "Choose your vehicle from the map or the list, to show its properties.You can scroll on the list"
        : "Now you can see the properties of your vehicle, Scroll to see data in the table."}
    </p>
  );
}
