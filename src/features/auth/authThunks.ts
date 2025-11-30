import { createAsyncThunk } from "@reduxjs/toolkit";

import { authService } from "@/services";
import type {
  IForgotPasswordPayload,
  IForgotPasswordResponse,
  ILoginCredentials,
  ILoginResponse,
  IResetPasswordPayload,
  IResetPasswordResponse,
  ISignupPayload,
  ISignupResponse,
  IVerifyCodePayload,
  IVerifyCodeResponse,
} from "@/types";

export const login = createAsyncThunk<
  ILoginResponse,
  ILoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const result = await authService.login(credentials);

    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    return rejectWithValue(message);
  }
});

export const signup = createAsyncThunk<
  ISignupResponse,
  ISignupPayload,
  { rejectValue: string }
>("auth/signup", async (payload, { rejectWithValue }) => {
  try {
    const result = await authService.signup(payload);

    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    return rejectWithValue(message);
  }
});

export const forgotPassword = createAsyncThunk<
  IForgotPasswordResponse,
  IForgotPasswordPayload,
  { rejectValue: string }
>("auth/forgotPassword", async (payload, { rejectWithValue }) => {
  try {
    const result = await authService.forgotPassword(payload);

    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    return rejectWithValue(message);
  }
});

export const verifyCode = createAsyncThunk<
  IVerifyCodeResponse,
  IVerifyCodePayload,
  { rejectValue: string }
>("auth/verifyCode", async (payload, { rejectWithValue }) => {
  try {
    const result = await authService.verifyCode(payload);

    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    return rejectWithValue(message);
  }
});

export const resetPassword = createAsyncThunk<
  IResetPasswordResponse,
  IResetPasswordPayload,
  { rejectValue: string }
>("auth/resetPassword", async (payload, { rejectWithValue }) => {
  try {
    const result = await authService.resetPassword(payload);

    return result;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    return rejectWithValue(message);
  }
});
