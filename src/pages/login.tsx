import { useEffect, useState } from "react";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useRouter } from "next/router";

export default function Login() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-slate-500 hover:bg-slate-400 text-sm normal-case ",
          },
          baseTheme: dark,
          layout: {},
        }}
        afterSignInUrl={"/dashboard"}
        signUpUrl="/"
      />
    </div>
  );
}
