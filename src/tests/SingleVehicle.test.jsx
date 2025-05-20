import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, test, expect, vi, afterEach } from "vitest";
import SingleVehicle from "../components/SingleVehicle";
import { useVehicles } from "../context/vehiclesProvider";

vi.mock("../context/vehiclesProvider", () => ({
  useVehicles: vi.fn(),
}));

const mockSetCurrentVehicle = vi.fn();

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

function renderWithRouter(vin = "VIN123", vehicles = [sampleVehicle]) {
  useVehicles.mockReturnValue({
    vehicles,
    setCurrentVehicle: mockSetCurrentVehicle,
    currentVehicle: vehicles.find((v) => v.vin === vin) || null,
  });

  return render(
    <MemoryRouter initialEntries={[`/vehicles/${vin}`]}>
      <Routes>
        <Route path="/vehicles/:vin" element={<SingleVehicle />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("SingleVehicle component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading initially", async () => {
    renderWithRouter();
    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  test("renders 'Vehicle not found' if VIN not matched", async () => {
    renderWithRouter("INVALID_VIN", [sampleVehicle]);
    await waitFor(() =>
      expect(screen.getByText(/vehicle not found/i)).toBeInTheDocument()
    );
  });

  test("renders vehicle details correctly", async () => {
    renderWithRouter();
    await waitFor(() =>
      expect(screen.getByText(sampleVehicle.vin)).toBeInTheDocument()
    );
    expect(screen.getByText(sampleVehicle.plate)).toBeInTheDocument();
    expect(screen.getByText(`${sampleVehicle.fuelLevel}%`)).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument(); // charging
    expect(screen.getByText("No")).toBeInTheDocument(); // freeForRental
  });

  test("calls setCurrentVehicle with correct vehicle", async () => {
    renderWithRouter();
    await waitFor(() =>
      expect(mockSetCurrentVehicle).toHaveBeenCalledWith(sampleVehicle)
    );
  });

  test("shows BackButton when vehicle not found", async () => {
    renderWithRouter("INVALID_VIN", [sampleVehicle]);
    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveTextContent(/back/i)
    );
  });
});
