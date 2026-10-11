"use client";

import { updateUser, useSession } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";
import { SignOutMange } from "../LoginBySocialmedia";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: seasion } = useSession();

  const handleUpdateData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const receiveData = new FormData(e.currentTarget);

    const updateName = String(receiveData.get("name") ?? "").trim();

    const { data, error } = await updateUser({
      name: updateName,
    });

    if (data) {
      toast.success("নাম পরিবর্তন করা হয়েছে");
    }
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-[#E1E8E1] py-25">
      <div className="container mx-auto">
        <div>
          <h2 className="text-xl font-bold mb-2">আমার প্রোফাইল</h2>
          <p className="text-base">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        <div className="flex items-center justify-between p-5 bg-white p-3 rounded-md mt-5">
          <div className="flex gap-2">
            <div>
              {seasion?.user.image ? (
                <Image
                  src={seasion?.user?.image}
                  width={50}
                  height={50}
                  alt={seasion?.user?.name}
                ></Image>
              ) : (
                <p className="text-xl bg-green-700 font-bold text-white px-3 py-2 rounded-full">
                  {seasion?.user?.name.charAt()}
                </p>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">{seasion?.user?.name}</h2>
              <p className="text-base">{seasion?.user?.email}</p>
            </div>
          </div>

          <button
            onClick={SignOutMange}
            className="text-base text-red-500 border border-red-600 px-3 py-2 rounded-md"
          >
            ↩ সাইন আউট
          </button>
        </div>

        <form
          onSubmit={handleUpdateData}
          className="p-5 bg-white rounded-md mt-5 mb-10"
        >
          <p className="text-lg font-bold mb-8">তথ্য</p>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-base mb-2">
              নাম
            </label>
            <input
              className="border border-gray-300 rounded-md outline-0 p-2"
              type="text"
              name="name"
              id="name"
            />
          </div>
          <button
            type="submit"
            className="bg-green-800 block mt-5 w-full text-base font-medium text-white rounded-md px-5 py-2 shadow-md
              shadow-green-500 cursor-pointer"
          >
            আপডেট
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
