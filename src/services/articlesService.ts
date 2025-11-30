import type { IAllArticlesResponse } from "@/types";

import { api } from "./api/apiClient";
import { ARTICLE_ENDPOINTS } from "./api/endpoints";

export const articlesService = {
  allArticles: async (): Promise<IAllArticlesResponse> => {
    return await api.get<IAllArticlesResponse>(ARTICLE_ENDPOINTS.ALL_ARTICLES);
  },
};
