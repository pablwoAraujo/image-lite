import React from "react";

interface InputImageProps {
  id?: string;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export const InputImage: React.FC<InputImageProps> = ({
  id, onFileUpload
}: InputImageProps) => {
  return (
    <div className="mt-4 flex text-sm leading-6 text-gray-600">
      <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 justify-center">
        <span>Click to upload</span>
        <input id={id} type="file" accept="image/*" className="sr-only"
          onChange={e => {
            e.preventDefault();
            onFileUpload(e);
          }}
        />
      </label>
    </div>
  )
}
