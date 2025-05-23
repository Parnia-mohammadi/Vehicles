import * as yup from "yup";

export const schema = yup.object().shape({
  address: yup.string().optional(),
  globalVersion: yup
    .number()
    .typeError("Should enter a number")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .optional(),
  plate: yup.string().optional(),
  buildSeries: yup.string().optional(),
  fuelLevel: yup.number().transform((value) => (isNaN(value) ? 0 : value)),
  fuelType: yup.string().optional(),
});
