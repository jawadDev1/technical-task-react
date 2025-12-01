import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/common";
import { resetPassword } from "@/features/auth/authThunks";
import { showToast } from "@/lib/toast";
import { type ResetPasswordFormData, resetPasswordSchema } from "@/schemas";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { InputPasswordField } from "../../InputPasswordField/Index";

interface ResetPasswordFormProps {
  handleNext: () => void;
}

export const ResetPasswordForm = ({ handleNext }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);

  const onSubmit = async (data: ResetPasswordFormData) => {
    const result = await dispatch(resetPassword(data));

    if (resetPassword.fulfilled.match(result)) {
      showToast("Password reset successfully!", "success");
      handleNext();
    } else if (resetPassword.rejected.match(result)) {
      showToast(error || "Password reset Failed", "error");
    }
  };

  return (
    <form className="mt-16 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputPasswordField
          name="password"
          placeholder="Password"
          register={register}
          error={errors?.password?.message ?? ""}
        />
      </div>

      <div className="mt-4">
        <InputPasswordField
          name="confirmPassword"
          placeholder="Confirm Password"
          register={register}
          error={errors?.confirmPassword?.message ?? ""}
        />
      </div>

      <Button className="mt-12 h-10">
        {loading ? "Restting..." : "Reset Password"}
      </Button>
    </form>
  );
};
