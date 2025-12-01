import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={cn(
        "border-primary size-4 animate-spin rounded-full border-t-2 bg-transparent",
        className
      )}
    />
  );
};
