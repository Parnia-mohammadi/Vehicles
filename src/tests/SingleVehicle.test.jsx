import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useVehicles } from "../hooks/useVehicles";
import VehiclesProvider, {
  useCurrentVehicle,
} from "../context/VehiclesProvider";
import SingleVehicle from "../components/Vehicles/SingleVehicle";
import { BrowserRouter } from "react-router-dom";

// Mock useVehicles
vi.mock("../hooks/useVehicles", () => ({
  useVehicles: vi.fn(() => ({ isLoading: false })),
}));

// Mock useCurrentVehicle
vi.mock("../context/VehiclesProvider", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useCurrentVehicle: vi.fn(() => ({ currentVehicle: null })),
  };
});

describe("SingleVehicle Component", () => {
  it("should display the Loader while loading", () => {
    useVehicles.mockReturnValue({ isLoading: true });
    useCurrentVehicle.mockReturnValue({ currentVehicle: null });

    render(<SingleVehicle />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should display NotFound when no vehicle is available", () => {
    useVehicles.mockReturnValue({ isLoading: false });
    useCurrentVehicle.mockReturnValue({ currentVehicle: null });

    render(
      <BrowserRouter>
        <SingleVehicle />
      </BrowserRouter>
    );

    expect(screen.getByTestId("not-found")).toBeInTheDocument();
  });

  it("should display vehicle details when vehicle is available", () => {
    const mockVehicle = {
      vin: "WDD1760121J522347",
      plate: "B-GO5649",
      geoCoordinate: { latitude: 53.63382777, longitude: 10.0071494 },
      fuelLevel: 100,
      address: "HH Flughafen P2 Bereich B",
      locationAlias: "hamburg",
      locationId: 3,
      parkingId: "20160926-1123-2929-7376-0000001e9ac4",
      buildSeries: "W176",
      fuelType: "DIESEL",
      primaryColor: "761U",
      charging: false,
      freeForRental: true,
      hardwareVersion: "HW3",
      globalVersion: 471838397,
    };

    useVehicles.mockReturnValue({ isLoading: false });
    useCurrentVehicle.mockReturnValue({ currentVehicle: mockVehicle });

    render(
      <BrowserRouter>
        <VehiclesProvider>
          <SingleVehicle />
        </VehiclesProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("B-GO5649")).toBeInTheDocument();
    expect(screen.getByText("HH Flughafen P2 Bereich B")).toBeInTheDocument();
    expect(screen.getByText("DIESEL")).toBeInTheDocument();
    expect(screen.getByText("471838397")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument(); // چون `charging` مقدار `false` دارد
  });
});
