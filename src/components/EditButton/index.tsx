import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState } from "react";

interface EditButtonProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export default function EditButton({
  onMouseEnter,
  onMouseLeave,
  className = "",
  ...restProps
}: EditButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (onMouseEnter) {
      onMouseEnter();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute right-0 ${className}`}
      {...restProps}
    >
      {isHovering ? (
        <HiOutlinePencilAlt size={24} className="cursor-pointer" />
      ) : null}
    </button>
  );
}
