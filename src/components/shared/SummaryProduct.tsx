/** @format */

"use client";;
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { useEffect, useState } from "react";
import OrderSummaryCard from "./OrderSummaryCard";
import useLocalStorage from "use-local-storage";
import { IMetadata } from "@/utils/models/api/response/IUserResponse";

export default function SummaryProduct({
  model,
  className,
  children,
  showOnlyTotal,
  showTopLine,
  quantityAction,
  step,
}: Readonly<{
  model: ISummaryProductModel;
  className?: string;
  showOnlyTotal?: boolean;
  children?: React.ReactNode;
  showTopLine?: boolean;
  quantityAction?: (val: number) => void;
  step?: number;
}>) {
  const [totalCount, setTotalCount] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [checkoutData] = useLocalStorage<IMetadata>("checkoutData", {});

  const [firstWord, ...rest] = (model.name ?? "").split(" ");

  // const checkoutData =
  //   Object.keys(JSON.parse(localStorage.getItem("checkoutData") || "{}"))
  //     .length > 0
  //     ? JSON.parse(localStorage.getItem("checkoutData") || "{}")
  //     : context?.user?.metadata;

  const data = checkoutData as IMetadata;

  useEffect(() => {
    const totalSum = model?.orders?.reduce(
      (sum, item) => sum + (item.price ?? 0),
      0
    );

    const totalSumOfSubs =
      model?.subscriptions?.reduce(
        (sum, item) => sum + (item.price ?? 0),
        0
      ) ?? 0;

    setTotalCount(totalSum + totalSumOfSubs);
  }, [model]);

  const updateQuantityAction = (val: number) => {
    if (quantityAction) quantityAction(val);
  };
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
          {model?.orders?.length > 0 && (
            <Separator className="bg-grey3 h-[1px]" />
          )}
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
          {showTopLine && <Separator className="bg-grey3 h-[1px]" />}
          {model?.orders?.map((order) => (
            <OrderSummaryCard
              key={order.id}
              model={order}
              updateQuantityAction={updateQuantityAction}
              discount={data.discount}
            />
          ))}
          {model?.referals?.length > 0 && (
            <Separator className="bg-grey3 h-[1px]" />
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
          ))}
          {model?.subscriptions?.length > 0 && (
            <Separator className="bg-grey3 h-[1px]" />
          )}
          {model?.subscriptions?.length > 0 && (
            <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
              Quarterly Subscription
            </p>
          )}

          {model?.subscriptions?.map((item) => (
            <OrderSummaryCard
              key={item.id}
              model={item}
              discount={data.discount}
            />
          ))}

          {model?.membership?.length > 0 && (
            <Separator className="bg-grey3 h-[1px]" />
          )}

          {model?.membership?.length > 0 && (
            <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
              Membership Subscription
            </p>
          )}

          {model?.membership?.map((item) => (
            <OrderSummaryCard
              key={item.id}
              model={item}
              discount={item.discount ?? 0}
            />
          ))}
          {model?.membership?.length > 0 && (
            <div className="text-[12px] leading-[16px] font-helvetica italic mt-[-12px] text-grey4">
              Membership gives you access to unlimited drops, premium-only
              products, lab-direct pricing & free delivery on all orders
            </div>
          )}

          <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
            Referral Code
          </p>

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
              } text-white px-6 py-3 absolute right-3`}
            >
              Apply
            </button>
          </div>
          <Separator className="bg-grey3 h-[1px]" />
          <div className="grid gap-[10px]">
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
          <Separator className="bg-grey3 h-[1px]" />
        </>
      )}

      <div>
        <div className="grid gap-[7px] md:gap-0 grid-cols-[84px_1fr]">
          <div>
            <p className="text-[32px] leading-[33px] font-inconsolata font-[900] text-black">
              Total
            </p>
          </div>

          <div className="grid gap-[7px] text-right">
            <div className="gap-[2px] text-[32px] font-inconsolata font-[900] flex justify-end items-center">
              £{totalCount?.toFixed(2)}{" "}
            </div>
          </div>
        </div>

        <div className="grid gap-[10px]">{children}</div>
      </div>
    </div>
  );
}
