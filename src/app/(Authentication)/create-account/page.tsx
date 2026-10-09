import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="w-screen h-[calc(100vh-160px)] flex justify-center items-center bg-[#E1E8E1]">
      <div>
        <h1 className="text-3xl font-bold text-center">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-base mt-3 text-center mb-5">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <form
          action=""
          className="bg-white p-10 max-w-5xl rounded-lg border border-gray-300"
        >
          <div className="flex flex-col mb-5">
            <label htmlFor="name" className="text-lg mb-1">
              নাম
            </label>
            <input
              className="border border-gray-400 rounded-md p-1 outline-0"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              name="name"
              id="name"
            />
          </div>

          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="text-lg mb-1">
              ইমেইল
            </label>
            <input
              className="border border-gray-400 rounded-md p-1 outline-0"
              type="email"
              placeholder="you@example.com"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="password" className="text-lg mb-1">
              পাসওয়ার্ড
            </label>
            <input
              className="border border-gray-400 rounded-md p-1 outline-0"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              name="password"
              id="password"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="confirmPassword" className="text-lg mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              className="border border-gray-400 rounded-md p-1 outline-0"
              type="password"
              placeholder="আবার লিখুন"
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <button
            type="submit"
            className="bg-green-800 text-base font-medium block w-full mb-5 text-white rounded-md px-5 py-2 shadow-md
              shadow-green-500 cursor-pointer"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
          <p className="text-center relative my-3">
            অথবা
            <span className="absolute w-3/7 top-[50%] bottom-[50%] h-0.5  bg-black left-0"></span>
            <span className="absolute w-3/7 top-[50%] bottom-[50%] h-0.5  bg-black right-0"></span>
          </p>
          <div className="flex items-center gap-3">
            <button className="border border-gray-300 cursor-pointer rounded-md text-base flex items-center py-1 px-2">
              <Image
                className="mr-2"
                src="/google.png"
                width={20}
                height={20}
                alt="google icon"
              />
              <span> Google দিয়ে চালিয়ে যান</span>
            </button>
            <button className="border border-gray-300 cursor-pointer rounded-md text-base flex items-center py-1 px-2">
              <Image
                className="mr-2"
                src="/github.png"
                width={20}
                height={20}
                alt="Github icon"
              />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="text-center text-base mt-5">
            অ্যাকাউন্ট আছে?
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
