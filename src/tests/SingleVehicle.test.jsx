import { describe, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SingleVehicle from "../components/SingleVehicle";
import { useVehicles } from "../context/vehiclesProvider";

vi.mock("../context/vehiclesProvider", () => ({
  useVehicles: vi.fn(),
}));

vi.mock("../ui/BackButton", () => ({
  default: ({ onClick }) => <button onClick={onClick}>← Back</button>,
}));

vi.mock("../ui/Table", () => ({
  default: ({ headers, data, renderRow }) => (
    <table>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>{renderRow(item)}</tr>
        ))}
      </tbody>
    </table>
  ),
}));

const sampleVehicle = {
  vin: "VIN123",
  plate: "XYZ123",
  fuelLevel: 75,
  address: "Sample Address",
  buildSeries: "S",
  fuelType: "Electric",
  primaryColor: "Black",
  secondaryColor: "Silver",
  charging: true,
  freeForRental: false,
  hardwareVersion: "v1.2",
  globalVersion: "g1.0",
};

describe("SingleVehicle", () => {
  let setCurrentVehicleMock;
  let mockNavigate;

  beforeEach(() => {
    setCurrentVehicleMock = vi.fn();
    mockNavigate = vi.fn();

    useVehicles.mockReturnValue({
      vehicles: [sampleVehicle],
      currentVehicle: sampleVehicle,
      setCurrentVehicle: setCurrentVehicleMock,
    });
  });

  it("renders vehicle details correctly", () => {
    render(
      <MemoryRouter initialEntries={["/vehicles/VIN123"]}>
        <Routes>
          <Route path="/vehicles/:vin" element={<SingleVehicle />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Properties")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByText("XYZ123")).toBeInTheDocument();
    expect(screen.getByText("Sample Address")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument(); // charging: true
    expect(screen.getByText("No")).toBeInTheDocument(); // freeForRental: false
    expect(screen.getByText("75%")).toBeInTheDocument(); // fuelLevel
  });

  it("calls setCurrentVehicle with correct vehicle", () => {
    render(
      <MemoryRouter initialEntries={["/vehicles/VIN123"]}>
        <Routes>
          <Route path="/vehicles/:vin" element={<SingleVehicle />} />
        </Routes>
      </MemoryRouter>
    );

    expect(setCurrentVehicleMock).toHaveBeenCalledWith(sampleVehicle);
  });

  it("shows BackButton when vehicle not found", () => {
    useVehicles.mockReturnValueOnce({
      vehicles: [],
      currentVehicle: null,
      setCurrentVehicle: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/vehicles/INVALIDVIN"]}>
        <Routes>
          <Route path="/vehicles/:vin" element={<SingleVehicle />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText((content) => content.includes("Vehicle not found"))
    ).toBeInTheDocument();
    expect(screen.getByText("← Back")).toBeInTheDocument();

    fireEvent.click(screen.getByText("← Back"));
  });
});
