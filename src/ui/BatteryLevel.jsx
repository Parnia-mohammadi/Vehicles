import { BatteryFull, BatteryLow, BatteryMedium } from "lucide-react";

function BatteryLevel({ fuelLevel, className = "" }) {
  switch (true) {
    case fuelLevel < 33:
      return <BatteryLow className={`text-red-500 ${className}`} size={20} />;
    case fuelLevel < 66:
      return (
        <BatteryMedium className={`text-yellow-500 ${className}`} size={20} />
      );
    case fuelLevel <= 100:
      return (
        <BatteryFull className={`text-green-500 ${className}`} size={20} />
      );
  }
}

export default BatteryLevel;
