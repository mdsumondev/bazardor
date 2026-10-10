import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

export const SignUpByGoogle = async () => {
  try {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  } catch (error) {
    toast.error(error?.message || "গুগল সাইন-ইন করতে সমস্যা হয়েছে।");
  }
};
