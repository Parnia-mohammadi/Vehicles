import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VehicleList from "../components/VehicleList";
import { useVehicles } from "../context/vehiclesProvider";
import { MemoryRouter } from "react-router-dom";

vi.mock("../context/vehiclesProvider", () => ({
  useVehicles: vi.fn(),
}));

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe("VehicleList component", () => {
  const mockSetCurrentVehicle = vi.fn();

  const defaultVehicles = [
    { vin: "VIN123", buildSeries: "Series A" },
    { vin: "VIN456", buildSeries: "Series B" },
  ];

  it("should show loading when isLoading is true", () => {
    useVehicles.mockReturnValue({
      vehicles: [],
      isLoading: true,
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: mockSetCurrentVehicle,
    });

    render(<VehicleList />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should render the vehicle list", () => {
    useVehicles.mockReturnValue({
      vehicles: defaultVehicles,
      isLoading: false,
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: mockSetCurrentVehicle,
    });

    render(<VehicleList />, { wrapper: MemoryRouter });

    expect(screen.getByText("VIN123")).toBeInTheDocument();
    expect(screen.getByText("VIN456")).toBeInTheDocument();
  });

  it("should highlight the current vehicle", () => {
    useVehicles.mockReturnValue({
      vehicles: defaultVehicles,
      isLoading: false,
      page: 1,
      currentVehicle: { vin: "VIN456" },
      setCurrentVehicle: mockSetCurrentVehicle,
    });

    const { container } = render(<VehicleList />, { wrapper: MemoryRouter });

    const highlightedRow = container.querySelector(".bg-indigo-100");
    expect(highlightedRow).toHaveTextContent("VIN456");
  });

  it("should call setCurrentVehicle on link click", () => {
    useVehicles.mockReturnValue({
      vehicles: defaultVehicles,
      isLoading: false,
      page: 1,
      currentVehicle: null,
      setCurrentVehicle: mockSetCurrentVehicle,
    });

    render(<VehicleList />, { wrapper: MemoryRouter });

    const link = screen.getByText("VIN123");
    fireEvent.click(link);

    expect(mockSetCurrentVehicle).toHaveBeenCalledWith({
      vin: "VIN123",
      buildSeries: "Series A",
    });
  });

  it("should scroll to the current vehicle", () => {
    const scrollMock = vi.fn();
    const el = document.createElement("tr");
    el.scrollIntoView = scrollMock;

    useVehicles.mockReturnValue({
      vehicles: defaultVehicles,
      isLoading: false,
      page: 1,
      currentVehicle: { vin: "VIN123" },
      setCurrentVehicle: mockSetCurrentVehicle,
    });

    document.body.appendChild(el);

    render(<VehicleList />, { wrapper: MemoryRouter });

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
