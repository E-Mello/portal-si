import Link from "next/link";
import React from "react";
import { isActiveNavAtom } from "../../atoms/activeNavAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";

interface Menu {
  name: string;
  linkAuthenticated: string;
  linkPublic: string;
  icon: any;
  haveOptions: boolean;
  margin?: boolean;
  footer?: boolean;
}

interface AuthMenuItemProps {
  i: number;
  menu: Menu;
  delay: number;
}

export function AuthMenuItem({ menu, delay, i }: AuthMenuItemProps) {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);
  const { user } = useUser();
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
   void router.push(user ? menu.linkAuthenticated : menu.linkPublic);
  };

  return (
    <Link href={user ? menu.linkAuthenticated : menu.linkPublic}>
      <span
        onClick={handleClick}
        className={`${
          (menu?.margin && "mt-[5vh]") || (menu?.footer && "mt-[5vh]")
        } group flex items-center gap-4  rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
      >
        <div>{React.createElement(menu.icon, { size: "20" })}</div>
        <h2
          style={{
            transitionDelay: `${i * 0.05}s`,
          }}
          className={`whitespace-pre duration-500 ${
            !isActiveNav && "translate-x-[7vw] overflow-hidden opacity-0"
          }`}
        >
          {menu?.name}
        </h2>
        <span
          className={` ${
            isActiveNav && "hidden"
          } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
                 duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
        >
          {menu?.name}
        </span>
      </span>
    </Link>
  );
}
