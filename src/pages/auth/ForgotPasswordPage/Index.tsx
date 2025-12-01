import { useState } from "react";
import { useNavigate } from "react-router";

import {
  AuthSidePanel,
  ForgotPasswordForm,
  ResetPasswordForm,
  VerifyCodeForm,
} from "@/components/auth";
import { Typography } from "@/components/common";
import { InfoIcon } from "@/components/icons";
import { forgotPassword } from "@/features/auth/authThunks";
import { showToast } from "@/lib/toast";
import { getRoutePath } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type Steps = "forgot" | "verify" | "reset";

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);
  const [step, setStep] = useState<Steps>("forgot");
  const [email, setEmail] = useState<string | null>("info");

  const handleSendMail = async (email: string): Promise<boolean> => {
    const result = await dispatch(forgotPassword({ email }));

    if (forgotPassword.fulfilled.match(result)) {
      showToast("verification email send successfully", "success");
    } else if (forgotPassword.rejected.match(result)) {
      showToast(error || "Something went wrong", "error");
      return false;
    }
    setEmail(email);

    return true;
  };

  const handleNextStep = () => {
    if (step === "forgot") return setStep("verify");
    if (step === "verify") return setStep("reset");

    return navigate(getRoutePath("HOME"));
  };

  const handleBack = () => {
    if (step === "verify") setStep("forgot");
  };

  const handleResed = () => {
    if (email) handleSendMail(email);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[53.57%_1fr]">
      <AuthSidePanel />
      <div className="flex items-center justify-center p-5">
        <div className="mx-auto w-full max-w-[417px] shrink-0">
          <Typography variant="h1" className="text-center">
            Forgot password
          </Typography>
          {step === "forgot" && (
            <Typography variant="content" className="mt-6 mb-8 text-center">
              Seems you forget your password, we’ll send a recovery <br /> code
              to your email
            </Typography>
          )}
          {step === "verify" && (
            <div className="bg-warning-light mt-8 mb-6 flex items-center gap-x-3 rounded-[10px] py-4 pr-7 pl-4">
              <span>
                <InfoIcon />
              </span>
              <Typography variant="xs" className="text-warning leading-[160%]">
                We have send you 6 digits verification code to <br /> your
                email. Please kindly check
              </Typography>
            </div>
          )}
          <div className="mx-auto w-full max-w-[358px]">
            {step === "forgot" && (
              <ForgotPasswordForm
                handleSendMail={handleSendMail}
                handleNext={handleNextStep}
              />
            )}
            {step === "verify" && email && (
              <VerifyCodeForm
                handleNext={handleNextStep}
                email={email}
                handleResend={handleResed}
                handleBack={handleBack}
              />
            )}
            {step === "reset" && email && (
              <ResetPasswordForm handleNext={handleNextStep} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
