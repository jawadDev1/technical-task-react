import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IArticlesState } from "./articles.types";
import { allArticles } from "./articlesThunks";

const initialState: IArticlesState = {
  articles: null,
  loading: false,
  error: null,
  pageNumber: 1,
  totalPage: 0,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(allArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.articles = action.payload.data.result;
        state.pageNumber = action.payload.data.page_number;
        state.totalPage = action.payload.data.page_total;
      })
      .addCase(allArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage } = articlesSlice.actions;

export default articlesSlice.reducer;
