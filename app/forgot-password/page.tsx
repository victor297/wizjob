// src/app/forgot-password/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Input } from "@/components/Input";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "joekent@gmail.com",
    },
  });

  const email = watch("email");

  const onSubmit = (data: FormData) => {
    console.log("Password reset requested for:", data.email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 ">
        <div className="w-full max-w-xl">
          <div className="space-y-8 text-center">
            {/* Title */}

            {/* Success State (after submit) */}
            {submitted ? (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Check your email
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    We sent a password reset link to
                    <br />
                    <span className="font-medium">{email}</span>
                  </p>
                </div>
                <Link href="/login" className="cursor-pointer">
                  <p className="w-full mx-auto max-w-xs py-3.5 bg-[#0EA5E9] text-white font-medium rounded-full hover:shadow-md transition text-sm">
                    Continue
                  </p>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Forgot password
                  </h1>
                  <p className="text-sm text-gray-600">
                    {`                If you've forgotten your password, enter your email to reset it.
`}{" "}
                  </p>
                </div>
                {/* Email Input with Floating Label */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                  <Input
                    label="Email Address"
                    placeholder="joekent@gmail.com"
                    register={register("email")}
                    error={!!errors.email}
                    id="email"
                  />

                  <button
                    type="submit"
                    className="w-full cursor-pointer max-w-xs py-3.5 bg-[#0EA5E9] text-white font-medium rounded-full hover:shadow-md transition text-sm"
                  >
                    Continue
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 border-t border-gray-200 bg-white/70 backdrop-blur-sm text-xs text-gray-600">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2025 FundnAI. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-indigo-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-600">
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
