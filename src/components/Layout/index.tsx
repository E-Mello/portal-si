import React from "react";
import type { ReactNode } from "react";
import { SideNav } from "../SideNav";
import { isActiveNavAtom } from "../../atoms/activeNavAtom";
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
    <section className="bg-zinc-900 text-gray-300">
      <SideNav />
      <section
        className={`bg-zinc-800 ${isActiveNav ? "ml-[15vw]" : "ml-[4vw]"}`}
      >
        <main className={`flex min-h-screen`} {...props}>
          {children}
        </main>
      </section>
    </section>
  );
}
