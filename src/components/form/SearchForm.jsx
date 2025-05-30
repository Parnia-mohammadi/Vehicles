import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useCurrentVehicle } from "../../context/VehiclesProvider";
import { schema } from "./schema";

const fuelTypes = ["Gasoline", "Diesel", "Super_Plus"];
const buildSeries = ["C453", "W176", "X156", "C453", "AMG1", "C117"];

function SearchForm({ setIsOpen }) {
  const navigate = useNavigate();
  const { setPage } = useCurrentVehicle();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      address: "",
      globalVersion: "",
      plate: "",
      fuelType: "",
      buildSeries: "",
      fuelLevel: "",
    },
  });

  const MinFuelLevel = watch("fuelLevel");

  const onSubmit = (data) => {
    const encodedParams = createSearchParams(data);
    navigate({ pathname: "/vehicles", search: encodedParams.toString() });
    setIsOpen(false);
    setPage(1);
  };

  return (
    <form
      id="form"
      className="flex rounded-lg
           text-white flex-col justify-center items-center p-[3%] gap-y-2 border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-1 w-full flex-col flex gap-2">
        <label htmlFor="address">Address :</label>
        <input
          type="text"
          id="address"
          className="px-3 w-full border-gray-400 border-[1px] border-solid rounded-md"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="flex-1 w-full flex-col flex gap-2">
        <label htmlFor="globalVersion">Global Version :</label>
        <input
          type="text"
          id="globalVersion"
          className="px-3 w-full border-gray-400 border-[1px] border-solid rounded-md"
          {...register("globalVersion")}
        />
        {errors.globalVersion && (
          <p className="text-red-600">{errors.globalVersion.message}</p>
        )}
      </div>
      <div className=" w-full flex-col flex gap-2">
        <label htmlFor="plate">Plate :</label>
        <input
          type="text"
          name="plate"
          id="plate"
          className="px-3 w-full border-gray-400 border-[1px] border-solid rounded-md"
          {...register("plate")}
        />
        {errors.plate && <p className="text-red-600">{errors.plate.message}</p>}
      </div>
      <div className="w-full flex flex-col items-start xl:flex-center xl:items-center xl:flex-row xl:gap-4 gap-2 p-2 xl:*:w-1/2 *:w-full">
        <div className="flex items-center justify-between text-nowrap py-3">
          <label htmlFor="buildSeries">Choose a buildSerie :</label>
          <select
            name="buildSeries"
            id="buildSeries"
            className="bg-slate-900 py-1 px-3"
            {...register("buildSeries")}
          >
            {buildSeries.map((buildSerie, index) => (
              <option key={index} value={buildSerie} className="">
                {buildSerie}
              </option>
            ))}
          </select>
        </div>
        {/* fuelLevel */}
        <div className="xl:flex-center flex justify-start gap-1.5">
          <label htmlFor="fuelLevel" className="text-nowrap">
            Minimum FuelLevel : {MinFuelLevel && <span>{MinFuelLevel}%</span>}
          </label>
          <input
            type="range"
            id="fuelLevel"
            name="fuelLevel"
            min="0"
            max="100"
            {...register("fuelLevel")}
          />
          {errors.fuelLevel && (
            <p className="text-red-600">{errors.fuelLevel.message}</p>
          )}
        </div>
      </div>
      <p className=" w-full mt-2">Fuel Type :</p>
      <div className="flex items-start justify-center gap-x-2.5 md:gap-x-3 xl:gap-x-4 text-nowrap">
        {fuelTypes.map((type, index) => (
          <div
            key={index}
            className=" border border-gray-400 rounded-md p-2 md:p-3"
          >
            <input
              type="radio"
              name="fuelType"
              id={type}
              value={type}
              {...register("fuelType")}
            />
            <label htmlFor={type}> {type}</label>
            {errors.fuelType && (
              <p className="text-red-600">{errors.fuelType.message}</p>
            )}
          </div>
        ))}
      </div>
      <input
        type="submit"
        value="Submit"
        className="bg-emerald-900 text-white w-full hover:bg-emerald-800 rounded-lg py-[3%]"
      />
    </form>
  );
}

export default SearchForm;
