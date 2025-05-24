import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useVehicles } from "../hooks/useVehicles";
import { useFilteredVehicles } from "../hooks/useFilteredVehicles";
import { useCurrentVehicle } from "../context/VehiclesProvider";
import VehicleMap from "../components/Map/VehicleMap";
import { BrowserRouter } from "react-router-dom";
import { useMap } from "react-leaflet";

// Mock useVehicles
vi.mock("../hooks/useVehicles", () => ({
  useVehicles: vi.fn(() => ({ isLoading: false })),
}));

// Mock useFilteredVehicles
vi.mock("../hooks/useFilteredVehicles", () => ({
  useFilteredVehicles: vi.fn(() => []),
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

// Mock useMap
const mockSetView = vi.fn();
vi.mock("react-leaflet", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useMap: vi.fn(() => ({
      setView: mockSetView,
    })),
  };
});

describe("VehicleMap Component", () => {
  it("should display the Loader while loading", () => {
    useVehicles.mockReturnValue({ isLoading: true });
    useFilteredVehicles.mockReturnValue([]);
    useCurrentVehicle.mockReturnValue({
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: vi.fn(),
    });

    render(
      <BrowserRouter>
        <VehicleMap />
      </BrowserRouter>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should display vehicle on the map by clicking on the marker", async () => {
    const mockVehicles = [
      {
        vin: "WDD1760121J522347",
        plate: "B-GO5649",
        geoCoordinate: { latitude: 53.63382777, longitude: 10.0071494 },
        fuelLevel: 100,
        address: "HH Flughafen P2 Bereich B",
      },
    ];

    useVehicles.mockReturnValue({ isLoading: false });
    useFilteredVehicles.mockReturnValue(mockVehicles);
    useCurrentVehicle.mockReturnValue({
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: vi.fn(),
    });

    render(
      <BrowserRouter>
        <VehicleMap />
      </BrowserRouter>
    );

    const marker = screen.getByRole("button", { name: "Marker" });

    fireEvent.click(marker);

    expect(await screen.findByText("B-GO5649")).toBeInTheDocument();
  });

  it("should change center and zoom after clicking on a marker", async () => {
    const mockVehicles = [
      {
        vin: "WDD1760121J522347",
        plate: "B-GO5649",
        geoCoordinate: { latitude: 53.63382777, longitude: 10.0071494 },
        fuelLevel: 100,
        address: "HH Flughafen P2 Bereich B",
      },
    ];

    const mockSetCurrentVehicle = vi.fn();
    useCurrentVehicle.mockReturnValueOnce({
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: mockSetCurrentVehicle,
    });

    const { rerender } = render(
      <BrowserRouter>
        <VehicleMap currentVehicle={null} />
      </BrowserRouter>
    );

    const marker = screen.getByRole("button", { name: "Marker" });

    fireEvent.click(marker);

    expect(mockSetCurrentVehicle).toHaveBeenCalledWith(mockVehicles[0]);

    useCurrentVehicle.mockReturnValueOnce({
      page: 1,
      currentVehicle: mockVehicles[0],
      setCurrentVehicle: mockSetCurrentVehicle,
    });

    rerender(
      <BrowserRouter>
        <VehicleMap currentVehicle={mockVehicles[0]} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockSetView).toHaveBeenCalledWith([53.63382777, 10.0071494], 16);
    });
  });
});
