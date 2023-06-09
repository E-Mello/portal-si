import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Login() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-zinc-800">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-slate-500 hover:bg-slate-400 text-sm normal-case ",
          },
          baseTheme: dark,
          layout: {},
        }}
        afterSignInUrl="/"
      />
    </div>
  );
}
