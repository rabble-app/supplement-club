/** @format */

import Image from "next/image";

import ShareBox from "@/components/main/products/[productID]/checkout/ShareBox";
import ReferralSection from "@/components/shared/ReferralSection";
import Link from "next/link";
import copy from "copy-to-clipboard";
import { CustomToast } from "@/components/shared/Toast";
import { StatusToast } from "@/components/shared/Toast";
import IReferalInfoModel from "@/utils/models/api/IReferalInfoModel";
import { useUser } from "@/contexts/UserContext";
import { addDays, differenceInDays, startOfDay } from "date-fns";
import IOrderPackageModel, { MemberType } from "@/utils/models/IOrderPackageModel";

export default function ConfirmJoining({
  orderPackage,
  productName,
  email,
  userType,
  referralInfo,
  step,
}: Readonly<{
  orderPackage: IOrderPackageModel;
  productName?: string;
  email?: string;
  userType: "new" | "existing";
  referralInfo?: IReferalInfoModel;
  step?: number;
}>) {
  const context = useUser();

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
      {step === 4 && (
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
      )}
      {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && <ReferralSection percentage="0" remainingDays={remainingDays} />}

      {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && <>
        {userType === "new" && (
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
                      CustomToast({
                        title: "Copied!",
                        status: StatusToast.SUCCESS,
                        position: "top-right",
                      });
                    } else {
                      console.error("Copy failed");
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
                      CustomToast({
                        title: "Copied!",
                        status: StatusToast.SUCCESS,
                        position: "top-right",
                      });
                    } else {
                      console.error("Copy failed");
                    }
                  }}
                />
              </h3>
              <p className="text-[14px] font-helvetica text-grey4">
                They can enter it at checkout
              </p>
            </div>
          </div>
        )}
        {userType === "existing" && (
          <div className="shadow-card bg-white rounded-sm p-4">
            <div className="mb-6">
              <h3 className="text-black text-base font-inconsolata mb-2 font-bold">
                6 Months Free Membership For You and Them
              </h3>
              <p className="text-[14px] font-helvetica text-grey4">
                In your first 30 days, each friend who joins using your link or
                code gives you both 6 months additional free membership.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-black text-base font-helvetica">
                Your Referral Link
              </h3>
              <p className="text-[14px] font-helvetica text-grey4 my-2">
                Share your link online or with friends and we’ll apply your
                referral automatically
              </p>
              <div className="border border-black p-3 flex justify-between items-center">
                <Link href="#!" className="font-roboto underline text-grey16">
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
                      CustomToast({
                        title: "Copied!",
                        status: StatusToast.SUCCESS,
                        position: "top-right",
                      });
                    } else {
                      console.error("Copy failed");
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-black text-base font-helvetica">
                Your Referral Code
              </h3>
              <p className="text-[14px] font-helvetica text-grey4 my-2">
                Tell your friends your code and they’ll enter it at checkout
              </p>
              <div className="border border-black p-3 flex justify-between items-center">
                <Link href="#!" className="font-roboto underline text-grey16">
                  {referralInfo?.userCode}
                </Link>{" "}
                <Image
                  src="/images/icons/copy-icon.svg"
                  alt="Copy icon"
                  width={16}
                  height={16}
                  className="inline-block ml-3 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </>}

      {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
        <div className="bg-white shadow-card rounded-sm p-4 border border-grey35">
          <h3 className="font-hagerman text-[24px]">You’ve Registered as a Founding Member for <br />
            {productName}</h3>

          <p className="font-helvetica text-sm text-grey4 my-2">As a founding member, you’ve secured a further {orderPackage.extraDiscount}% lifetime discount off the team price for all your future orders.</p>

          <div className="my-4">
            <h3 className="font-inconsolata font-bold text-base">What Happens Next</h3>
            <ul className="list-disc pl-6">
              <li className="font-helvetica text-sm text-grey4 mt-2">Your payment has not been taken yet.</li>
              <li className="font-helvetica text-sm text-grey4">Once enough members have joined, we’ll email you with a 24-hour notice before your card is charged for the first drop</li>
              <li className="font-helvetica text-sm text-grey4">The team currently needs {orderPackage.remainingSpots} more members to launch.</li></ul>
          </div>
          <div className="my-4">
            <h3 className="font-inconsolata font-bold text-base">When the Team Launches</h3>
            <ul className="list-disc pl-6">
              <li className="font-helvetica text-sm text-grey4 mt-2">You’ll be charged for your first product drop — this is a non-refundable payment, as products are made to order.</li>
              <li className="font-helvetica text-sm text-grey4">Your Supplement Club membership will begin at that point, and you’ll get your first 6 months free.</li>
              <li className="font-helvetica text-sm text-grey4">You’ll also unlock your referral link and code, so you can start inviting others and earning bonuses and discounts.</li></ul>
          </div>
          <div>
            <h3 className="font-inconsolata font-bold text-base">Want to Cancel?</h3>
            <p className="font-helvetica text-sm text-grey4 mt-2 ">You can withdraw from this team any time before your first payment is taken, in <br /> your <Link className="text-blue underline text-sm" href="/dashboard/manage-plans">subscriptions management page</Link>. </p>
          </div>
        </div>
      )}
      {step === 4 && <ShareBox />}
    </div>
  );
}
