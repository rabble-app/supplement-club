/** @format */

"use client";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import Image from "next/image";
import { useEffect, useState } from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import useLocalStorage from "use-local-storage";
import { IMetadata } from "@/utils/models/api/response/IUserResponse";
import { useUser } from "@/contexts/UserContext";
import { referalService } from "@/services/referalService";
import { Loader2 } from "lucide-react";
import IReferalInfoModel from "@/utils/models/api/IReferalInfoModel";
import GiftIcon from "@/components/icons/gift-icon.svg";
import CheckmarkIcon from "@/components/icons/checkmark-icon.svg";
import { CustomToast } from "./Toast";
import { StatusToast } from "./Toast";
import { Button } from "../ui/button";
import { format } from "date-fns";

export default function SummaryProduct({
  model,
  className,
  children,
  showOnlyTotal,
  showTopLine,
  quantityAction,
  step,
  referralInfo,
  setIsReferralCodeApplied,
  setIsInfoIconClicked,
}: Readonly<{
  model: ISummaryProductModel;
  className?: string;
  showOnlyTotal?: boolean;
  children?: React.ReactNode;
  showTopLine?: boolean;
  quantityAction?: (val: number) => void;
  step?: number;
  referralInfo?: IReferalInfoModel;
  setIsReferralCodeApplied?: (val: boolean) => void;
  setIsInfoIconClicked?: (val: boolean) => void;
}>) {
  const [totalCount, setTotalCount] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [checkoutData] = useLocalStorage<IMetadata>("checkoutData", {});
  const [isLoading, setIsLoading] = useState(false);
  const context = useUser();
  const [firstWord, ...rest] = (model.name ?? "").split(" ");

  const data = checkoutData as IMetadata;

  useEffect(() => {
    const totalSum = model?.orders?.reduce(
      (sum, item) => sum + (item.rrp ?? 0),
      0
    );

    const totalSumOfSubs =
      model?.subscriptions?.reduce((sum, item) => sum + (item.price ?? 0), 0) ??
      0;

    const founderDiscountedTotalSum =
      totalSumOfSubs * (1 - (data.founderDiscount ?? 0) / 100);
    const earlyMemberDiscountedTotalSum =
      totalSumOfSubs * (1 - (data.earlyMemberDiscount ?? 0) / 100);

    let discountedTotalSum = totalSum;

    if (data.isComming) {
      discountedTotalSum = totalSum + founderDiscountedTotalSum;
    } else if (data.firstDelivery) {
      discountedTotalSum =
        (1 -
          (Number(data.earlyMemberDiscount ?? 0) + Number(data.discount ?? 0)) /
            100) *
        totalSum;
    } else {
      discountedTotalSum = totalSum + totalSumOfSubs;
    }

    console.log("totalSum", totalSum);
    console.log("data.earlyMemberDiscount", data.earlyMemberDiscount);
    console.log(
      "earlyMemberDiscountedTotalSum",
      (1 -
        (Number(data.earlyMemberDiscount ?? 0) + Number(data.discount ?? 0)) /
          100) *
        totalSum
    );

    setTotalCount(discountedTotalSum);
  }, [model]);

  const updateQuantityAction = (val: number) => {
    if (quantityAction) quantityAction(val);
  };

  const handleApplyReferralCode = async (code: string, amount: number) => {
    setIsLoading(true);

    try {
      const res = await referalService.postApplyReferralCode(code, amount);

      if (!res.data) {
        throw res;
      } else {
        CustomToast({
          title: "Referral code applied !",
          status: StatusToast.SUCCESS,
        });
        setIsReferralCodeApplied?.(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      CustomToast({
        title: JSON.parse(error.error).message,
        status: StatusToast.ERROR,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalDiscountPercentage =
    (data.discount ?? 0) + (Number(data.earlyMemberDiscount ?? 0) ?? 0);
  const totalDiscountAmount = (data.rrp ?? 0) * (totalDiscountPercentage / 100);

  return (
    <div
      key={model?.id}
      className={`grid gap-[24px] py-[16px] md:py-[24px] bg-grey12  p-[24px] ${className} h-max`}
    >
      {!showOnlyTotal && (
        <>
          {step !== 4 && model?.title && (
            <h1 className="text-[24px] leading-[27px] font-hagerman text-blue mb-[8px]">
              {model.title}
            </h1>
          )}
          {model?.corporation && model.name && (
            <div className="grid gap-[8px]">
              <p className="text-[20px] leading-[24px] md:font-[500] font-inconsolata md:text-grey4 uppercase">
                {model.corporation}
              </p>
              <div className="text-[24px] md:text-[30px] leading-[28px] md:leading-[48px] font-hagerman flex items-start gap-[5px]">
                {firstWord}
                <Image
                  src="/images/TM-black.svg"
                  alt="TM corporation"
                  width={14}
                  height={14}
                />
                {rest?.join(" ")}
              </div>
              {model.quantityOfSubUnitPerOrder &&
                model.unitsOfMeasurePerSubUnit && (
                  <div className="flex items-center gap-[8px]">
                    <Image
                      src={`${
                        model.unitsOfMeasurePerSubUnit !== "grams"
                          ? "/images/icons/link-icon.svg"
                          : "/images/icons/gram-link-icon.svg"
                      }`}
                      alt="security-card-icon"
                      width={24}
                      height={24}
                    />

                    <p className="text-[14px] leading-[16px] text-grey6">
                      {model.quantityOfSubUnitPerOrder}{" "}
                      {model.unitsOfMeasurePerSubUnit}
                    </p>
                  </div>
                )}
            </div>
          )}
          {!data.isComming && model?.orders?.length > 0 && (
            <hr className="border-grey3 border" />
          )}
          {!data.isComming && !data.firstDelivery && (
            <div className="flex justify-between items-center">
              {model?.deliveryText && (
                <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                  {model.deliveryText}
                </p>
              )}
              <p className="text-sm font-bold text-blue bg-[#E5E6F4] px-2.5 py-1.5 rounded-full font-inconsolata">
                {" "}
                {data.daysUntilNextDrop} days until the next quarterly drop
              </p>
            </div>
          )}
          {data.firstDelivery && (
            <div className="font-inconsolata bg-blue2 rounded-sm">
              <p className="text-blue font-inconsolata text-sm leading-6 font-bold text-center py-2 px-2.5">
                EARLY MEMBER PRICING – You’re ordering before stock arrives and
                securing an <br /> extra {data.earlyMemberDiscount}% off for
                life.
              </p>
            </div>
          )}
          {showTopLine && <hr className="bg-grey3 h-[1.5px]" />}

          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold font-inconsolata">
                  {data.isComming && "Launch Package"}
                  {(!data.isComming || data.firstDelivery) && "BILLED TODAY"}
                </p>
                <Image
                  src="/images/icons/info-icon.svg"
                  alt="arrow right icon"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => setIsInfoIconClicked?.(true)}
                />
              </div>
              {data.isComming && (
                <p className="text-xs font-bold text-blue bg-[#E5E6F4] px-2.5 py-1.5 rounded-full font-inconsolata">
                  Reserved at £{data.pricePerCount?.toFixed(2)} / count
                </p>
              )}
            </div>
            {(!data.isComming || data.firstDelivery) && (
              <>
                <p className="text-sm font-semibold font-inconsolata text-[#444444]">
                  Delivers on {format(data.deliveryDate ?? "", "MMMM dd yyyy")}.
                </p>
                {<hr className="bg-grey3 h-[1.5px] mt-6" />}
              </>
            )}
          </div>
          {/* {data.firstDelivery && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold font-inconsolata">
                  Delayed
                </p>
              </div>
              <p className="text-xs font-bold text-blue bg-[#E5E6F4] px-2.5 py-1.5 rounded-full font-inconsolata">
                You’ll receive your alignment pack when stock arrives on{" "}
                {format(data.deliveryDate ?? "", "MMMM dd yyyy")}.
              </p>
            </div>
          )} */}
          {!data.isComming && (
            <>
              {" "}
              {checkoutData.quantity && checkoutData.quantity > 0 ? (
                model?.orders?.map((order) => (
                  <OrderSummaryCard
                    key={order.id}
                    model={order}
                    updateQuantityAction={updateQuantityAction}
                    discount={data.discount}
                    step={step}
                    firstDelivery={data.firstDelivery}
                    earlyMemberDiscount={data.earlyMemberDiscount}
                  />
                ))
              ) : (
                <Button
                  variant="link"
                  className="text-center w-fit mx-auto"
                  onClick={() => updateQuantityAction(1)}
                >
                  <p className="text-black font-inconsolata font-bold text-base underline text-center">
                    Add My Alignment Package
                  </p>
                </Button>
              )}
            </>
          )}
          {/* {model?.referals?.length > 0 && (
            <hr className="border-grey3 border" />
          )}
          {model?.referals?.map((referal, idx) => (
            <div
              key={`${idx + 1}`}
              className="flex justify-between items-center"
            >
              <div className="grid gap-[8px]">
                <p className="text-[20px] leading-[20px] font-[600] font-inconsolata">
                  Succesful Referal x {referal.count}
                </p>
                <p className="text-[14px] leading-[14px] font-[400] font-inconsolata text-grey4">
                  This Quarter
                </p>
              </div>
              <div className="text-[20px] leading-[20px] font-bold font-inconsolata">
                £{referal.price.toFixed(2)}
              </div>
            </div>
          ))} */}
          {data.isComming && model?.subscriptions?.length > 0 && (
            <hr className="border-grey3 border" />
          )}
          {data.isComming && model?.subscriptions?.length > 0 && (
            <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
              Quarterly Subscription
            </p>
          )}

          {data.isComming &&
            model?.subscriptions?.map((item) => (
              <OrderSummaryCard
                key={item.id}
                model={item}
                discount={data.discount}
                step={step}
                isComming={data.isComming}
                founderSpots={data.founderSpots}
                founderMembersNeeded={data.founderMembersNeeded}
                founderDiscount={data.founderDiscount}
                earlyMemberDiscount={data.earlyMemberDiscount}
                firstDelivery={data.firstDelivery}
              />
            ))}

          {data.isComming && model?.membership?.length > 0 && (
            <hr className="border-grey3 border" />
          )}

          {data.isComming && model?.membership?.length > 0 && (
            <div>
              <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                Membership Fee
              </p>
              {data.isComming && (
                <p className="text-sm font-inconsolata text-grey16 mt-1">
                  Membership trial begins only once your team launches — not
                  before.
                </p>
              )}
            </div>
          )}

          {data.isComming &&
            model?.membership?.map((item) => (
              <OrderSummaryCard
                key={item.id}
                model={item}
                discount={item.discount ?? 0}
                step={step}
              />
            ))}
          {/* {model?.membership?.length > 0 && !data.isComming && (
            <div className="text-[12px] leading-[16px] font-helvetica italic mt-[-12px] text-grey4">
              Membership gives you access to unlimited drops, premium-only
              products, lab-direct pricing & free delivery on all orders
            </div>
          )} */}

          {context?.user && !data.isComming && (
            <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
              Referral Code
            </p>
          )}

          {context?.user && !referralInfo?.referrer?.name && step !== 4 && (
            <div className="flex items-center gap-2 relative mt-9 mb-8">
              <input
                type="text"
                className="w-full font-roboto text-base border border-grey32 px-3 py-6 absolute bg-transparent focus:outline-none"
                placeholder="Referral Code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              <button
                className={`${
                  referralCode ? "bg-blue" : "bg-grey2"
                } text-white px-6 py-3 absolute right-3 flex items-center gap-1`}
                onClick={() =>
                  handleApplyReferralCode(referralCode, totalCount)
                }
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Apply
              </button>
            </div>
          )}

          {referralInfo?.referrer?.name && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 bg-blue p-2.5 rounded-sm">
                <GiftIcon className="text-white w-6 h-6 mx-auto" />
                <p className="text-[20px] leading-[20px] font-normal uppercase text-white font-hagerman flex items-center gap-1">
                  <span className="tracking-[0.1px] text-[20px]">••••</span>
                  {referralInfo?.referrer?.name?.slice(0, 4)}
                </p>
              </div>
              <div
                className="flex gap-1 text-[14px] leading-[14px] font-[400] font-hagerman uppercase
               text-[#027a48]"
              >
                <CheckmarkIcon className="w-4 h-4" />
                You’re getting additional 2 free drops
              </div>
            </div>
          )}
          <hr className="border-grey3 border" />
          {data.isComming && (
            <div className="font-inconsolata bg-blue2 rounded-sm">
              <p className="text-blue font-inconsolata text-sm leading-6 font-bold text-center py-2 px-2.5">
                Founder slot secured. You’ll be notified when the team is ready
                and charged <br /> only if you stay in.
              </p>
            </div>
          )}
          {data.firstDelivery && (
            <div className="font-inconsolata bg-blue2 rounded-sm">
              <p className="text-blue font-inconsolata text-xs leading-6 font-bold text-center py-2 px-2.5">
                You're early. We’ll notify you when your order ships.
              </p>
            </div>
          )}
          <div className="grid gap-[10px]">
            {!data.isComming && (
              <div className="flex justify-between items-center">
                <p className="text-grey16 text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                  RRP
                </p>
                <p className="text-black text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                  £{data.rrp?.toFixed(2)}
                </p>
              </div>
            )}
            {!data.isComming && (
              <div className="flex justify-between items-center">
                <p className="text-grey16 text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                  Total Discount
                </p>
                <p className="text-black text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                  -£{totalDiscountAmount?.toFixed(2)}
                </p>
              </div>
            )}
            <div className="flex justify-between items-center">
              <p className="text-grey16 text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                Subtotal
              </p>
              <p className="text-black text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                £{totalCount?.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-grey16 text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                Delivery
              </p>
              <p className="text-black text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                FREE
              </p>
            </div>
          </div>
          <hr className="border-grey3 border" />
        </>
      )}

      <div>
        <div className="grid gap-[7px] md:gap-0 grid-cols-[84px_1fr]">
          <div>
            <p className="text-[32px] leading-[33px] font-inconsolata font-[900] text-black whitespace-nowrap">
              {data.isComming ? "Founder Price" : "Total"}
            </p>
          </div>

          <div className="grid gap-[7px] text-right">
            <div className="gap-[2px] text-[32px] font-inconsolata font-[900] flex justify-end items-center">
              £{totalCount?.toFixed(2)}{" "}
            </div>
          </div>
        </div>
        {(!data.isComming || data.firstDelivery) &&
          model?.subscriptions?.length > 0 && (
            <hr className="border-grey3 border my-6" />
          )}
       { (!data.isComming || data.firstDelivery) && <p className="text-[20px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata mb-6">SUBSCRIPTIONS</p>}
        {(!data.isComming || data.firstDelivery) &&
          model?.subscriptions?.length > 0 && (
            <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
              Quarterly Drop Subscription
            </p>
          )}
        {(!data.isComming || data.firstDelivery) &&
          model?.subscriptions?.map((item) => (
            <OrderSummaryCard
              key={item.id}
              model={item}
              discount={data.discount}
              step={step}
              isComming={data.isComming}
              founderSpots={data.founderSpots}
              founderMembersNeeded={data.founderMembersNeeded}
              founderDiscount={data.founderDiscount}
              earlyMemberDiscount={data.earlyMemberDiscount}
              firstDelivery={data.firstDelivery}
            />
          ))}
        {/* {(!data.isComming || data.firstDelivery) &&
          model?.membership?.length > 0 && (
            <hr className="border-grey3 border my-6" />
          )} */}
        {(!data.isComming || data.firstDelivery) &&
          model?.membership?.length > 0 && (
            <div>
              <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata mb-4 mt-2">
                Membership Fee
              </p>
              {/* {!data.isComming && (
                <p className="text-sm font-inconsolata text-grey16 mt-1">
                  Membership trial begins only once your team launches — not
                  before.
                </p>
              )} */}

              {(!data.isComming || data.firstDelivery) &&
                model?.membership?.map((item) => (
                  <OrderSummaryCard
                    key={item.id}
                    model={item}
                    discount={item.discount ?? 0}
                    step={step}
                  />
                ))}
            </div>
          )}
        <div className="grid gap-[10px]">{children}</div>
      </div>
    </div>
  );
}
