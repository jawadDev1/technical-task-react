import { Typography } from "@/components/common";
import { formatArticleTime } from "@/lib/utils";

interface ArticleCardProps {
  image: string;
  title: string;
  createdAt: string;
  desc: string;
}

export const ArticleCard = ({
  createdAt,
  desc,
  image,
  title,
}: ArticleCardProps) => {
  return (
    <div className="rounded-lg bg-neutral-100 px-[13px] py-2.5">
      <img
        src={image}
        alt={title || "article image"}
        className="h-[141px] w-full rounded-sm object-cover object-center"
      />

      <Typography
        variant="content"
        className="mt-1.5 font-bold text-neutral-800"
      >
        {title}
      </Typography>
      <Typography variant="xs" className="mt-1 leading-4 text-neutral-950">
        {formatArticleTime(createdAt)}
      </Typography>
      <Typography variant="xs" className="mt-3 leading-4 text-black">
        {desc}
      </Typography>
    </div>
  );
};

export const ArticleCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg bg-neutral-100 px-[13px] py-2.5">
      <div className="h-[141px] w-full rounded-sm bg-neutral-300" />

      <div className="mt-1.5 h-5 w-3/4 rounded bg-neutral-300" />

      <div className="mt-1 h-3 w-1/4 rounded bg-neutral-300" />
      <div className="mt-3 space-y-1">
        <div className="h-3 w-full rounded bg-neutral-300" />
        <div className="h-3 w-full rounded bg-neutral-300" />
        <div className="h-3 w-5/6 rounded bg-neutral-300" />
      </div>
    </div>
  );
};
