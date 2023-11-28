import React from "react";

interface InputTextProps {
  id?: string;
  type?: string;
  value?: string;
  style?: string;
  placeholder?: string;
  autoComplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const InputText: React.FC<InputTextProps> = ({
  type = "text", style, ...rest
}: InputTextProps) => {
  return (
    <input
      type={type}
      className={`${style} border px-3 py-2 rounded-lg text-gray-900`}
      {...rest}
    />
  )
}
