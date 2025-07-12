/** @format */

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { Separator } from "@radix-ui/react-separator";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import OrderSummaryCard from "@/components/shared/OrderSummaryCard";
import { Button } from "@/components/ui/button";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type { ICapsuleInfoModel } from "@/utils/models/api/ICapsuleInfoModel";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useLocalStorage from "use-local-storage";
import OrderSummaryCard2 from "@/components/shared/OrderSummaryCard2";
import { getQuarterInfo } from "@/utils/utils";
import IOrderPackageModel, { MemberType } from "@/utils/models/IOrderPackageModel";

const generateImage = (count: number) => (
  <div
    className="flex justify-center mx-auto relative h-[24px]"
    style={{ width: `${20 * count}px` }}
  >
    {Array.from({ length: count }).map((_, index) => (
      <Image
        key={`pill-${index + 1 * count}`}
        className="absolute"
        style={{
          left: `${index * 20}px`,
        }}
        src="/images/icons/pillow-icon.svg"
        alt={`pillow icon ${index + 1}`}
        width={24}
        height={24}
      />
    ))}
  </div>
);

export default function CapsuleBox({
  orderPackage,
  unitsOfMeasurePerSubUnit,
  capsuleInfo,
  rrp,
  isFoundingProduct,
  productId,
  price,
  pricePerCount,
  activeMemberIndex,
  discount,
  activePercentageDiscount,
  deliveryDate,
  teamStatus,
  daysUntilNextDrop,
  pouchSize,
  alignmentPoucheSize,
  teamName,
  name,
  quantityOfSubUnitPerOrder,
  rrpPerCount,
  gramsPerCount,
  pricePerPoche,
  capsuleCount,
  capsules,
  setCapsuleCount,
  setStorageCapsuleCount,
  gPerCount,
  founderSpots,
  founderMembersNeeded,
  founderDiscount,
  earlyMemberDiscount,
  leadTime,
  firstDelivery,
  pochesRequired,
  orderDate,
}: Readonly<{
  orderPackage: IOrderPackageModel;
  unitsOfMeasurePerSubUnit?: string;
  capsuleInfo?: ICapsuleInfoModel[];
  rrp: number;
  price: number;
  isFoundingProduct?: boolean;
  productId?: string;
  pricePerCount: number;
  activeMemberIndex: number;
  discount: number;
  activePercentageDiscount: number;
  deliveryDate: string;
  teamStatus: string;
  daysUntilNextDrop: number;
  pouchSize: number;
  alignmentPoucheSize: number;
  teamName: string;
  name: string;
  quantityOfSubUnitPerOrder: number;
  rrpPerCount: number;
  gramsPerCount: number;
  pricePerPoche: number;
  capsuleCount: number;
  capsules: number;
  setCapsuleCount: (value: number) => void;
  setStorageCapsuleCount: (value: number) => void;
  gPerCount: number;
  founderSpots?: number;
  founderMembersNeeded?: number;
  founderDiscount?: number;
  earlyMemberDiscount?: number;
  leadTime?: number;
  firstDelivery?: boolean;
  pochesRequired?: number;
  orderDate?: string;
}>) {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");

  const [, setCheckoutData] = useLocalStorage("checkoutData", {});

  const [units] = useState(
    ["grams", "gm"].includes(unitsOfMeasurePerSubUnit ?? "") ? "g" : " Capsules"
  );

  const updateQuantityAction = useCallback((val: number) => {
    console.log(val);
  }, []);

  const getCapsuleLabel = (capsuleCount: number) =>
    `${capsuleCount}${capsuleCount > 1 ? units : units.slice(0, -1)} per Day`;

  const checkoutData = {
    teamId,
    teamName,
    name,
    productId,
    activeMemberIndex,
    activePercentageDiscount,
    deliveryDate,
    teamStatus,
    daysUntilNextDrop,
    isFoundingProduct,
    capsuleCount,
    alignmentPoucheSize,
    pouchSize,
    unitsOfMeasurePerSubUnit,
    quantityOfSubUnitPerOrder,
    pricePerCount,
    rrp,
    rrpPerCount,
    discount,
    gramsPerCount,
    pricePerPoche,
    price,
    quantity: (capsuleCount / gPerCount) * (pochesRequired ?? 0),
    founderSpots,
    founderMembersNeeded,
    founderDiscount,
    earlyMemberDiscount,
    leadTime,
    firstDelivery,
    pochesRequired,
    orderDate,
  };

  const { currentQuarter } = getQuarterInfo();
  const nextQuater = currentQuarter + 1 > 4 ? 1 : currentQuarter + 1;

  const leftTopText = `${
    (orderPackage.capsuleCount * orderPackage.days) / gPerCount
  }${orderPackage.units} Every 3 months`;

  const rightCenterText = (
    <div
      className={`text-xl md:text-3xl flex font-[800] text-black items-center gap-1 font-inconsolata`}
    >
      £{orderPackage.price}
      <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
        (£{orderPackage.pricePerCount?.toFixed(2)}/count)
      </span>
    </div>
  );

  const rightBottomContent = (
    <div className="hidden md:block text-[20px] leading-[20px] text-grey4 md:text-end font-inconsolata whitespace-nowrap">
      RRP{" "}
      <span className="text-[20px] leading-[20px] line-through font-bold font-inconsolata">
        £{(Number(orderPackage.rrp) ?? 0).toFixed(2)}
      </span>{" "}
      <span className="text-[20px] leading-[20px] font-bold text-blue font-inconsolata whitespace-nowrap">
        {(
          Number(orderPackage.discount ?? 0) +
          Number(orderPackage.extraDiscount ?? 0)
        ).toFixed(2)}
        % OFF
      </span>
    </div>
  );

  const memberTypeTexts = {
    FOUNDING_MEMBER: {
      leftCenter: "FOUNDING MEMBER",
      leftBottom: `${orderPackage.extraDiscount}% OFF TEAM PRICE. FOREVER`,
      rightTop: "Founders Slot Reserved",
      rightBottom: `${orderPackage.remainingSpots} Founder Spots Remaining!`,
    },
    EARLY_MEMBER: {
      leftCenter: "EARLY MEMBER",
      leftBottom: `${orderPackage.extraDiscount}% OFF TEAM PRICE. FOREVER`,
      rightTop: "Early Bird Slot Reserved",
      rightBottom: `Limited Time Remaining!`,
    },
    MEMBER: {
      leftCenter: `Q${nextQuater} DROP`,
      leftBottom: `Delivers: ${orderPackage.deliveryDate}`,
      rightTop: "",
      rightBottom: rightBottomContent,
    },
  } as const;

  const currentMemberType =
    memberTypeTexts[orderPackage.memberType as keyof typeof memberTypeTexts] ||
    memberTypeTexts.MEMBER;

  const leftCenterText = currentMemberType.leftCenter;
  const leftBottomText = currentMemberType.leftBottom;
  const rightTopText = currentMemberType.rightTop;
  const rightBottomText = currentMemberType.rightBottom;

  return (
    <div className="grid gap-[5px]">
      <RadioGroup
        value={capsuleCount.toString()}
        onValueChange={(value) => {
          setCapsuleCount(Number(value));
          setStorageCapsuleCount(Number(value));
        }}
        className={`grid gap-[5px] ${
          capsuleInfo?.length === 2
            ? "md:grid-cols-2"
            : capsuleInfo?.length === 3
            ? "md:grid-cols-3"
            : "md:grid-cols-4"
        }`}
      >
        {capsuleInfo?.map((option) => (
          <label
            key={option.capsuleCount}
            className={`grid gap-[8px] pt-[6px] pb-[8px] px-[8px] relative cursor-pointer min-h-[239px] ${
              capsuleCount === option.capsuleCount
                ? "outline outline-[2px] outline-blue border-b-transparent pb-[7px] mb-[-2px]"
                : "border-[1px] border-grey18"
            }`}
          >
            <input
              type="radio"
              value={option.capsuleCount}
              checked={capsuleCount === option.capsuleCount}
              onChange={() => {
                setCapsuleCount(option.capsuleCount);
                setStorageCapsuleCount(option.capsuleCount);
              }}
              className="sr-only" // Hide the input but keep it accessible
            />
            <div className="grid gap-[8px] justify-center max-h-[56px]">
              <RadioGroupItem
                value={option.capsuleCount.toString()}
                className="mx-auto"
              />
              {units === "g" ? (
                <Image
                  src="/images/icons/gram-link-icon.svg"
                  alt="gram-link-icon"
                  width={24}
                  height={24}
                />
              ) : (
                generateImage(option.capsuleCount)
              )}
            </div>
            <p className="text-[12px] h-[14px] font-bold font-helvetica text-center">
              {getCapsuleLabel(option.capsuleCount)}
            </p>
            <Separator className="bg-grey3 h-[1px]" />
            <div className="grid gap-[4px]">
              <p className="text-grey6 text-[12px] leading-[16px]">
                {option.title1}
              </p>
              <p className="text-grey7 text-[12px] leading-[14px]">
                {option.description1}
              </p>
            </div>
            <Separator className="bg-grey3 h-[1px]" />
            <div className="grid gap-[4px]">
              <p className="text-grey6 text-[12px] leading-[16px]">
                {option.title2}
              </p>
              <p className="text-grey7 text-[12px] leading-[14px]">
                {option.description2}
              </p>
            </div>
            {capsuleCount === option.capsuleCount && (
              <div className="hidden md:flex absolute bottom-[-10px] w-full h-[20px] bg-white" />
            )}
            {capsuleCount === option.capsuleCount && (
              <div
                key={option.capsuleCount}
                className="grid md:hidden gap-[8px]"
              >
                <div className="flex justify-between">
                  <p className="text-grey7 text-[12px] leading-[14px] max-w-[132px]">
                    3 Month Subscription <br />({capsules}
                    {units})
                  </p>
                  <div className="flex gap-[7px]">
                    <div className="flex flex-col gap-[7px] text-[16px] leading-[16px] font-bold">
                      £{((price * capsuleCount) / gPerCount)?.toFixed(2)}
                      <span className="text-[10px] leading-[11.5px] font-bold text-grey1">
                        (£{pricePerCount?.toFixed(2)} / count)
                      </span>
                    </div>
                    <div>
                      <div className="text-[16px] leading-[16px] text-grey4">
                        RRP{" "}
                        <span className="text-[16px] leading-[16px] font-bold line-through">
                          £{Number(rrp).toFixed(2)}{" "}
                        </span>
                      </div>
                      <div className="text-[16px] leading-[16px] font-bold text-blue">
                        {discount.toFixed(2)}% OFF
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-grey7 text-[12px] leading-[13px]">
                    {getCapsuleLabel(capsuleCount)}
                  </p>
                  <p className="text-[12px] leading-[14px]">
                    {
                      capsuleInfo?.find((c) => c.capsuleCount === capsuleCount)
                        ?.others
                    }
                  </p>
                </div>
              </div>
            )}
          </label>
        ))}
      </RadioGroup>
      <div className="grid gap-[16px] md:outline outline-[2px] outline-blue p-[16px]">
        <div className="hidden md:flex flex-col gap-[2px]">
          <p className="text-grey7 text-[12px] leading-[12px]">
            {getCapsuleLabel(
              capsuleInfo?.find((c) => c.capsuleCount === capsuleCount)
                ?.capsuleCount || 0
            )}
          </p>
          <p className="text-[12px] leading-[14px]">
            {capsuleInfo?.find((c) => c.capsuleCount === capsuleCount)?.others}
          </p>
        </div>

        <hr className="border-grey3 h-[1px] mb-[10px] md:hidden" />
        <div className="grid gap-[16px]">
            <OrderSummaryCard2
              imageSrc={orderPackage.imageSrc}
              leftTopText={leftTopText}
              leftCenterText={leftCenterText}
              leftBottomText={leftBottomText}
              rightTopText={rightTopText}
              rightCenterText={rightCenterText}
              rightBottomText={rightBottomText}
              updateQuantityAction={updateQuantityAction}
              isMember={orderPackage.memberType === MemberType.MEMBER}
            />

            {/* TODO: MOBILE SECTION  */}
          <hr className="border-grey3 h-[1px] mt-[10px] md:hidden" />
          <div className="md:hidden grid gap-[7px] md:gap-0 grid-cols-[84px_1fr] items-center w-full">
            <div>
              <p className="text-[32px] leading-[33px] font-inconsolata font-[900] text-black">
                Total
              </p>
              <p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
                {capsules}
                {units === "g" ? `${units}` : ` ${units}`}
              </p>
            </div>

            <div className="grid gap-[7px] text-right">
              <div className="gap-[2px] text-[32px] font-inconsolata font-[900] flex justify-end items-center">
                £{Number((price * capsuleCount) / gPerCount)?.toFixed(2)}{" "}
                <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
                  (£{pricePerCount?.toFixed(2)}/count)
                </span>
              </div>
              <div className="block text-[24px] leading-[24px] text-grey4 md:text-end font-inconsolata whitespace-nowrap">
                RRP{" "}
                <span className="text-[24px] leading-[24px] line-through font-bold font-inconsolata">
                  £{(Number(rrp) ?? 0).toFixed(2)}
                </span>{" "}
                <span className="text-[24px] leading-[24px] font-bold text-blue font-inconsolata whitespace-nowrap">
                  {activePercentageDiscount
                    ? activePercentageDiscount.toFixed(2)
                    : discount.toFixed(2)}
                  % OFF
                </span>
              </div>
            </div>
          </div>

          <Button className="bg-blue text-white w-full font-bold fixed bottom-[0] left-[0] md:relative z-[100]">
            <Link
              className="w-full h-full flex items-center justify-center font-bold font-inconsolata text-base"
              href={`/products/${productId}/checkout?teamId=${teamId}`}
              onClick={() => {
                setCheckoutData(checkoutData);
              }}
            >
              {isFoundingProduct
                ? "CLAIM FOUNDING MEMBER PRICE"
                : firstDelivery
                ? "CLAIM EARLY MEMBER PRICE"
                : "Start My Subscription"}
            </Link>
          </Button>

          {isFoundingProduct && (
            <p className="text-grey6 font-helvetica text-sm leading-[14px] text-center">
              You’ll be notified when your team launches. You’ll have 24 hours
              to withdraw before payment is taken.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
