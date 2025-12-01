import type { IArticle } from "@/types";

export interface IArticlesState {
  articles: IArticle[] | null;
  loading: boolean;
  error: string | null;
  totalPage: number;
  pageNumber: number;
}
