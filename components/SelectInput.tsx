import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type LabelPosition = "border" | "top";
type Theme = "dark" | "white";

interface InputProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: any;
  id: string;
  labelPosition?: LabelPosition;
  theme?: Theme;
  options: any;
}

export const SelectInput = ({
  label,
  options,
  register,
  error,
  id,
  labelPosition = "top",
  theme = "white",
}: InputProps) => {
  const bgColorClass = theme === "dark" ? "bg-black" : "bg-white";

  // Label classes (simplified)
  const labelClasses =
    labelPosition === "border"
      ? `absolute top-0 left-5 transform -translate-y-1/2 px-2 text-sm font-medium text-[#0EA5E9] ${bgColorClass} z-10 pointer-events-none`
      : `mb-1.5 block text-sm font-medium ${
          theme === "dark" ? "text-slate-200" : "text-slate-700"
        }`;

  // Select classes
  const selectClasses = `
    w-full border border-gray-300 rounded-full px-5 py-3 
    text-sm 
    focus:border-[#0EA5E9] focus:outline-none appearance-none cursor-pointer
    ${theme === "dark" ? "bg-black text-white" : "bg-white text-slate-800"}
  `;

  const wrapperClass = labelPosition === "border" ? "relative mb-6" : "mb-4";

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          {...register}
          className={selectClasses}
          defaultValue="" // Set default value for the placeholder
        >
          <option value="" disabled hidden>
            {label ? `Select ${label}` : "Select an option"}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom arrow for appearance:none */}
        <div
          className={`
          absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none
          ${theme === "dark" ? "text-white" : "text-gray-700"}
        `}
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error.message || "This field is required"}
        </p>
      )}
    </div>
  );
};
