import { z } from "zod";

export const addressSchema = (t: any) =>
  z.object({
    emails: z.array(z.object({ email: z.string().email(t("addressData.validation.emailInvalid")) }))
    .min(1, t("addressData.validation.emailRequired")),

    phones: z.array(z.object({
      type: z.enum(["phone", "whatsapp"]),
      prefix: z.string().min(1, t("addressData.validation.prefixRequired")),
      number: z.string().min(1, t("addressData.validation.phoneRequired"))
    }))
      .refine((phones) => phones.some(p => p.type === 'phone'), {
        message: t("addressData.validation.atLeastOnePhone"),
        path: []
      })
      .refine((phones) => phones.some(p => p.type === 'whatsapp'), {
        message: t("addressData.validation.atLeastOneWhatsapp"),
        path: []
      }),
      
    housingType: z.string().min(1, t("addressData.validation.housingTypeRequired")),
    housingConditions: z.string().min(1, t("addressData.validation.housingConditionsRequired")),
    country: z.string().min(1, t("addressData.validation.countryRequired")),
    state: z.string().min(1, t("addressData.validation.stateRequired")),
    city: z.string().min(1, t("addressData.validation.cityRequired")),
    zipCode: z.string().min(1, t("addressData.validation.zipCodeRequired")),
    address: z.string().min(1, t("addressData.validation.addressRequired")),
  });

export type addressInterface = z.infer<ReturnType<typeof addressSchema>>;
