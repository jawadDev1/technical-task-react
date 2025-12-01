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

import { api } from "./api/apiClient";
import { AUTH_ENDPOINTS } from "./api/endpoints";

export const authService = {
  login: async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
    return await api.post<ILoginCredentials, ILoginResponse>(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    );
  },

  signup: async (payload: ISignupPayload): Promise<ISignupResponse> => {
    return await api.post<ISignupPayload, ISignupResponse>(
      AUTH_ENDPOINTS.SIGNUP,
      payload
    );
  },

  forgotPassword: async (
    payload: IForgotPasswordPayload
  ): Promise<IForgotPasswordResponse> => {
    return await api.post<IForgotPasswordPayload, IForgotPasswordResponse>(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      payload
    );
  },

  verifyCode: async (
    payload: IVerifyCodePayload
  ): Promise<IVerifyCodeResponse> => {
    return await api.post<IVerifyCodePayload, IVerifyCodeResponse>(
      AUTH_ENDPOINTS.VERIFY_CODE,
      payload
    );
  },

  resetPassword: async (
    payload: IResetPasswordPayload
  ): Promise<IResetPasswordResponse> => {
    return await api.patch<IResetPasswordPayload, IResetPasswordResponse>(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      payload
    );
  },
};
