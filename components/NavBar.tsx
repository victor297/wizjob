"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  const isLoggedIn = false;
  return (
    <Disclosure as="nav" className="border-b border-gray-200  bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
            <div className="relative flex h-16 items-center">
              {/* MOBILE MENU BUTTON */}
              <div className="absolute left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <FiX className="h-6 w-6" />
                  ) : (
                    <FiMenu className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>

              {/* LEFT LINKS (DESKTOP) */}
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:gap-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-slate-900 hover:text-sky-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* CENTER LOGO (ALWAYS CENTERED) */}
              <div className="absolute left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo.svg"
                    alt="WizJobAI"
                    className="h-7 w-auto"
                    width={10}
                    height={5}
                  />
                  <span className="text-2xl font-semibold text-slate-900">
                    WizJobAI
                  </span>
                </div>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="ml-auto flex items-center">
                {!isLoggedIn ? (
                  <div className="hidden sm:flex items-center gap-3">
                    <Link href={"/login"}>
                      <button className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-100">
                        Sign in
                      </button>
                    </Link>
                    <Link href={"/signup"}>
                      <button className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-sky-600">
                        Sign up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200">
                    <FiUser className="h-5 w-5 text-slate-700" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE MENU */}
          <DisclosurePanel className="sm:hidden border-t border-gray-200 bg-white">
            <div className="space-y-1 px-4 py-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-slate-900 hover:bg-slate-100"
                >
                  {item.name}
                </a>
              ))}

              {!isLoggedIn && (
                <div className="mt-4 space-y-2">
                  <button className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100">
                    Sign in
                  </button>
                  <button className="w-full rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600">
                    Sign up
                  </button>
                </div>
              )}

              {isLoggedIn && (
                <button className="mt-3 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100">
                  <FiUser className="h-5 w-5" />
                  Profile
                </button>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
