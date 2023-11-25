import React from "react";

interface InputTextProps {
  id?: string;
  value?: string;
  style?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const InputText: React.FC<InputTextProps> = ({
  style, ...rest
}: InputTextProps) => {
  return (
    <input
      type="text"
      className={`${style} border px-3 py-2 rounded-lg text-gray-900`}
      {...rest}
    />
  )
}
