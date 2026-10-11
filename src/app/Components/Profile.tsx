"use client";
import { useSession } from "@/lib/auth-client";
import { date } from "better-auth";
import Image from "next/image";
import React, { useState } from "react";
import { names } from "./../../../.next/dev/server/chunks/node_modules_next_dist_06k_3_1o-9fwv._";
import Link from "next/link";
import { SignOutMange } from "../(Authentication)/LoginBySocialmedia";
import { router } from "better-auth/api";

const Profile = ({ user }) => {
  const [openProfile, setOpenProfile] = useState(false);

  const handleProfile = () => {
    setOpenProfile(!openProfile);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleProfile}
      >
        <div>
          {user.image ? (
            <Image
              src={user.image}
              width={50}
              height={50}
              alt={user.name}
            ></Image>
          ) : (
            <p className="text-xl bg-green-700 font-bold text-white px-3 py-2 rounded-full">
              {user.name.charAt()}
            </p>
          )}
        </div>
        <p>{user.name}</p>
      </div>

      <div
        className={`bg-white shadow-lg px-5 rounded-md top-full z-40 py-5 flex-col items-start absolute gap-1 ${openProfile === true ? "flex" : "hidden"} transition-all ease-in-out`}
      >
        <div className="mb-2">
          <h3 className="text-xl font-bold">{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
        <Link href="/profile" className="text-base font-medium">
          আমার প্রোফাইল{" "}
        </Link>
        <button
          onClick={() => SignOutMange()}
          className="text-red-700 text-base font-medium"
        >
          লগ আউট
        </button>
      </div>
    </div>
  );
};

export default Profile;
