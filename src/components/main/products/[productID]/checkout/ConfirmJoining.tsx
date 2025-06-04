/** @format */

import Image from "next/image";

import ShareBox from "@/components/main/products/[productID]/checkout/ShareBox";
import ReferralSection from "@/components/shared/ReferralSection";
import Link from "next/link";
import copy from "copy-to-clipboard";
import { CustomToast } from "@/components/shared/Toast";
import { StatusToast } from "@/components/shared/Toast";
import { referalService } from "@/services/referalService";
import { useEffect, useState } from "react";
import IReferalInfoModel from "@/utils/models/api/IReferalInfoModel";
import { useUser } from "@/contexts/UserContext";
import { addDays, differenceInDays, startOfDay } from "date-fns";

export default function ConfirmJoining({
  email,
}: Readonly<{ email?: string }>) {
  const [referralInfo, setReferralInfo] = useState<IReferalInfoModel>();

  const context = useUser();

  useEffect(() => {
    fetchReferralInfo();
  }, []);

  const fetchReferralInfo = async () => {
    try {
      const response = await referalService.getReferalInfo();
      setReferralInfo(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const referralLink = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const referralCode = referralInfo?.referralCode;

  const createdAt = context?.user?.createdAt
  ? new Date(context.user.createdAt)
  : new Date();


  const endDate = startOfDay(addDays(createdAt, 30));
  const today = startOfDay(new Date());
  
  const remainingDays = differenceInDays(endDate, today);


  return (
    <div className="grid gap-[24px]">
      <div className="py-[41px] px-[24px] grid gap-[12px] md:h-[264px]">
        <div className="w-[87px] h-[87px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
          <Image
            src="/images/icons/check-white-icon.svg"
            alt="Check icon"
            width={87}
            height={87}
          />
        </div>
        <div className="grid gap-[16px]">
          <p className="text-[24px] leading-[28px] font-hagerman uppercase text-center">
            Welcome to Supplement Club
          </p>
          <p className="text-[20px] leading-[24px] font-helvetica text-grey4 text-center">
            A confirmation email has been sent to {email}
          </p>
        </div>
      </div>
      <ReferralSection percentage="0" remainingDays={remainingDays} />

      <div className="shadow-card bg-white rounded-sm p-4">
        <div className="mb-6">
          <h3 className="text-black text-base font-inconsolata mb-2 font-bold">
            Refer your friends
          </h3>
          <p className="text-[14px] font-helvetica text-grey4">
            Get 6 months free for you and a friend when they join using your
            link or code. Use whichever is easier, they work the same.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-black text-base font-helvetica mb-2">
            Your Referral Link -{" "}
            <Link href="#!" className="font-roboto underline">
              {referralLink}?ref={referralCode}
            </Link>{" "}
            <Image
              src="/images/icons/copy-icon.svg"
              alt="Copy icon"
              width={16}
              height={16}
              className="inline-block ml-3 cursor-pointer"
              onClick={() => {
                const isCopied = copy(
                  `${referralLink}?ref=${referralCode ?? ""}`
                );
                if (isCopied) {
                  console.log("Copied!");
                  CustomToast({
                    title: "Copied!",
                    status: StatusToast.SUCCESS,
                    position: "top-right",
                  });
                } else {
                  console.log("Copy failed");
                }
              }}
            />
          </h3>
          <p className="text-[14px] font-helvetica text-grey4">
            Share in chat, text, or anywhere online.
          </p>
        </div>
        <div>
          <h3 className="text-black text-base font-helvetica mb-2">
            Or Give Them Your Code -{" "}
            <Link href="#!" className="font-roboto underline">
              {referralInfo?.userCode}
            </Link>{" "}
            <Image
              src="/images/icons/copy-icon.svg"
              alt="Copy icon"
              width={16}
              height={16}
              className="inline-block ml-3 cursor-pointer"
              onClick={() => {
                const isCopied = copy(referralInfo?.userCode ?? "");
                if (isCopied) {
                  console.log("Copied!");
                  CustomToast({
                    title: "Copied!",
                    status: StatusToast.SUCCESS,
                    position: "top-right",
                  });
                } else {
                  console.log("Copy failed");
                }
              }}
            />
          </h3>
          <p className="text-[14px] font-helvetica text-grey4">
            They can enter it at checkout
          </p>
        </div>
      </div>

      <ShareBox />
    </div>
  );
}
