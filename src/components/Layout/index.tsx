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
    <section className="bg-zinc-900">
      <SideNav />
      <section className={`${isActiveNav ? "ml-[15vw]" : "ml-[4vw]"}`}>
        <main className={`flex h-full w-full text-gray-300`} {...props}>
          {children}
        </main>
      </section>
    </section>
  );
}
