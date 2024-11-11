import React from "react";

export default function Mainbutn({
  isloading,
  children,
  pading,
  bg,
  hvr,
  transiton,
  border,
  text,
  disabled,
  onClick,
}: {
  isloading?: any;
  children: React.ReactNode;
  pading?: string;
  bg?: string;
  hvr?: string;
  transiton?: string;
  border?: string;
  text?: string;
  disabled?: any,
  onClick?: () => void;
}) {
  console.log(pading);
  return (
    <button
      className={` rounded-lg ${pading} ${bg} ${hvr} ${text} ${border} transition   `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
