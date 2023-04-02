import { ImgHTMLAttributes } from "react";
import styles from "./LogoUnemat.module.css";

// //Ex:
// const user = { name: "Mello"}
// const {name} = user;

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

// Destructuring
export function LogoUnemat({ hasBorder = true, ...props }: AvatarProps) {
  // const hasBorder = props.hasBorder !== false;

  return (
    <img
      className={hasBorder ? styles.logoWithBorder : styles.logo}
      {...props}
    />
  );
}
