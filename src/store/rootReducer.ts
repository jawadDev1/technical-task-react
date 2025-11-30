import { combineReducers } from "@reduxjs/toolkit";

import articlesReducer from "@/features/articles/articlesSlice";
import authReducer from "@/features/auth/authSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
});
