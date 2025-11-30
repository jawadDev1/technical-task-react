import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { Button, Typography } from "@/components/common";
import { MailIcon } from "@/components/icons";
import { login } from "@/features/auth/authThunks";
import { showToast } from "@/lib/toast";
import { getRoutePath } from "@/lib/utils";
import { type LoginFormData, loginSchema } from "@/schemas";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { InputField } from "../../InputField/Index";
import { InputPasswordField } from "../../InputPasswordField/Index";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      showToast("Login successful!", "success");
      navigate(getRoutePath("HOME"));
    } else if (login.rejected.match(result)) {
      showToast(error || "Login Failed", "error");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          error={errors?.email?.message ?? ""}
          Icon={MailIcon}
        />
      </div>

      <div className="my-4">
        <InputPasswordField
          name="password"
          placeholder="Password"
          register={register}
          error={errors?.password?.message ?? ""}
        />
      </div>
      <div className="flex justify-end">
        <Link to={getRoutePath("FORGOT_PASSWORD")}>
          <Typography variant="sm" className="text-primary-light w-fit">
            Forgot password?
          </Typography>
        </Link>
      </div>

      <Button className="mt-8 h-10">
        {loading ? "Loggin in..." : "Log in"}
      </Button>

      <div className="my-6 flex items-center justify-center gap-x-1">
        <div className="h-px w-[93px] bg-neutral-300" />
        <Typography variant="sm" className="mx-1 w-fit">
          Or
        </Typography>
        <div className="h-px w-[93px] bg-neutral-300" />
      </div>

      <Typography variant="sm" className="text-center">
        Have no account yet?{" "}
        <Link
          to={getRoutePath("SIGNUP")}
          className="text-primary-light font-semibold"
        >
          {" "}
          Register{" "}
        </Link>
      </Typography>
    </form>
  );
};
