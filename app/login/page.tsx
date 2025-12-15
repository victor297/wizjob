// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGreenhouse } from "react-icons/si";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";

// Separate schemas for each step
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function LoginFlow() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const route = useRouter();
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onEmailSubmit = (data: EmailFormData) => {
    setEmail(data.email);
    setStep("password");
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log("Login:", { email, password: data.password });
    route.push("/job-profile");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content - Tight & Centered */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* EMAIL STEP */}
          {step === "email" && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  Sign in to WizJobAI
                </h1>
                <p className="text-sm text-gray-600">
                  New or returning user? Authorize right here.
                </p>
              </div>

              {/* OAuth Buttons - Stacked on small screens */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-sm mx-auto">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border text-black border-gray-300 rounded-full hover:bg-gray-50 text-sm font-medium"
                >
                  <FaLinkedinIn className="text-[#0A66C2] text-lg" /> LinkedIn
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border text-black border-gray-300 rounded-full hover:bg-gray-50 text-sm font-medium"
                >
                  <FcGoogle className="text-lg" /> Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border text-black border-gray-300 rounded-full hover:bg-gray-50 text-sm font-medium"
                >
                  <SiGreenhouse className="text-green-600 text-lg" /> Greenhouse
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-blue-50 text-gray-500">
                    Or better yet login with...
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleEmailSubmit(onEmailSubmit)}
                className="space-y-5 justify-center flex flex-col"
              >
                <Input
                  label="Email Address"
                  placeholder="joekent@gmail.com"
                  register={registerEmail("email")}
                  error={emailErrors.email}
                  id="email"
                />

                <p className="text-center text-xs text-gray-600">
                  By continuing, you agree to the{" "}
                  <a href="#" className="text-[#0EA5E9]">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#0EA5E9]">
                    Privacy Policy
                  </a>
                </p>

                <button
                  type="submit"
                  className="w-full cursor-pointer max-w-sm mx-auto py-3.5 bg-[#0EA5E9] text-white font-medium rounded-full hover:shadow-md transition text-sm"
                >
                  Continue with email
                </button>
              </form>

              <p className="text-center text-sm text-gray-600">
                {` Don't have an account?`}
                <a
                  href="#"
                  className="text-[#0EA5E9] font-medium hover:underline"
                >
                  Create one
                </a>
              </p>
            </div>
          )}

          {/* PASSWORD STEP */}
          {step === "password" && (
            <div className="space-y-2">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  Enter Password
                </h1>
                <p className="text-sm text-gray-600">
                  New or returning user? Authorize right here.
                </p>
              </div>

              <div className="text-center py-4  rounded-2xl">
                <p className="text-sm font-medium text-gray-800">{email}</p>
              </div>

              <form
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                <Input
                  label="Enter Password"
                  type="password"
                  placeholder="********"
                  register={registerPassword("password")}
                  error={passwordErrors.password}
                  id="password"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="flex-1 cursor-pointer flex items-center justify-center text-black gap-2 py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50"
                  >
                    <HiArrowLeft /> Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 bg-[#0EA5E9] text-white font-medium rounded-full hover:shadow-md text-sm"
                  >
                    Continue
                  </button>
                </div>
              </form>

              <div className="text-center">
                <Link
                  href="forgot-password"
                  className="text-sm text-[#0EA5E9] font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer - Minimal */}
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
