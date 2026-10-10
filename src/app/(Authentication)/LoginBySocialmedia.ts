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

export const signInByGithub = async () => {
  try {
    const { data, error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error?.message || "সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
    // if (data) {
    //   toast.success("সাইন-আপ সম্পন্ন হয়েছে");
    // }
  } catch (error) {
    toast.error(error?.message);
  }
};
