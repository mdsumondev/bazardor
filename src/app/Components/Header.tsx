"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";

import { CategoryType } from "../Type/Type";
import { useSession } from "@/lib/auth-client";
import Profile from "./Profile";

const Header = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState("");

  const { data: session } = useSession();
  const pathname = usePathname();

  const handleMobileMenu = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setCurrentTime(currentDate);
  }, []);

  // Fetch categories
  useEffect(() => {
    const categoryData = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
        );

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data: CategoryType[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    categoryData();
  }, []);

  const navLinks = categories.map((category) => {
    const href = `/category/${category.slug}`;
    const isActive = pathname === href;

    return (
      <li key={category.slug}>
        <Link
          href={href}
          onClick={() => setOpen(false)}
          className={`text-base transition-colors duration-200 ${
            isActive
              ? "font-bold text-green-700"
              : "text-black hover:text-green-600"
          }`}
        >
          {category.nameBn}
        </Link>
      </li>
    );
  });

  return (
    <header className="relative bg-white py-5">
      <div className="container mx-auto flex items-center justify-between px-5">
        <div className="logo">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" width={50} height={50} alt="Bazardor Logo" />

            <div>
              <p className="text-xl font-bold lg:text-3xl">বাজার দর</p>
              <p className="text-sm">{currentTime}</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center">
          {session?.user ? (
            <Profile user={session.user} />
          ) : (
            <>
              <div className="hidden items-center lg:flex">
                <Link
                  href="/login"
                  className="px-5 py-2 text-base font-medium hover:text-green-700"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/create-account"
                  className="cursor-pointer rounded-md bg-green-800 px-5 py-2 text-base font-medium text-white shadow-md shadow-green-500"
                >
                  সাইন আপ
                </Link>
              </div>

              <button
                type="button"
                onClick={handleMobileMenu}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="lg:hidden"
              >
                {open ? (
                  <XMarkIcon className="size-8" />
                ) : (
                  <Bars3Icon className="size-8" />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <nav>
        <ul
          className={`container mx-auto mt-10 flex w-full flex-col gap-5 bg-white px-10 transition-all duration-200 ease-in-out lg:static lg:flex-row lg:items-center ${
            open
              ? "absolute left-0 z-50 translate-x-0 pb-6"
              : "absolute -left-full lg:left-auto"
          }`}
        >
          {navLinks}

          {/* Mobile authentication links */}
          {!session?.user && (
            <li className="flex flex-col gap-3 lg:hidden">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium hover:text-green-700"
              >
                সাইন ইন
              </Link>

              <Link
                href="/create-account"
                onClick={() => setOpen(false)}
                className="w-fit cursor-pointer rounded-md bg-green-800 px-5 py-2 text-base font-medium text-white shadow-md shadow-green-500"
              >
                সাইন আপ
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
