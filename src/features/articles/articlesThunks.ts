import { createAsyncThunk } from "@reduxjs/toolkit";

import { articlesService } from "@/services";
import type { IAllArticlesResponse } from "@/types";

import { logout } from "../auth/authSlice";

export const allArticles = createAsyncThunk<
  IAllArticlesResponse,
  { params: { [key: string]: string | number | boolean } },
  { rejectValue: string }
>("articles/allArticles", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const result = await articlesService.allArticles(payload);

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("Error in allArticles ======+> ", message);
    if (error?.status === 401) {
      dispatch(logout());
    }
    return rejectWithValue(message);
  }
});
