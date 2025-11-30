import astronaut from "@/assets/astronaut.svg";
import { Typography } from "@/components/common";

export const AuthSidePanel = () => {
  return (
    <div className="bg-primary hidden h-full items-center justify-center md:flex">
      <div className="flex flex-col justify-center text-center">
        <img src={astronaut} />

        <Typography variant="h2" className="mt-8 mb-1 text-white">
          Welcome aboard my friend
        </Typography>
        <Typography variant="sm" className="text-white">
          just a couple of clicks and we start
        </Typography>
      </div>
    </div>
  );
};
