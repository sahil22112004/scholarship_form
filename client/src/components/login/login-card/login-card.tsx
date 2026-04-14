'use client'

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import "./login-card.css";
import { useAppDispatch } from "@/hooks/use-redux-hook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithTokenApi } from "@/store/features/auth/auth-api";
import { useRouter } from "next/navigation";
import { useAppSelector } from '@/hooks/use-redux-hook';
import { useTranslation } from 'react-i18next';

const LoginCard = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentUser, loading } = useAppSelector((state) => state.auth)

  const schema = z.object({
    token: z.string().min(1, t("login.error_empty"))
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    console.log("click")

    try {
      const { token } = data
      await dispatch(loginWithTokenApi(token));
      router.push('/scholarship-intro')
    } catch (error: any) {
    }
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Card className="login-card">
      <CardContent>
        <div className="logo-section">
          <img src="logo.svg" alt="logo" />
        </div>

        <div className="login-title">{t("login.title")}</div>

        <Typography className="login-subtitle">
          {t("login.subtitle")}
        </Typography>

        <TextField
          fullWidth
          placeholder={t("login.placeholder")}
          variant="outlined"
          className="input-field"
          {...register("token")}
          error={!!errors.token}
          helperText={errors.token?.message}
        />

        <Button
          fullWidth
          className="login-button"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? t("login.loading") : t("login.button")}
        </Button>


        <Select
          value={i18n.language?.startsWith('es') ? 'es' : 'en'}
          onChange={handleLanguageChange}
          className="language-select"
          variant="standard"
          disableUnderline
        >
          <MenuItem value="en">{t("login.language.en")}</MenuItem>
          <MenuItem value="es">{t("login.language.es")}</MenuItem>
        </Select>
      </CardContent>
    </Card>
  );
};

export default LoginCard;