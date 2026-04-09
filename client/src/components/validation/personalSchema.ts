import { z } from "zod";

const currencyRegex = /^\d{1,7}(,\d{3})*(\.\d{1,2})?$/;
const number2Digit = z
  .string()
  .regex(/^\d{1,2}$/)
  .transform((val) => Number(val))
  .refine((val) => val >= 1 && val <= 99);

export const personalSchema = z.object({
  documentType: z.string().min(1),
  documentNumber: z.string().max(50),
  maritalStatus: z.string().min(1),
  profession: z.string().regex(/^[A-Za-z\s]+$/),

  dob: z.string().min(1),
  country: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(1),
  nationality: z.string().min(1),

  income: z.string().regex(currencyRegex),
  expense: z.string().regex(currencyRegex),

  dependent: z.enum(["yes", "no"]),
  hasChildren: z.enum(["yes", "no"]),

  children0to4: z.string().optional(),
  children5to12: z.string().optional(),
  children13to18: z.string().optional(),
  children18plus: z.string().optional(),
}).refine((data) => {
  if (data.hasChildren === "yes") {
    return (
      data.children0to4 ||
      data.children5to12 ||
      data.children13to18 ||
      data.children18plus
    );
  }
  return true;
});