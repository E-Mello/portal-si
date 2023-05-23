import React, { useCallback } from "react";

import Link from "next/link";
import { random } from "lodash";
import tw from "twin.macro";

interface CardProps {
  name: string;
  Link: string;
  Info: string;
}

export default function Card(props: CardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  //precisa de callback para nao ficar a cor toda hora
  const randomColor = useCallback(
    () => `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
    []
  );

  const handleMouseLeave = () => {
    if (window.innerWidth >= 640) {
      setIsFlipped(false);
    }
  };

  const handleMouseOver = () => {
    if (window.innerWidth >= 640) {
      setIsFlipped(true);
    }
  };

  return (
    <div className=" flex h-full w-full flex-col  justify-center whitespace-pre bg-zinc-800 max-sm:h-24 max-sm:w-24 max-sm:space-x-10">
      <div
        className={`  [perspective-origin:50% 50%] [transition:transform 0.05s ease-in-out] [transform-origin:50% 50%] group h-48 w-48 [backface-visibility:hidden]  [perspective:62.5rem] [transform-style:preserve-3d] max-sm:h-24 max-sm:w-24 `}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
      >
        <div className="max-sm:shadown-none h-full w-full rounded-2xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] max-sm:flex max-sm:w-24 ">
          <div className="fixed inset-0">
            <div
              className={` max-sm:shadown-none h-full w-full rounded-xl object-cover shadow-xl ${
                isFlipped ? "" : "shadow-black/40 "
              } `}
              style={{ backgroundColor: randomColor() }}
            />
          </div>
          <div
            className={`hover:[transform:rotateY(180deg) fixed inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 max-sm:transform-none max-sm:bg-black/60 max-sm:p-1 max-sm:hover:normal-case ${
              isFlipped
                ? "rotateY(180deg) max-sm:rotateY(0deg) max-sm:backface-visibility:hidden [backface-visibility:visible]"
                : "rotateY(0deg) [backface-visibility:hidden]"
            }`}
          >
            <div
              className={`flex h-full w-full flex-col items-center justify-center   max-sm:w-fit max-sm:justify-between ${
                isFlipped
                  ? "rotateY(180deg) [backface-visibility:visible]"
                  : "rotateY(0deg) [backface-visibility:hidden]"
              }}`}
            >
              <h1
                className={`max-sm:text-xs ${
                  isFlipped ? "hidden" : "whitespace-pre-line text-lg font-bold"
                }`}
              >
                {props.name}
              </h1>
              <div
                className={` ${
                  isFlipped
                    ? " [transform:rotateY(180deg)]"
                    : "rotateY(180deg) hidden [backface-visibility:hidden]"
                }`}
              >
                <p className={` whitespace-break-spaces `}>{props.Info}</p>
              </div>

              <Link href={`/` + props.Link} target="_blank">
                <button
                  className={`[transition:transform 1s ease-in-out] rounded-md ${
                    isFlipped
                      ? "[backface-visibility: visible]  bg-neutral-800 px-2 py-1 text-sm [transform:rotateY(180deg)] hover:bg-neutral-900 "
                      : "hidden max-sm:flex max-sm:bg-white max-sm:p-[0.12rem] max-sm:text-[.70rem] max-sm:text-black"
                  }`}
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
