import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="container mx-auto bg-white border border-gray-300 p-5  items-center lg:flex-row flex-col-reverse rounded-xl flex justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-10">আজকের বাজারের দাম এক নজরে</h1>
        <p className="lg:w-2/3 mb-5">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <Link
          href="/"
          className="bg-green-800 text-base font-medium text-white rounded-md px-5 py-2 shadow-md
              shadow-green-500 cursor-pointer"
        >
          সব পণ্য দেখুন
        </Link>
      </div>
      <div>
        <Image
          src="/bazar-hero.png"
          width={500}
          height={400}
          alt="hero image"
        />
      </div>
    </div>
  );
};

export default Hero;
