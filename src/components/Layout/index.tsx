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
    <section className="h-full bg-zinc-900 text-gray-300 max-sm:block">
      <SideNav />
      <section
        className={`z-50 bg-zinc-800 ${
          isActiveNav
            ? "max-sm:w-full 2xl:ml-72"
            : "max-sm:ml-14 2xl:ml-[4.8rem]"
        }`}
      >
        <main className={`flex max-sm:z-0`} {...props}>
          {children}
        </main>
      </section>
    </section>
  );
}
