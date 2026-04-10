import { z } from "zod";

const currencyRegex = /^\d{1,7}(,\d{3})*(\.\d{1,2})?$/;

export const personalSchema = z.object({
  documentType: z.string().min(1, "Document Is Required"),
  documentNumber: z.string().min(1, "Document Number Is Required").max(50, "Max Is NUmber for Document Number is 50 "),
  maritalStatus: z.string().min(1, "Marital Status Is Required "),
  profession: z.string().regex(/^[A-Za-z\s]+$/, "Profession must contain only letters and spaces"),

  dob: z.string().min(1, "Date Of Birth Is Required"),
  country: z.string().min(1, "Country Is Required"),
  state: z.string().min(1, "State Is Required"),
  city: z.string().min(1, "City Is Required"),
  nationality: z.string().min(1, "Nationality Is Required"),

  income: z.string()
  .min(1, "Income Is Required")
  .regex(currencyRegex, "Formate should be decimals up to 2 digits,The thousands separator would be with ',' "),
  expense: z.string()
  .min(1, "Expense Is Required")
  .regex(currencyRegex, "Formate should be decimals up to 2 digits,The thousands separator would be with ',' "),

  dependent: z.enum(["yes", "no"]),
  hasChildren: z.enum(["yes", "no"]),

  children0to4: z.string().optional(),
  children5to12: z.string().optional(),
  children13to18: z.string().optional(),
  children18plus: z.string().optional(),
}).superRefine((data: any, ctx: any) => {
  if (data.hasChildren === "yes") {
    const allEmpty =
      !data.children0to4 &&
      !data.children5to12 &&
      !data.children13to18 &&
      !data.children18plus;

    if (allEmpty) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter number of children in at least one age group",
        path: ["children0to4"],
      });
    }
  }
});

export type personalInterface = z.infer<typeof personalSchema>