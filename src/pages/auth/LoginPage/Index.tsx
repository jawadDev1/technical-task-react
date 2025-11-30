import { AuthSidePanel, LoginForm } from "@/components/auth";
import { Typography } from "@/components/common";

const LoginPage = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[53.57%_1fr]">
      <AuthSidePanel />
      <div className="flex items-center justify-center p-5">
        <div className="mx-auto w-full max-w-[358px] shrink-0">
          <Typography variant="h1" className="mb-16 text-center">
            Welcome Back
          </Typography>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
