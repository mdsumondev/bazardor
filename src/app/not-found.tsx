import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex w-full min-h-full items-center justify-center py-32">
      <div>
        <h1 className="text-9xl text-red-600 mb-3 font-bold">404</h1>
        <p className="text-lg font-bold text-center mb-3">Page not found</p>
        <Link
          href="/"
          className="bg-green-800 text-center text-base font-medium block w-full mb-5 text-white rounded-md px-5 py-2 shadow-md
              shadow-green-500 cursor-pointer"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
