import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./additional-Info.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-hook";
import { createAdditionalInformationThunk } from "@/store/features/scholarshipform/scholarshipform-api";
import { useTranslation } from "react-i18next";

const options = [
  "google",
  "facebook",
  "instagram",
  "referred",
  "company",
  "agreement",
  "university",
  "speech",
  "webinar",
] as const;

const schema = z.object({
  source: z.enum(options),
  specify: z.string().min(1, "This field cannot be empty"),
});

type FormData = z.infer<typeof schema>;

interface AdditionalInfoProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  setCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdditionalInfoForm = ({ onContinue, onBack, setCancelModal }: AdditionalInfoProps) => {
  const dispatch = useAppDispatch();
  const { ScholarshipForm, additionalInformation } = useAppSelector(
    (state) => state.scholarshipform
  );

  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: additionalInformation || {
      source: "google",
      specify: "",
    },
  });

  const onSubmit = (data: FormData) => {
    if (!ScholarshipForm) {
      console.log("No application selected");
      return;
    }

    dispatch(
      createAdditionalInformationThunk({
        application_uuid: ScholarshipForm.id,
        content: data,
      })
    );

    console.log("Form Data:", data);
    onContinue(data);
  };

  return (
    <Box className={style.container}>
      <h2 className={style.title}>
        {t("additionalInfo.title")}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        {/* Radio Group */}
        <FormControl className={style.formControl}>
          <div className={style.label}>
            {t("additionalInfo.question")}
          </div>

          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} className={style.radioGroup}>
                {options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option} 
                    control={
                      <Radio
                        size="small"
                        sx={{
                          transform: "scale(1.2)",
                          "&.Mui-checked": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    }
                    label={t(`additionalInfo.options.${option}`)} 
                    className={style.radioItem}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#424242",
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>

        <Controller
          name="specify"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={t("additionalInfo.placeholder")}
              fullWidth
              error={!!errors.specify}
              helperText={
                errors.specify?.message
              }
              className={style.textField}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: 0,
                },
                "& .MuiInputBase-inputMultiline": {
                  padding: "10px 14px",
                  lineHeight: "1.5",
                },
              }}
            />
          )}
        />

        <div className={style.footer}>
          <button type="button" className={style.btnSecondary} onClick={onBack}>
            {t("additionalInfo.buttons.back")}
          </button>

          <div className={style.footerRight}>
            <button type="button" className={style.btnSecondary} onClick={() => setCancelModal(true)}>
              {t("additionalInfo.buttons.cancel")}
            </button>

            <button type="submit" className={style.btnPrimary}>
              {t("additionalInfo.buttons.finish")}
            </button>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default AdditionalInfoForm;