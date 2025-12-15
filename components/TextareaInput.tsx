import React from "react";
import { RHFInputProps } from "./types";

interface TextareaProps extends RHFInputProps {
  rows?: number;
}

export const TextareaInput: React.FC<TextareaProps> = ({
  label,
  placeholder,
  register,
  error,
  id,
  rows = 4,
  labelPosition = "top",
  theme = "dark",
}) => {
  const registerField = register(id);
  const bgColorClass = theme === "dark" ? "bg-black" : "bg-white";

  const labelClasses =
    labelPosition === "border"
      ? `
          absolute top-0 left-5 
          transform -translate-y-1/2
          px-2 
          text-sm font-medium text-[#0EA5E9] 
          ${bgColorClass} z-10 
          pointer-events-none
        `
      : `
          mb-1.5 block text-sm font-medium 
          ${theme === "dark" ? "text-slate-200" : "text-slate-700"}
        `;

  const textareaClasses = `
    w-full border border-gray-300 rounded-xl px-5 py-3 
    text-sm placeholder-gray-400 
    focus:border-[#0EA5E9] focus:outline-none
    ${theme === "dark" ? "bg-black text-white" : "bg-white text-slate-800"} 
    resize-none
  `;

  const wrapperClass = labelPosition === "border" ? "relative mb-6" : "mb-4";

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}

      <textarea
        id={id}
        {...registerField}
        placeholder={placeholder}
        className={textareaClasses}
        rows={rows}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error.message || "This field is required"}
        </p>
      )}
    </div>
  );
};
