"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/dist/server/api-utils";
import { signInByGithub, SignUpByGoogle } from "../LoginBySocialmedia";

const SignUpPage = () => {
  const [validation, setValidation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidation("");

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!name) {
      setValidation("নাম লিখুন");
      return;
    }

    if (!emailRegex.test(email)) {
      setValidation("সঠিক ইমেইল ঠিকানা লিখুন");
      return;
    }

    if (!passwordRegex.test(password)) {
      setValidation(
        "পাসওয়ার্ডে কমপক্ষে ৮টি অক্ষর, একটি uppercase, lowercase, number ও special character থাকতে হবে",
      );
      return;
    }

    if (password !== confirmPassword) {
      setValidation("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/login",
      });

      if (error) {
        toast.error(`${error?.message}`);
        return;
      }
      if (data) {
        toast.success("সাইন-আপ সম্পন্ন হয়েছে");
        window.location.href = "/login";
      }
    } catch (error) {
      toast.success("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] flex justify-center items-center bg-[#E1E8E1] px-4 py-8">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center">অ্যাকাউন্ট তৈরি করুন</h1>

        <p className="text-base mt-3 text-center mb-5">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <form
          onSubmit={handleSignUpForm}
          className="bg-white p-6 sm:p-10 w-full rounded-lg border border-gray-300"
        >
          <div className="flex flex-col mb-5">
            <label htmlFor="name" className="text-lg mb-1">
              নাম
            </label>
            <input
              className="border border-gray-400 rounded-md p-2 outline-0"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              name="name"
              id="name"
              autoComplete="name"
              required
            />
          </div>

          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="text-lg mb-1">
              ইমেইল
            </label>
            <input
              className="border border-gray-400 rounded-md p-2 outline-0"
              type="email"
              placeholder="you@example.com"
              name="email"
              id="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="flex flex-col mb-5">
            <label htmlFor="password" className="text-lg mb-1">
              পাসওয়ার্ড
            </label>
            <input
              className="border border-gray-400 rounded-md p-2 outline-0"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              name="password"
              id="password"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="flex flex-col mb-5">
            <label htmlFor="confirmPassword" className="text-lg mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              className="border border-gray-400 rounded-md p-2 outline-0"
              type="password"
              placeholder="আবার লিখুন"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-800 text-base font-medium block w-full mb-5 text-white rounded-md px-5 py-2 shadow-md shadow-green-500 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>

          {validation && (
            <p role="alert" className="text-sm text-red-700 text-center mb-3">
              {validation}
            </p>
          )}

          <p className="text-center relative my-5">
            অথবা
            <span className="absolute w-[38%] top-1/2 h-0.5 bg-black left-0" />
            <span className="absolute w-[38%] top-1/2 h-0.5 bg-black right-0" />
          </p>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <button
              onClick={() => SignUpByGoogle()}
              type="button"
              className="border border-gray-300 cursor-pointer rounded-md text-sm sm:text-base flex items-center justify-center py-2 px-3"
            >
              <Image
                className="mr-2"
                src="/google.png"
                width={20}
                height={20}
                alt="Google"
              />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              onClick={() => signInByGithub()}
              type="button"
              className="border border-gray-300 cursor-pointer rounded-md text-sm sm:text-base flex items-center justify-center py-2 px-3"
            >
              <Image
                className="mr-2"
                src="/github.png"
                width={20}
                height={20}
                alt="GitHub"
              />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="text-center text-base mt-5">
            অ্যাকাউন্ট আছে?{" "}
            <Link className="text-green-800" href="/login">
              সাইন ইন করুন
            </Link>
          </p>
        </form>

        <Link href="/" className="text-base block text-center mt-4">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
