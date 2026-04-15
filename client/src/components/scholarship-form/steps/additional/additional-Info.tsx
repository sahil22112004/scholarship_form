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

const options = [
  "Google",
  "Facebook",
  "Instagram",
  "Referred",
  "Company",
  "Agreement",
  "University",
  "Speech",
  "Webinar",
] as const;

const schema = z
  .object({
    source: z.enum(options),
    specify: z.string().min(1,"this field cannot be empty"),
  })
  

type FormData = z.infer<typeof schema>;

const AdditionalInfoForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      source: "Company",
      specify: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <Box className={style.container}>
      <h2 className={style.title}>Additional Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <FormControl className={style.formControl}>
          <div className={style.label}>
            Where did you hear about us?
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
                    label={option}
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
              placeholder="Please specify"
              fullWidth
              // multiline
              // minRows={1}
              error={!!errors.specify}
              helperText={errors.specify?.message}
              className={style.textField}
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: "40px",
                  alignItems: "flex-start",
                },
              }}
            />
          )}
        />

        <div className={style.footer}>
          <button type="button" className={style.btnSecondary}>
            BACK
          </button>

          <div className={style.footerRight}>
            <button type="button" className={style.btnSecondary}>
              cancel
            </button>
            <button type="submit" className={style.btnPrimary}>
              FINISH
            </button>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default AdditionalInfoForm;