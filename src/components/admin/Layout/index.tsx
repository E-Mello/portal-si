import Navbar from "~/components/admin/Navbar";
import ProtectedRoute from "~/components/ProtectedRoute";
import React from "react";
import type { ReactNode } from "react";
import { isActiveNavAtom } from "~/atoms/activeNavAtom";
import { useAtom } from "jotai";

export default function Layout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: unknown;
}): JSX.Element {
  const [isActiveNav] = useAtom(isActiveNavAtom);
  return (
    <ProtectedRoute>
      <section className="bg-zinc-900 text-gray-300">
        <Navbar />
        <section
          className={`bg-zinc-800 ${isActiveNav ? "ml-[15vw]" : "ml-[4vw]"}`}
        >
          <main
            className={`flex min-h-screen ${
              isActiveNav ? "w-[85vw]" : "w-[96vw]"
            } `}
            {...props}
          >
            {children}
          </main>
        </section>
      </section>
    </ProtectedRoute>
  );
}
