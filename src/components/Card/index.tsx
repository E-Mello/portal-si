import React, { useCallback } from "react";

import Link from "next/link";
import { random } from "lodash";

interface CardProps {
  name: string;
  Link: string;
  Info: string;
}

export default function Card(props: CardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const randomColor = useCallback(
    () => `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
    []
  );

  return (
    <div className="min-screen flex w-[10vw] flex-col justify-center whitespace-pre rounded-xl bg-zinc-800">
      <div
        className={`group h-[20vh] w-[10vw] [perspective:1000px]`}
        onMouseLeave={() => setIsFlipped(false)}
        onMouseOver={() => setIsFlipped(true)}
      >
        <div className="relative h-full w-full rounded-2xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="fixed inset-0">
            <div
              className={`h-full w-full rounded-xl object-cover shadow-xl ${
                isFlipped ? "" : "shadow-black/40"
              }`}
              style={{ backgroundColor: randomColor() }}
            />
          </div>
          <div
            className={`hover:[transform:rotateY(180deg) fixed inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 ${
              isFlipped
                ? "rotateY(180deg) [backface-visibility:hidden]"
                : "rotateY(0deg) [backface-visibility:visible]"
            }`}
          >
            <div className="flex min-h-full flex-col items-center justify-center gap-4">
              <h1
                className={`${
                  isFlipped ? "hidden" : "whitespace-pre-line text-xl font-bold"
                }`}
              >
                {props.name}
              </h1>
              <div
                className={`${
                  isFlipped
                    ? "rotateY(0deg)"
                    : "rotateY(180deg) hidden [backface-visibility:hidden]"
                }`}
                style={{ transform: "rotateY(180deg)" }}
              >
                <p className={`whitespace-pre-line text-xl`}>{props.Info}</p>
              </div>
              <Link href={props.Link} target="_blank">
                <button
                  className={`${
                    isFlipped
                      ? "mt-2 rounded-md bg-neutral-800 px-2 py-1 text-sm hover:bg-neutral-900 "
                      : "hidden"
                  }`}
                  style={{ transform: "rotateY(180deg)" }}
                >
                  Acessar Página
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
