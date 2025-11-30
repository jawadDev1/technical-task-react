const AUTH_PREFIX = "api/v1/users";
const ARTICLES_PREFIX = "api/v1";

export const AUTH_ENDPOINTS = {
  LOGIN: `${AUTH_PREFIX}/login`,
  SIGNUP: `${AUTH_PREFIX}/signUp`,
  RESET_PASSWORD: `${AUTH_PREFIX}/resetPassword`,
  FORGOT_PASSWORD: `${AUTH_PREFIX}/forgotPassword`,
  VERIFY_CODE: `${AUTH_PREFIX}/verifyCode`,
};

export const ARTICLE_ENDPOINTS = {
  ALL_ARTICLES: `${ARTICLES_PREFIX}/blogs`,
};
