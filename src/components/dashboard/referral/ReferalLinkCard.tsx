"use client";

import Image from "next/image";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { useNativeShare } from "@/hooks/useNativeShare";

export default function ReferalLinkCard({
  children,
  refCode,
//   userCode,
  type = "subscription",
}: Readonly<{
  children?: React.ReactNode;
  refCode?: string;
  userCode?: string;
  type?: "coin" | "subscription";
}>) {
  const [link] = useState(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}?ref=${refCode}`
  );

  const { triggerNativeShare } = useNativeShare({ url: link });
  const { triggerNativeShare: triggerNativeShareUserCode} = useNativeShare({ url: refCode || '' });

  return (
    <>
      <div className="w-[101%] border-[1px] shadow-3 border-grey35 p-[16px] rounded-[5px] grid gap-[16px]">
        <div className="grid gap-[8px]">
          <p className="text-[16px] leading-[16px] font-bold font-inconsolata">
            {type === "coin"
              ? "Earn 10% of your Friend&apos;s Spend in Club Coins!"
              : "6 Months Free Membership For You and Them"}
          </p>
          <p className="text-[14px] leading-[16px] font-helvetica text-grey4">
            {type === "coin"
              ? "Every £1 spent by your friend earns you 1,000 CC. You can convert CC into Credit off your Subscriptions"
              : "In your first 30 days, each friend who joins using your link or code gives you both 6 months additional free membership."}
          </p>
        </div>

        {refCode && (
          <div className="grid gap-[8px]">
            <p className="text-[16px] leading-[24px] font-helvetica">
              Your Referal Link
            </p>
            <p className="text-[14px] leading-[100%] font-[400] font-helvetica text-[#8E8E93]">
              Share your link online or with friends and we’ll apply your
              referal automatically
            </p>
            <div className="relative">
              <Input
                readOnly
                value={link}
                placeholder="referal link"
                className="pr-[40px] text-grey16 underline"
              />

              <Image
                src="/images/icons/copyright-icon.svg"
                className="absolute right-[10px] top-[10px] cursor-pointer"
                title="Copy and share your referral link"
                onClick={triggerNativeShare}
                alt="copyright icon"
                width={24}
                height={24}
              />
            </div>
          </div>
        )}

        {refCode && (
          <div className="grid gap-[8px]">
            <p className="text-[16px] leading-[24px] font-helvetica">
              Your Referal Code
            </p>
            <p className="text-[14px] leading-[100%] font-[400] font-helvetica text-[#8E8E93]">
				Tell your friends your code and they’ll enter it at checkout
            </p>
            <div className="relative">
              <Input
                readOnly
                value={refCode}
                placeholder="referal link"
                className="pr-[40px] text-grey16 uppercase underline"
              />

              <Image
                src="/images/icons/copyright-icon.svg"
                className="absolute right-[10px] top-[10px] cursor-pointer"
                title="Copy and share your referral link"
                onClick={triggerNativeShareUserCode}
                alt="copyright icon"
                width={24}
                height={24}
              />
            </div>
          </div>
        )}

        {children}
      </div>
    </>
  );
}
