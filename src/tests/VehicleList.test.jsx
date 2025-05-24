import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useVehicles } from "../hooks/useVehicles";
import { useFilteredVehicles } from "../hooks/useFilteredVehicles";
import VehiclesProvider, {
  useCurrentVehicle,
} from "../context/VehiclesProvider";
import VehicleList from "../components/Vehicles/VehicleList";
import { BrowserRouter } from "react-router-dom";
import { createRef } from "react";

// Mock useVehicles
vi.mock("../hooks/useVehicles", () => ({
  useVehicles: vi.fn(),
}));

// Mock useFilteredVehicles
vi.mock("../hooks/useFilteredVehicles", () => ({
  useFilteredVehicles: vi.fn(),
}));

// Mock useCurrentVehicle
vi.mock("../context/VehiclesProvider", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useCurrentVehicle: vi.fn(() => ({
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: vi.fn(),
    })),
  };
});

// Mock vehicle data
const mockVehicles = [
  {
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
  },
  {
    vin: "WDC1569431J428747",
    plate: "B-GO1607",
    geoCoordinate: { latitude: 53.61753486, longitude: 10.02711549 },
    fuelLevel: 60,
    address: "Alsterdorfer Str. 511, 22337 Hamburg",
    locationAlias: "hamburg",
    locationId: 3,
    buildSeries: "X156",
    fuelType: "GASOLINE",
    primaryColor: "761U",
    secondaryColor: "761O",
    charging: false,
    freeForRental: true,
    hardwareVersion: "HW3",
    globalVersion: 471824827,
  },
];

describe("VehicleList Component", () => {
  it("should display the Loader while loading", () => {
    useVehicles.mockReturnValue({ isLoading: true, error: null });
    useFilteredVehicles.mockReturnValue([]);
    useCurrentVehicle.mockReturnValue({
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: vi.fn(),
    });

    render(<VehicleList />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should display an error message when the server fails", () => {
    useVehicles.mockReturnValue({ isLoading: false, error: "Server error!" });
    useFilteredVehicles.mockReturnValue([]);
    useCurrentVehicle.mockReturnValue({
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: vi.fn(),
    });

    render(<VehicleList />);
    expect(
      screen.getByText((content) => content.includes("Server error!"))
    ).toBeInTheDocument();
  });

  it("should display NotFound when no vehicle is available", () => {
    useVehicles.mockReturnValue({ isLoading: false, error: null });
    useFilteredVehicles.mockReturnValue([]);
    useCurrentVehicle.mockReturnValue({
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: vi.fn(),
    });

    render(
      <BrowserRouter>
        <VehiclesProvider>
          <VehicleList />
        </VehiclesProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("not-found")).toBeInTheDocument();
  });

  it("should display the vehicle list", () => {
    useVehicles.mockReturnValue({ isLoading: false, error: null });
    useFilteredVehicles.mockReturnValue(mockVehicles);
    useCurrentVehicle.mockReturnValue({
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: vi.fn(),
    });

    render(
      <BrowserRouter>
        <VehiclesProvider>
          <VehicleList />
        </VehiclesProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("B-GO5649")).toBeInTheDocument();
    expect(screen.getByText("B-GO1607")).toBeInTheDocument();
  });

  it("should update currentVehicle when clicking on a link,highlight and scroll it", async () => {
    const mockVehicles = [
      {
        vin: "WDD1760121J522347",
        plate: "B-GO5649",
        fuelLevel: 100,
        address: "HH Flughafen P2 Bereich B",
      },
    ];

    const mockSetCurrentVehicle = vi.fn();
    useCurrentVehicle.mockReturnValue({
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: mockSetCurrentVehicle,
    });

    useVehicles.mockReturnValue({ isLoading: false });
    useFilteredVehicles.mockReturnValue(mockVehicles);

    render(
      <BrowserRouter>
        <VehicleList />
      </BrowserRouter>
    );

    const vehicleLink = screen.getByText("HH Flughafen P2 Bereich B");

    fireEvent.click(vehicleLink);

    expect(mockSetCurrentVehicle).toHaveBeenCalledWith(mockVehicles[0]);
  });
});
