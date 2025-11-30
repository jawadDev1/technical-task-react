import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { Button, Typography } from "@/components/common";
import { verifyCode } from "@/features/auth/authThunks";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { type VerifyCodeFormData, verifyCodeSchema } from "@/schemas";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface ForgotPasswordFormProps {
  handleNext: () => void;
  handleResend: () => void;
  email: string;
  handleBack: () => void;
}

export const VerifyCodeForm = ({
  handleNext,
  handleResend,
  email,
  handleBack,
}: ForgotPasswordFormProps) => {
  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const codeValue = watch("code");

  const onSubmit = async (data: VerifyCodeFormData) => {
    const result = await dispatch(
      verifyCode({ email: data.email, code: Number(data.code) })
    );
    if (verifyCode.fulfilled.match(result)) {
      showToast("code verified successfully", "success");
      handleNext();
    } else if (verifyCode.rejected.match(result)) {
      showToast(error || "Something went wrong", "error");
    }
  };

  const handleCodeChange = (value: string, index: number) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length <= 1) {
      const newCode = codeValue.split("");
      newCode[index] = numericValue;
      const updatedCode = newCode.join("").slice(0, 6);
      setValue("code", updatedCode);

      if (numericValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !codeValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    setValue("email", email);
  }, [email]);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center gap-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            placeholder="0"
            maxLength={1}
            autoFocus={index === 0}
            value={codeValue[index] || ""}
            onChange={(e) => handleCodeChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              `au focus:border-primary h-11 w-9 rounded-2xl border-[1.5px] border-neutral-50 text-center text-xs text-neutral-900 transition-all duration-200 placeholder:text-neutral-600 focus:outline-none md:h-[52px] md:w-[46px]`,
              { "border-red-500 bg-red-500/10": errors.code }
            )}
          />
        ))}
      </div>

      <Typography
        onClick={handleResend}
        variant="content"
        className="text-primary mt-6 ml-auto size-fit cursor-pointer font-bold"
      >
        Resend Code
      </Typography>

      <Button className="mt-11 h-10">
        {loading ? "Verifying..." : "Verify"}
      </Button>
      <Button
        onClick={handleBack}
        varient="outline"
        className="mt-4 h-10 font-semibold"
      >
        Back
      </Button>
    </form>
  );
};
