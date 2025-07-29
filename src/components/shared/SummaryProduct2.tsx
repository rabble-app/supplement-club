/** @format */

"use client";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import IOrderPackageModel, {
  MemberType,
} from "@/utils/models/IOrderPackageModel";
import OrderSummaryCard2 from "./OrderSummaryCard2";
import { getQuarterInfo } from "@/utils/utils";

export default function SummaryProduct2({
  model,
  storageQuantity,
  setStorageQuantity,
  orderPackage,
  daysUntilNextDrop,
  className,
  children,
  showOnlyTotal,
  step,
  referralInfo,
  setIsReferralCodeApplied,
  setIsInfoIconClicked,
  hasAlignmentPackage,
  setHasAlignmentPackage,
  hasActiveSupplement,
  nextEditableDate,
  isReactivatePlan,
  isTopUp,
  type,
}: Readonly<{
  model: ISummaryProductModel;
  storageQuantity: number;
  setStorageQuantity: (val: number) => void;
  orderPackage: IOrderPackageModel;
  daysUntilNextDrop: number;
  className?: string;
  showOnlyTotal?: boolean;
  children?: React.ReactNode;
  step?: number;
  referralInfo?: IReferalInfoModel;
  setIsReferralCodeApplied?: (val: boolean) => void;
  setIsInfoIconClicked?: (val: boolean) => void;
  hasAlignmentPackage: boolean;
  setHasAlignmentPackage: (val: boolean) => void;
  hasActiveSupplement: boolean;
  nextEditableDate: string;
  isReactivatePlan?: boolean;
  isTopUp?: boolean;
  type?: string;
}>) {
  const [totalCount, setTotalCount] = useState(0);
  const [totalRrp, setTotalRrp] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const context = useUser();
  const [firstWord, ...rest] = (model.name ?? "").split(" ");

  const { currentQuarter } = getQuarterInfo();
  const nextQuater = currentQuarter + 1 > 4 ? 1 : currentQuarter + 1;

  const nextYearDate = new Date();
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);

  useEffect(() => {
    let totalPrice = orderPackage.price;

    if (
      [
        MemberType.FOUNDING_MEMBER,
        MemberType.EARLY_MEMBER,
        MemberType.MEMBER,
      ].includes(orderPackage.memberType)
    ) {
      totalPrice = orderPackage.price;
      setTotalRrp(orderPackage.rrp);
    }

    setTotalCount(totalPrice);
  }, [
    orderPackage,
    hasAlignmentPackage,
  ]);

  const totalDiscountPercentage =
    (orderPackage.discount ?? 0) +
    (Number(orderPackage.extraDiscount ?? 0) ?? 0);
  const totalDiscountAmount = (totalRrp ?? 0) * (totalDiscountPercentage / 100);

  const memberTypeRrp =
    storageQuantity *
    (orderPackage.alignmentPoucheSize ?? 0) *
    (orderPackage.rrpPerCount ?? 0);

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
      leftTop: `${
        (orderPackage.capsuleCount * orderPackage.days) /
        (orderPackage?.gPerCount ?? 0)
      }${orderPackage.units} Every 3 months`,
      leftCenter: "FOUNDING MEMBER",
      leftBottom: `${orderPackage.extraDiscount}% OFF TEAM PRICE. FOREVER`,
      rightTop: "Founding Membership",
      rightCenter: (
        <div
          className={`text-xl md:text-3xl md:leading-[30px] flex font-[800] text-black items-center gap-1 font-inconsolata`}
        >
          £{Number(orderPackage.price).toFixed(2)}
          <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
            (£{orderPackage.pricePerCount?.toFixed(2)}/count)
          </span>
        </div>
      ),
      rightBottom: `${orderPackage.remainingSpots} Founding Member Spots Remaining!`,
    },
    EARLY_MEMBER: {
      leftTop: `${
        (orderPackage?.pochesRequired ?? 0) * orderPackage.storageCapsuleCount
      } x ${orderPackage.alignmentPoucheSize} ${
        orderPackage.units === "g"
          ? `${orderPackage.units} Pouch`
          : `${orderPackage.units.slice(0, -1)} Pouch`
      }`,
      leftCenter: "LAUNCH PACKAGE",
      leftBottom: `Takes you up to: ${
        nextEditableDate
          ? format(new Date(nextEditableDate), "MMMM dd yyyy")
          : ""
      } Drop`,
      rightTop: "Includes Early Member 5% Extra Discount",
      rightCenter: (
        <div
          className={`text-xl md:text-3xl md:leading-[30px] flex font-[800] text-black items-center gap-1 font-inconsolata`}
        >
          £{Number(orderPackage.price).toFixed(2)}
          <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
            (£{orderPackage.pricePerCount?.toFixed(2)}/count)
          </span>
        </div>
      ),
      rightBottom: rightBottomContent,
    },
    MEMBER: {
      leftTop:
        storageQuantity +
        " x " +
        orderPackage.alignmentPoucheSize +
        (orderPackage.units === "g"
          ? `${orderPackage.units} Pouch`
          : `${orderPackage.units.slice(0, -1)} Pouch`),
      leftCenter: `Alignment Package`,
      leftBottom: `Ships Today`,
      rightTop: "",
      rightCenter:(
        <div
          className={`text-xl md:text-3xl md:leading-[30px] flex font-[800] text-black items-center gap-1 font-inconsolata`}
        >
          £{Number(orderPackage.price).toFixed(2)}
          <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
            (£{orderPackage.pricePerCount?.toFixed(2)}/count)
          </span>
        </div>
      ),
      rightBottom: (
        <div className="hidden md:block text-[20px] leading-[20px] text-grey4 md:text-end font-inconsolata whitespace-nowrap">
          RRP{" "}
          <span className="text-[20px] leading-[20px] line-through font-bold font-inconsolata">
            £{Number(memberTypeRrp).toFixed(2)}
          </span>{" "}
          <span className="text-[20px] leading-[20px] font-bold text-blue font-inconsolata whitespace-nowrap">
            {(
              Number(orderPackage.discount ?? 0) +
              Number(orderPackage.extraDiscount ?? 0)
            ).toFixed(2)}
            % OFF
          </span>
        </div>
      ),
    },
  } as const;

  const currentMemberType =
    memberTypeTexts[orderPackage.memberType as keyof typeof memberTypeTexts] ||
    memberTypeTexts.MEMBER;

  const rightCenterText = currentMemberType.rightCenter;

  return (
    <div
      key={model?.id}
      className={`grid gap-[24px] py-[16px] md:py-[24px] bg-grey12  p-[24px] ${className} h-max`}
    >
      {!showOnlyTotal && (
        <>
          <h1 className="text-[24px] leading-[27px] font-hagerman text-blue mb-[8px]">
            {type === "topUp" ? "TOP UP ORDER SUMMARY" : "ORDER SUMMARY"}
          </h1>

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
                      {!isTopUp
                        ? (Number(model.quantityOfSubUnitPerOrder ?? 0) *
                            (orderPackage?.capsuleCount ?? 0)) /
                          (orderPackage?.gPerCount ?? 0)
                        : Number(model.quantityOfSubUnitPerOrder ?? 0) + " "}
                      {model.unitsOfMeasurePerSubUnit}
                    </p>
                  </div>
                )}
            </div>
          )}

          {!isTopUp && !isReactivatePlan && (
            <hr className="border-grey3 border" />
          )}

          {!isTopUp && !isReactivatePlan && (
            <>
              {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                <div className="font-inconsolata bg-blue2 rounded-sm">
                  <p className="text-blue font-inconsolata text-sm leading-6 font-bold py-2 text-center px-8">
                    FOUNDING MEMBER PRICING – You’re claiming a spot before
                    stock arrives and securing an extra{" "}
                    {orderPackage.extraDiscount}% off for life.
                  </p>
                </div>
              )}
              {orderPackage.memberType === MemberType.EARLY_MEMBER && (
                <div className="font-inconsolata bg-blue2 rounded-sm">
                  <p className="text-blue font-inconsolata text-sm leading-6 font-bold py-2 text-center px-8">
                    EARLY MEMBER PRICING – You’re ordering before stock arrives
                    and securing an extra {orderPackage.extraDiscount}% off for
                    life.
                  </p>
                </div>
              )}
            </>
          )}

          {!isReactivatePlan && (
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold font-inconsolata">
                    {orderPackage.memberType === MemberType.FOUNDING_MEMBER &&
                      "LAUNCH PACKAGE"}
                    {orderPackage.memberType !== MemberType.FOUNDING_MEMBER &&
                      "BILLED TODAY"}
                  </p>
                  {orderPackage.memberType !== MemberType.MEMBER && (
                    <Image
                      src="/images/icons/info-icon.svg"
                      alt="arrow right icon"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => setIsInfoIconClicked?.(true)}
                    />
                  )}
                </div>
                {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                  <p className="text-xs font-bold text-blue bg-[#E5E6F4] px-2.5 py-1.5 rounded-full font-inconsolata">
                    Reserved at £{orderPackage.pricePerCount?.toFixed(2)} /
                    count
                  </p>
                )}
              </div>
              <hr className="bg-grey3 h-[1.5px] mt-6" />
            </div>
          )}

          {model.name && (
            <>
              {hasAlignmentPackage &&
              (isReactivatePlan && hasAlignmentPackage) ? (
                <div>
                  <p className="text-xl font-bold font-inconsolata mb-4">
                    DISPATCHED TODAY - ROYAL MAIL 48H
                  </p>
                  <OrderSummaryCard2
                    imageSrc={orderPackage.imageSrc}
                    leftTopText={`${
                      type === "topUp"
                        ? `${storageQuantity}${orderPackage.units} Top Up`
                        : `${model.quantityOfSubUnitPerOrder}${orderPackage.units} to see you to Q${nextQuater}`
                    }`}
                    leftCenterText={
                      type !== "topUp"
                        ? "One time Alignment Package"
                        : "Alignment Package"
                    }
                    leftBottomText="Ships Today"
                    rightTopText=""
                    rightCenterText={rightCenterText}
                    rightBottomText=""
                    isMember={orderPackage.memberType === MemberType.MEMBER}
                    isAlignmentDialog={false}
                    isUpdatableQuantity={isReactivatePlan ? false : true}
                    step={step}
                    gPerCount={orderPackage?.gPerCount ?? 0}
                    pochesRequired={orderPackage?.pochesRequired ?? 0}
                    isReactivatePlan={isReactivatePlan}
                  />
                </div>
              ) : (
                <>
                  {!isReactivatePlan && (
                    <Button
                      variant="link"
                      className="text-center w-fit mx-auto flex justify-center"
             
                    >
                      <p className="text-black font-inconsolata font-bold text-base underline text-center w-full">
                        Add My Alignment Package
                      </p>
                    </Button>
                  )}
                </>
              )}
            </>
          )}

          <hr className="border-grey3 border" />
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
          <hr className="border-grey3 border" />
        </>
      )}

      <div>
        <div className="grid gap-[7px] md:gap-0 grid-cols-[84px_1fr]">
          <div>
            <p className="text-[32px] leading-[33px] font-inconsolata font-[900] text-black whitespace-nowrap">
              {orderPackage.memberType === MemberType.FOUNDING_MEMBER
                ? "Founder Price"
                : "Total"}
            </p>
          </div>

          <div className="grid gap-[7px] text-right">
            <div className="gap-[2px] text-[32px] font-inconsolata font-[900] flex justify-end items-center">
              £{totalCount?.toFixed(2)}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
