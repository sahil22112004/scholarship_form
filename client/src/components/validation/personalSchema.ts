import { z } from "zod";


const currencyRegex = /^\d{1,7}(,\d{3})*(\.\d{1,2})?$/;

export const personalSchema = ( t :any) =>
  z.object({
    documentType: z.string().min(1, t("personalData.validation.documentTypeRequired")),
    documentNumber: z.string().min(1, t("personalData.validation.documentNumberRequired")).max(50, t("personalData.validation.documentNumberMax")),
    maritalStatus: z.string().min(1, t("personalData.validation.maritalStatusRequired")),
    profession: z.string().regex(/^[A-Za-z\s]+$/, t("personalData.validation.professionInvalid")),

    dob: z.string().min(1, t("personalData.validation.dobRequired")),
    country: z.string().min(1, t("personalData.validation.countryRequired")),
    state: z.string().min(1, t("personalData.validation.stateRequired")),
    city: z.string().min(1, t("personalData.validation.cityRequired")),
    nationality: z.string().min(1, t("personalData.validation.nationalityRequired")),

    income: z.string()
      .min(1, t("personalData.validation.incomeRequired"))
      .regex(currencyRegex, t("personalData.validation.incomeInvalid")),
    expense: z.string()
      .min(1, t("personalData.validation.expenseRequired"))
      .regex(currencyRegex, t("personalData.validation.expenseInvalid")),

    dependent: z.enum(["yes", "no"]),
    hasChildren: z.enum(["yes", "no"]),

    children0to4: z.string().optional(),
    children5to12: z.string().optional(),
    children13to18: z.string().optional(),
    children18plus: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (data.hasChildren === "yes") {
      const allEmpty =
        !data.children0to4 &&
        !data.children5to12 &&
        !data.children13to18 &&
        !data.children18plus;

      if (allEmpty) {
        const fields = [
        "children0to4",
        "children5to12",
        "children13to18",
        "children18plus"
      ];
        fields.forEach((field) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("personalData.validation.childrenRequired"),
          path: [field],
        });
      });
      }
    }
  });

export type personalInterface = z.infer<ReturnType<typeof personalSchema>>