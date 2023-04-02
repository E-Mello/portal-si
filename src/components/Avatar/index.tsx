import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

// //Ex:
// const user = { name: "Mello"}
// const {name} = user;

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
  src: string;
  width?: number;
  height?: number;
  placeholder?: "blur" | "empty" | undefined;
}

// Destructuring
export function Avatar({ src, hasBorder = true, ...props }: AvatarProps) {
  // const hasBorder = props.hasBorder !== false;

  return (
    <Image
      src={src}
      className={`h-[6.4vh] w-[3vw] flex rounded-full ${
        hasBorder ? "border-2 border-gray-600" : ""
      } `}
      {...props}
      alt="Profile Picture"
      width={props.width}
      height={props.height}
    />
  );
}
