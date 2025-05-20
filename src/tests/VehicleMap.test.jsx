import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import VehicleMap from "../components/VehicleMap";
import { MemoryRouter } from "react-router-dom";
import { useVehicles } from "../context/vehiclesProvider";

vi.mock("react-leaflet", async () => {
  const actual = await vi.importActual("react-leaflet");
  return {
    ...actual,
    MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
    TileLayer: () => <div data-testid="tilelayer" />,
    Marker: ({ children, eventHandlers }) => (
      <div data-testid="marker" onClick={eventHandlers?.click}>
        {children}
      </div>
    ),
    Popup: ({ children }) => <div data-testid="popup">{children}</div>,
    useMap: () => ({
      setView: vi.fn(),
    }),
  };
});

vi.mock("../context/vehiclesProvider", () => {
  return {
    useVehicles: vi.fn(),
  };
});

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/vehicles" }),
  };
});

describe("VehicleMap", () => {
  beforeEach(() => {
    useVehicles.mockReturnValue({
      vehicles: [
        {
          vin: "VIN123",
          plate: "ABC123",
          address: "Test Address",
          geoCoordinate: { latitude: 53.55, longitude: 9.99 },
        },
      ],
      currentVehicle: null,
      setCurrentVehicle: vi.fn(),
    });
  });

  it("should render the map", () => {
    render(<VehicleMap />, { wrapper: MemoryRouter });
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("should render a marker for each vehicle", () => {
    render(<VehicleMap />, { wrapper: MemoryRouter });
    expect(screen.getAllByTestId("marker")).toHaveLength(1);
  });

  it("should show vehicle info in popup", () => {
    render(<VehicleMap />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Plate/i)).toBeInTheDocument();
    expect(screen.getByText("ABC123")).toBeInTheDocument();
    expect(screen.getAllByText(/Address/i)).toHaveLength(2);
  });

  it("should navigate and set current vehicle on marker click", () => {
    const mockSetCurrentVehicle = vi.fn();
    useVehicles.mockReturnValueOnce({
      vehicles: [
        {
          vin: "VIN123",
          plate: "ABC123",
          address: "Test Address",
          geoCoordinate: { latitude: 53.55, longitude: 9.99 },
        },
      ],
      currentVehicle: null,
      setCurrentVehicle: mockSetCurrentVehicle,
    });

    render(<VehicleMap />, { wrapper: MemoryRouter });

    const marker = screen.getByTestId("marker");
    fireEvent.click(marker);

    expect(mockSetCurrentVehicle).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/vehicles/VIN123");
  });
});
