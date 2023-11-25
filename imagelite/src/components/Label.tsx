import React from "react";

interface LabelProps {
  style?: string;
  htmlFor?: string;
  children?: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  style, htmlFor, children
}: LabelProps) => {
  return (
    <label
      className={`${style} block text-sm font-medium leading-6 text-gray-700`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}
