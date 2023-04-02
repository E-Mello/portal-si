import { Footer } from "../Footer";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import type { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { SideNav } from "../SideNav";
import { cn } from "../../utils/cn";
import { isActiveNavAtom } from "../../atoms/activeNavAtom";
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
    <>
      <SideNav />
      <div className={`${isActiveNav ? "ml-[15vw]" : "ml-[4vw]"}`}>
        <main className={`flex h-full w-full`} {...props}>
          {children}
        </main>
        <Separator
          className={cn("bg-gradient-to-b from-[#0e0e0f00] to-zinc-900")}
        />
        <Footer />
      </div>
    </>
  );
}
