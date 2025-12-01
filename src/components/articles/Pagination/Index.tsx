import { ChevronIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      onPageChange(page);
    }
  };

  return (
    <div className="flex w-fit items-center gap-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={cn(
          "bg-primary flex size-[38px] cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:opacity-90",
          { "cursor-not-allowed bg-gray-300": currentPage === 1 }
        )}
      >
        <ChevronIcon className="h-3 w-1.5 rotate-180" />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          disabled={page === "..."}
          className={cn(
            "h-12 w-12 cursor-pointer text-[16px] transition-colors",
            page === currentPage
              ? "text-primary font-extrabold"
              : page === "..."
                ? "cursor-default text-gray-400"
                : "hover:text-primary text-gray-700"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          "bg-primary flex size-[38px] cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:opacity-90",
          { "cursor-not-allowed bg-gray-300": currentPage === totalPages }
        )}
      >
        <ChevronIcon className="h-3 w-1.5" />
      </button>
    </div>
  );
};
