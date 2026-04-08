'use client'

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem
} from "@mui/material";
import "./login-card.css";
import { useAppDispatch } from "@/hooks/use-redux-hook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithTokenApi } from "@/store/features/auth/auth-api";
import { useRouter } from "next/navigation";
import { useAppSelector } from '@/hooks/use-redux-hook'


const schema = z.object({
  token: z.string().min(1, "This Field Cannot Be Empty")
});

type FormData = z.infer<typeof schema>;

const LoginCard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentUser, loading } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log("click")

    try {
      const { token } = data
      dispatch(loginWithTokenApi(token));
      router.push('/scholarship-intro')

    } catch (error: any) {

    }

  };

  return (
    <Card className="login-card">
      <CardContent>
        <div className="logo-section">
          <img src="logo.svg" alt="logo" />
        </div>

        <div className="login-title">Log in</div>

        <Typography className="login-subtitle">
          Enter the access code to continue
        </Typography>

        <TextField
          fullWidth
          placeholder="Access code"
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
          {loading ? "loading" : "LOG IN"}
        </Button>


        <Select
          defaultValue="en"
          className="language-select"
          variant="standard"
          disableUnderline
        >
          <MenuItem value="en">English (USA)</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
        </Select>
      </CardContent>
    </Card>
  );
};

export default LoginCard;