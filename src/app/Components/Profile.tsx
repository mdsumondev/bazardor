import { useSession } from "@/lib/auth-client";
import { date } from "better-auth";
import Image from "next/image";
import React from "react";
import { names } from "./../../../.next/dev/server/chunks/node_modules_next_dist_06k_3_1o-9fwv._";

const Profile = ({ user }) => {
  return (
    <>
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

      <P>{user.name}</P>
    </>
  );
};

export default Profile;
