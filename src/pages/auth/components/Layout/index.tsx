import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Navbar } from "../Navbar";
import ProtectedRoute from "~/components/ProtectedRoute";
import React from "react";
import type { ReactNode } from "react";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/utils/cn";
import { isActiveNavAtom } from "~/atoms/activeNavAtom";
import { useAtom } from "jotai";

export default function Layout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}): JSX.Element {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);
  return (
    <ProtectedRoute>
      <div className="flex ">
        <Navbar />
        <section className={`${isActiveNav ? "ml-[15vw]" : "ml-[4vw]"}`}>
          <div
            className={`flex min-h-screen ${
              isActiveNav ? "w-[85vw]" : "w-[96vw]"
            } `}
            {...props}
          >
            {children}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
