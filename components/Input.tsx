import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
}

export function Input({
  label,
  type = "text",
  placeholder,
  register,
  error,
  id,
  labelPosition = "border",
  theme = "white",
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const bgColorClass = theme === "dark" ? "bg-black" : "bg-white";

  const labelClasses =
    labelPosition === "border"
      ? `
        absolute top-0 left-5
        -translate-y-1/2
        px-2
        text-sm font-medium text-[#0EA5E9]
        ${bgColorClass}
        z-10
        pointer-events-none
      `
      : `
        mb-1.5 block text-sm font-medium
        ${theme === "dark" ? "text-slate-200" : "text-slate-700"}
      `;

  const inputClasses = `
    w-full rounded-full border border-gray-300
    px-5 py-3 pr-12
    text-sm placeholder-gray-400
    focus:border-[#0EA5E9] focus:outline-none
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
        <input
          id={id}
          {...register}
          type={inputType}
          placeholder={placeholder}
          className={inputClasses}
        />

        {/* Password toggle */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error.message || "This field is required"}
        </p>
      )}
    </div>
  );
}
