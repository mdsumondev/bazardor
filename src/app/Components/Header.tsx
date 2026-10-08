"use client";

import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { CategoryType } from "../Type/Type";
import {
  Bars3BottomLeftIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

const Header = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  const currentTime = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  useEffect(() => {
    const categoryData = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories",
        );

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const categories = await res.json();

        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };

    categoryData();
  }, []);

  const navLinks = (
    <>
      <Suspense fallback="<h2> Loading </h2>">
        {categories.map((category, index) => {
          return (
            <li key={index}>
              <Link className="text-base" href={`/category/${category.slug}`}>
                {category.nameBn}
              </Link>
            </li>
          );
        })}
      </Suspense>
    </>
  );

  return (
    <div className="py-5">
      <div className="container mx-auto flex justify-between items-center px-5">
        <div className="logo">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" width={50} height={50} alt="Bazardor Logo" />
            <div>
              <p className="lg:text-3xl text-xl font-bold">বাজার দর</p>
              <p className="text-sm">{currentTime}</p>
            </div>
          </Link>
        </div>

        <div className="action flex items-center">
          <Link
            href=""
            className="px-5 py-2 text-base font-medium lg:inline hidden"
          >
            সাইন ইন
          </Link>

          <Link href="" className="lg:inline hidden">
            <button
              className="bg-green-800 text-base font-medium text-white rounded-md px-5 py-2 shadow-md
              shadow-green-500 cursor-pointer"
            >
              সাইন আপ
            </button>
          </Link>

          <div className="lg:hidden" onClick={handleMobileMenu}>
            {open ? (
              <XMarkIcon className="size-8 " />
            ) : (
              <Bars3Icon className="size-8 " />
            )}
          </div>
        </div>
      </div>

      <ul
        className={`container mx-auto flex flex-col lg:flex-row lg:items-center gap-5 transition-all ease-in-out duration-100  mt-10 px-10 lg:static absolute w-full
           bg-white ${open ? "left-0" : "-left-50"}`}
      >
        {navLinks}

        <div className="lg:hidden flex flex-col">
          <Link href="" className=" py-2 text-base font-medium">
            সাইন ইন
          </Link>

          <Link href="">
            <button
              className="bg-green-800 text-base font-medium text-white rounded-md px-5 py-2 shadow-md
              shadow-green-500 cursor-pointer"
            >
              সাইন আপ
            </button>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Header;
