import * as yup from "yup";

export const schema = yup.object().shape({
  address: yup.string().optional(),
  globalVersion: yup
    .number()
    .optional()
    .typeError("You can just enter a number"),
  plate: yup.string().optional(),
  buildSeries: yup.string().optional(),
  fuelLevel: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Min is 0%")
    .max(100, "Max is 100%"),

  fuelType: yup.boolean().nullable(),
});
