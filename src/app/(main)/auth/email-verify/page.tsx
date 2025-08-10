/** @format */

"use client";
import Image from "next/image";

import { CustomToast, StatusToast } from "@/components/shared/Toast";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { authService } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function EmailVerify() {
  const context = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const searchRedirect = searchParams.get("redirect");
    if (searchRedirect && context?.user?.isVerified) {
      router.push(searchRedirect);
    }
  }, [searchParams, router, context]);

  async function resendEmail() {
    await authService.resendEmailVerify(localStorage.getItem("email") ?? "");

    CustomToast({
      title: "A new link has been sent to your email",
      status: StatusToast.SUCCESS,
      position: "top-center",
    });
  }

  return (
    <div className="w-full md:w-[800px] mx-auto py-[200px] px-[20px] grid gap-[24px] justify-center">
      <h1 className="text-[40px] leading-[48px] font-hagerman text-center">
        <p className="text-center mb-[8px] text-[20px] leading-[24px] font-inconsolata text-grey4">
          Welcome to Supplement Club
        </p>
        Check Your Email to Confirm Your Account
      </h1>
      <Image
        className="mx-auto"
        src="/images/verify-email.svg"
        alt="verify image"
        width={171}
        height={146}
      />
      <div className="text-[20px] leading-[24px] text-grey4 font-helvetica text-center">
        We’ve sent a verification link to{" "}
        <span className="text-[20px] text-blue">
          {localStorage.getItem("email")}
        </span>
        <br />
        Didn’t receive it? Please check your spam folder or:
      </div>
      <Button
        onClick={() => resendEmail()}
        className=" text-white w-[280px] text[16px] leading-[24px] mx-auto font-inconsolata font-bold bg-blue"
      >
        Request a New Link
      </Button>
    </div>
  );
}
