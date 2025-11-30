import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { Button } from "@/components/common";
import { MailIcon } from "@/components/icons";
import { getRoutePath } from "@/lib/utils";
import { type ForgotPasswordFormData, forgotPasswordSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";

import { InputField } from "../../InputField/Index";

interface ForgotPasswordFormProps {
  handleNext: () => void;
  handleSendMail: (email: string) => Promise<boolean>;
}

export const ForgotPasswordForm = ({
  handleNext,
  handleSendMail,
}: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { loading } = useAppSelector((state) => state.auth);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const success = await handleSendMail(data.email);
    if (success) {
      handleNext();
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

      <Button className="mt-12 h-10">{loading ? "Sending..." : "Send"}</Button>

      <Link to={getRoutePath("LOGIN")}>
        <Button varient="outline" className="mt-4 h-10 font-semibold">
          Back
        </Button>
      </Link>
    </form>
  );
};
