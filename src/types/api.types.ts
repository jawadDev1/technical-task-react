export interface IApiResponse {
  message: string;
  data: string | null;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse extends IApiResponse {
  data: string;
}

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
}

export type ISignupResponse = IApiResponse;

export interface IForgotPasswordPayload {
  email: string;
}

export type IForgotPasswordResponse = IApiResponse;

export interface IVerifyCodePayload {
  email: string;
  code: number;
}

export type IVerifyCodeResponse = IApiResponse;

export interface IResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

export type IResetPasswordResponse = IApiResponse;

// =========== Articles ==========================================================================

export interface IAllArticlesResponse {
  message: string;
  data: {
    total_count: number;
    page_total: number;
    limit: number;
    page_number: number;
    count: number;
    result: IArticle[];
  };
}

export interface IArticle {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
  description: string;
  updatedAt: string;
}
