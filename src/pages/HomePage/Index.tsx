import { useEffect } from "react";
import { useNavigate } from "react-router";

import {
  ArticleCard,
  ArticleCardSkeleton,
  Pagination,
} from "@/components/articles";
import { Typography } from "@/components/common";
import { LogoutIcon } from "@/components/icons";
import { setCurrentPage } from "@/features/articles/articlesSlice";
import { allArticles } from "@/features/articles/articlesThunks";
import { logout } from "@/features/auth/authSlice";
import { initializeIdleTimeout } from "@/lib/idleSessionTimeout";
import { getRoutePath } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, pageNumber, totalPage } = useAppSelector(
    (state) => state.articles
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate(getRoutePath("LOGIN"));
  };

  const handleSessionTimeout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(allArticles({ params: { limit: 8, page: pageNumber } }));

    const idle = initializeIdleTimeout({
      timeout: 60000,
      onSessionTimeout: handleSessionTimeout,
    });

    // idle.start();

    return () => {
      idle.stop();
    };
  }, [pageNumber]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(getRoutePath("LOGIN"));
    }
  }, [isAuthenticated]);

  return (
    <div className="mx-auto max-w-[1240px] px-5 pt-8 md:px-2 lg:px-2">
      <div className="flex items-center justify-between gap-x-4">
        <Typography variant="h1" className="text-primary uppercase">
          Articles
        </Typography>

        <Typography
          onClick={handleLogout}
          variant="content"
          className="text-destructive flex cursor-pointer items-center gap-x-2 font-semibold"
        >
          <span>
            <LogoutIcon />
          </span>
          Logout
        </Typography>
      </div>

      {articles && articles.length > 0 && (
        <>
          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!loading &&
              articles.map(({ _id, createdAt, description, image, title }) => (
                <ArticleCard
                  key={_id}
                  {...{ createdAt, desc: description, title, image }}
                />
              ))}

            {loading &&
              Array.from({ length: 8 }).map((_, index) => (
                <ArticleCardSkeleton key={index} />
              ))}
          </div>
          <div className="mt-9 flex justify-end pb-5 lg:pb-0">
            <Pagination
              currentPage={pageNumber}
              onPageChange={handlePageChange}
              totalPages={totalPage}
            />
          </div>
        </>
      )}
    </div>
  );
};
