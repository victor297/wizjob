// src/app/signup/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGreenhouse } from "react-icons/si";
import { HiPlay } from "react-icons/hi";
import Link from "next/link";
import { Input } from "@/components/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    fullName: z.string().min(2, "Please enter a valid name"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be same with Password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirm Password must be same with Password",
  });

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push("job-profile");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* MAIN */}
      <main className="flex-1 flex justify-center px-4 pt-6">
        <div className="w-full mx-16 max-w-6xl">
          {/* INTRO CARD */}
          <div className="mb-6 rounded-2xl bg-[#F7F9FC] px-5 py-4 flex flex-col sm:flex-row  gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="WizJobAI"
                  className="h-7 w-auto"
                  width={10}
                  height={5}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Introducing WizJobAI
                </p>
                <p className="text-xs text-slate-500">
                  See how wizbot help you Auto-apply to jobs on your behalf.
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-full bg-[#0EA5E9] px-4 py-3 text-xs font-medium text-white hover:bg-[#0284C7]">
              <HiPlay className="text-sm" />
              Watch 1 min demo
            </button>
          </div>

          {/* TITLE */}
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Enter your details
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              You will need to confirm this email later
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 mx-auto max-w-2xl"
          >
            <Input
              label="Full Name"
              placeholder="Joe Kent"
              register={register("fullName")}
              error={errors.fullName}
              id="fullName"
            />

            <Input
              label="Email Address"
              placeholder="joekent@gmail.com"
              register={register("email")}
              error={errors.email}
              id="email"
            />

            <Input
              label="Enter Password"
              type="password"
              placeholder="********"
              register={register("password")}
              error={errors.password}
              id="password"
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              register={register("confirmPassword")}
              id="confirmPassword"
              error={errors.confirmPassword}
            />

            <button
              type="submit"
              className="mt-2 w-full cursor-pointer rounded-full bg-[#0EA5E9] py-3.5 text-sm font-medium text-white hover:bg-[#0284C7]"
            >
              Create Account
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative my-8 mx-auto max-w-xl">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          {/* OAUTH */}
          <div className="flex gap-3 mx-auto max-w-xl">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 py-3 text-sm font-medium hover:bg-gray-50">
              <FaLinkedinIn className="text-[#0A66C2]" />
              Linkedin
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 py-3 text-sm font-medium hover:bg-gray-50">
              <FcGoogle />
              Google
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 py-3 text-sm font-medium hover:bg-gray-50">
              <SiGreenhouse className="text-green-600" />
              Greenhouse
            </button>
          </div>

          {/* LOGIN */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Oh, I have an account?{" "}
            <Link
              href="/login"
              className="text-[#0EA5E9] font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-gray-200 py-6 text-xs text-gray-500">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2025 FundnAI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#0EA5E9]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#0EA5E9]">
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
