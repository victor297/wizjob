import { UseFormRegister, FieldError, FieldValues } from "react-hook-form";

export type { UseFormRegister, FieldError };

// A generic type for form values (can be extended if needed)
export interface FormValues extends FieldValues {
  [key: string]: unknown; // Changed 'any' to 'unknown'
}

// Common props for all inputs
export interface BaseInputProps {
  label: string;
  id: string;
  error?: FieldError;
  theme?: "dark" | "light";
}

// Props for inputs that use React Hook Form's register
export interface RHFInputProps extends BaseInputProps {
  register: UseFormRegister<FormValues>;
  placeholder?: string;
  labelPosition?: "border" | "top";
}

// Option structure for Select and Radio components
export interface Option {
  value: string;
  label: string;
}
