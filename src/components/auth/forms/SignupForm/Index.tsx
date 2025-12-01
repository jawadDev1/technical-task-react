import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { Button, Typography } from "@/components/common";
import { GlobeIcon, MailIcon, UserIcon } from "@/components/icons";
import { COUNTRIES } from "@/constants/countries";
import { signup } from "@/features/auth/authThunks";
import { showToast } from "@/lib/toast";
import { getRoutePath } from "@/lib/utils";
import { type SignupFormData, signupSchema } from "@/schemas";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { InputField } from "../../InputField/Index";
import { InputPasswordField } from "../../InputPasswordField/Index";
import { SelectList } from "../../SelectList/Index";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
    },
  });

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormData) => {
    const result = await dispatch(signup(data));

    if (signup.fulfilled.match(result)) {
      showToast("Account Registered Successfully", "success");
      navigate(getRoutePath("LOGIN"));
    } else if (signup.rejected.match(result)) {
      showToast(result.payload || "Account Registeration Failed", "error");
    }
  };

  return (
    <div>
      <form
        className="flex w-full flex-col gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <InputField
            name="name"
            type="text"
            placeholder="Name"
            register={register}
            error={errors?.name?.message ?? ""}
            Icon={UserIcon}
          />
        </div>
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
        <div>
          <InputPasswordField
            name="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message ?? ""}
          />
        </div>
        <div>
          <InputPasswordField
            name="confirmPassword"
            placeholder="Confirm Password"
            register={register}
            error={errors?.confirmPassword?.message ?? ""}
          />
        </div>

        <div>
          <SelectList
            name="country"
            Icon={GlobeIcon}
            error={errors.country?.message || ""}
            options={COUNTRIES}
            setValue={setValue}
            placeholder="Select Country"
          />
        </div>

        <Button className="mt-8 h-10">
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className="my-6 flex items-center justify-center gap-x-1">
        <div className="h-px w-[93px] bg-neutral-300" />
        <Typography variant="sm" className="mx-1 w-fit">
          Or
        </Typography>
        <div className="h-px w-[93px] bg-neutral-300" />
      </div>

      <Typography variant="sm" className="text-center">
        Have an account yet?{" "}
        <Link
          to={getRoutePath("LOGIN")}
          className="text-primary-light font-semibold"
        >
          {" "}
          Login{" "}
        </Link>
      </Typography>
    </div>
  );
};
