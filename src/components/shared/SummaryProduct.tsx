/** @format */

"use client";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import Image from "next/image";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
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

export default function SummaryProduct({
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
}>) {
  const [totalCount, setTotalCount] = useState(0);
  const [totalRrp, setTotalRrp] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const context = useUser();
  const [firstWord, ...rest] = (model.name ?? "").split(" ");

  const [localStorageQuantity] = useLocalStorage("storageQuantity", 0);
  const [storageQuantityState, setStorageQuantityState] =
    useState(localStorageQuantity);

  const { next2QuarterShort, nextQuarter } = getQuarterInfo();

  const nextYearDate = new Date();
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);

  const membershipRrp = Number(process.env.NEXT_PUBLIC_MEMBERSHIP_RRP);
  const membershipAmount = Number(process.env.NEXT_PUBLIC_MEMBERSHIP_AMOUNT);
  const membershipPrice = Number(process.env.NEXT_PUBLIC_MEMBERSHIP_PRICE);
  const membershipDiscount = Number(
    process.env.NEXT_PUBLIC_MEMBERSHIP_DISCOUNT
  );
  const membershipExpiry = format(nextYearDate, "MMMM dd yyyy");

  useEffect(() => {
    if (!storageQuantity || storageQuantity === 0) {
      setStorageQuantityState(localStorageQuantity);
      setStorageQuantity(localStorageQuantity);
    }
  }, [localStorageQuantity]);

  useEffect(() => {
    let totalPrice = orderPackage.price;

    if (
      [MemberType.FOUNDING_MEMBER, MemberType.EARLY_MEMBER].includes(
        orderPackage.memberType
      )
    ) {
      totalPrice = orderPackage.price;
      setTotalRrp(orderPackage.rrp);
    } else if (orderPackage.memberType === MemberType.MEMBER) {
      if (hasAlignmentPackage) {
        totalPrice =
          (orderPackage?.pricePerPoche ?? 0) *
            (storageQuantityState ?? storageQuantity) +
          orderPackage.price;
        setTotalRrp(memberTypeRrp + orderPackage.rrp);
      } else {
        totalPrice = orderPackage.price;
        setTotalRrp(orderPackage.rrp);
      }
    }

    setTotalCount(totalPrice);
  }, [
    orderPackage,
    storageQuantityState,
    storageQuantity,
    hasAlignmentPackage,
  ]);

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

  const totalQuarterlyCapsules = Number(orderPackage.capsuleCount) * Number(orderPackage.days)

  const totalDiscountPercentage =
    (orderPackage.discount ?? 0) +
    (Number(orderPackage.extraDiscount ?? 0) ?? 0);
  const totalDiscountAmount = (totalRrp ?? 0) * (totalDiscountPercentage / 100);

  const memberTypeRrp =
    storageQuantity *
    (orderPackage.alignmentPoucheSize ?? 0) *
    (orderPackage.rrpPerCount ?? 0);

  const rightBottomContent = (
    <div className="text-[14px] md:text-[20px] leading-[20px] text-grey4 md:text-end font-inconsolata whitespace-nowrap">
      RRP{" "}
      <span className="text-[14px] md:text-[20px] leading-[20px] line-through font-bold font-inconsolata">
        £{(Number(orderPackage.rrp) ?? 0).toFixed(0)}
      </span>{" "}
      <span className="text-[14px] md:text-[20px] leading-[20px] font-bold text-blue font-inconsolata whitespace-nowrap">
        {(
          Number(orderPackage.discount ?? 0) +
          Number(orderPackage.extraDiscount ?? 0)
        ).toFixed(0)}
        % OFF
      </span>
      <br/>
      {orderPackage.memberType === MemberType.EARLY_MEMBER && (
        <div className="text-[10px] md:text-[14px] leading-[20px] text-[#00038F] font-inconsolata text-right mt-[-4px] md:mt-0">
          Early Member Pricing
        </div>
      )}
    </div>
  );

  const memberTypeTexts = {
    FOUNDING_MEMBER: {
      leftTop: `${
        (orderPackage.capsuleCount * orderPackage.days) /
        (orderPackage?.gPerCount ?? 0)
      }${orderPackage.units === 'grams' ? 'g' : ' capsules'}`,
      leftCenter: "FOUNDING MEMBER",
      leftBottom: `${orderPackage.extraDiscount}% OFF TEAM PRICE. FOREVER`,
      rightTop: "Founding Membership",
      rightCenter: (
        <div
          className={`text-xl md:text-3xl leading-[14px] md:leading-[30px] flex flex-col md:flex-row font-[800] text-black items-center gap-1 font-inconsolata`}
        >
          £{Number(orderPackage.price).toFixed(2)}
          <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
            (£{orderPackage.pricePerCount?.toFixed(2)}/count)
          </span>
        </div>
      ),
      rightBottom: `${orderPackage.remainingSpots} Founder Spots Remaining!`,
    },
    EARLY_MEMBER: {
      leftTop: `${
        (orderPackage?.pochesRequired ?? 0) * orderPackage.storageCapsuleCount * (orderPackage.alignmentPoucheSize ?? 0) + totalQuarterlyCapsules
      } ${
        `${orderPackage.units === 'grams' ? 'g' : ' capsules'} Total`
      }`,
      leftCenter: "LAUNCH PACKAGE",
      leftBottom: `Takes you up to: ${next2QuarterShort} Drop`,
      rightTop: "Includes Early Member 5% Extra Discount",
      rightCenter: (
        <div
          className={`text-xl md:text-3xl leading-[14px] md:leading-[30px] flex flex-col md:flex-row font-[800] text-black items-center gap-1 font-inconsolata`}
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
      rightCenter: (
        <div
          className={`text-xl md:text-3xl leading-[14px] md:leading-[30px] flex flex-col md:flex-row font-[800] text-black items-center gap-1 font-inconsolata`}
        >
          £{(Number(orderPackage.pricePerPoche) * storageQuantity).toFixed(2)}
          <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
            (£{orderPackage.pricePerCount?.toFixed(2)}/count)
          </span>
        </div>
      ),
      rightBottom: (
        <div className="text-[14px] md:text-[20px] leading-[20px] text-grey4 md:text-end font-inconsolata whitespace-nowrap">
          RRP{" "}
          <span className="text-[14px] md:text-[20px] leading-[20px] line-through font-bold font-inconsolata">
            £{Number(memberTypeRrp).toFixed(2)}
          </span>{" "}
          <span className="text-[14px] md:text-[20px] leading-[20px] font-bold text-blue font-inconsolata whitespace-nowrap">
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

  const leftTopText = currentMemberType.leftTop;
  const leftCenterText = currentMemberType.leftCenter;
  const leftBottomText = currentMemberType.leftBottom;
  const rightTopText = currentMemberType.rightTop;
  const rightCenterText = currentMemberType.rightCenter;
  const rightBottomText = currentMemberType.rightBottom;

  return (
    <div
      key={model?.id}
      className={`grid gap-[24px] py-[16px] md:py-[24px] bg-grey12  p-[24px] ${className} h-max`}
    >
      {!showOnlyTotal && (
        <>
          <h1 className="hidden md:block text-[24px] leading-[27px] font-hagerman text-blue mb-[8px]">
            {isTopUp && !isReactivatePlan ? "TOP UP ORDER SUMMARY" : "ORDER SUMMARY"}
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
                      {isTopUp ? Number(model.quantityOfSubUnitPerOrder ?? 0): orderPackage.memberType === MemberType.EARLY_MEMBER?(orderPackage?.pochesRequired ?? 0) * orderPackage.storageCapsuleCount * (orderPackage.alignmentPoucheSize ?? 0) + totalQuarterlyCapsules: (Number(model.quantityOfSubUnitPerOrder ?? 0) *
                        (orderPackage?.capsuleCount ?? 0)) /
                        (orderPackage?.gPerCount ?? 0) }
                      {model.unitsOfMeasurePerSubUnit === "grams" ? "g" : ` ${model.unitsOfMeasurePerSubUnit}`}
                    </p>
                  </div>
                )}
            </div>
          )}

         {!isTopUp && !isReactivatePlan && <hr className="border-grey3 border" />}

          {(!isTopUp && !isReactivatePlan) && (
            <>
              {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                <div className="font-inconsolata bg-blue2 rounded-sm">
                  <p className="text-blue font-inconsolata text-[12px] md:text-sm leading-[20px] md:leading-[14px] font-bold py-2 text-center px-2 md:px-8">
                    FOUNDING MEMBER PRICING – You’re claiming a spot before
                    stock arrives and securing an extra{" "}
                    {orderPackage.extraDiscount}% off for life.
                  </p>
                </div>
              )}
              {orderPackage.memberType === MemberType.EARLY_MEMBER && (
                <div className="font-inconsolata bg-blue2 rounded-sm">
                  <p className="text-blue font-inconsolata text-[12px] md:text-sm leading-[20px] md:leading-[14px] font-bold py-2 text-center px-2 md:px-8">
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
                  <p className="text-[14px] md:text-xl font-bold font-inconsolata">
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

          {model.name && orderPackage.memberType === MemberType.MEMBER && (
            <>
              {(hasAlignmentPackage &&
                (storageQuantityState ?? storageQuantity) &&
                (storageQuantityState ?? storageQuantity) > 0) ||
              (isReactivatePlan && hasAlignmentPackage) ? (
                <div>
                  <p className="text-[14px] md:text-xl font-bold font-inconsolata mb-4">
                    DISPATCHED TODAY - ROYAL MAIL 48H
                  </p>
                  <OrderSummaryCard2
                    imageSrc={orderPackage.imageSrc}
                    leftTopText={leftTopText}
                    leftCenterText={leftCenterText}
                    leftBottomText={leftBottomText}
                    rightTopText={rightTopText}
                    rightCenterText={rightCenterText}
                    rightBottomText={rightBottomText}
                    updateQuantityAction={(val) => {
                      setStorageQuantity(val);
                      setStorageQuantityState(val);
                    }}
                    storageQuantityState={storageQuantityState}
                    isMember={orderPackage.memberType === MemberType.MEMBER}
                    isAlignmentDialog={false}
                    isUpdatableQuantity={isReactivatePlan ? false : true}
                    step={step}
                    gPerCount={orderPackage?.gPerCount ?? 0}
                    pochesRequired={orderPackage?.pochesRequired ?? 0}
                  />
                </div>
              ) : (
                <>
                  {!isReactivatePlan && step !== 4 && (
                    <Button
                      variant="link"
                      className="text-center w-fit mx-auto flex justify-center"
                      onClick={() => {
                        setStorageQuantity(1);
                        setStorageQuantityState(1);
                        setHasAlignmentPackage(true);
                      }}
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

          {!isReactivatePlan && model.name && (
            <div>
             {!isTopUp && <>
              {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
                <p className="text-[14px] md:text-xl font-bold font-inconsolata mb-1 md:mb-4 uppercase">
                  DELIVERED {orderPackage.deliveryDate} • (IN{" "}
                  {daysUntilNextDrop} DAYS)
                </p>
              )}
              {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                <p className="text-[14px] md:text-xl font-bold font-inconsolata mb-1 md:mb-4">
                  Quarterly Subscription
                </p>
              )}
              </>}
              <OrderSummaryCard2
                imageSrc={orderPackage.imageSrc}
                leftTopText={
                 !isTopUp ? (orderPackage.memberType === MemberType.MEMBER
                    ? `${
                        Number(orderPackage.capsuleCount) *
                        Number(orderPackage.days)
                      }${orderPackage.units} Every 3 months`
                    : leftTopText ): `${storageQuantity}${orderPackage.units} Top Up`
                }
                leftCenterText={
                  !isTopUp ? (orderPackage.memberType === MemberType.MEMBER
                    ? `Q${nextQuarter} DROP`
                    : leftCenterText
                  ) : 'Alignment Package'
                }
                leftBottomText={
                  !isTopUp ? (orderPackage.memberType === MemberType.MEMBER
                    ? `FREE DELIVERY • ${orderPackage.deliveryDate?.toUpperCase()}`
                    : leftBottomText
                  ) : 'Ships Today'
                }
                rightTopText={rightTopText}
                rightCenterText={
                  orderPackage.memberType === MemberType.MEMBER ? (
                    <div
                      className={`text-xl md:text-3xl flex flex-col md:flex-row font-[800] text-black items-center gap-1 font-inconsolata`}
                    >
                      £{Number(orderPackage.price).toFixed(2)}
                      <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
                        (£{orderPackage.pricePerCount?.toFixed(2)}/count)
                      </span>
                    </div>
                  ) : (
                    rightCenterText
                  )
                }
                rightBottomText={
                  orderPackage.memberType === MemberType.MEMBER
                    ? rightBottomContent
                    : rightBottomText
                }
                storageQuantityState={storageQuantityState}
                isMember={orderPackage.memberType !== MemberType.MEMBER}
                isAlignmentDialog={false}
                isUpdatableQuantity={false}
                gPerCount={orderPackage?.gPerCount ?? 0}
                pochesRequired={orderPackage?.pochesRequired ?? 0}
              />
            </div>
          )}

          {!hasActiveSupplement &&
            orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
              <>
                <hr className="border-grey3 border" />

                <div>
                  <p className="text-[14px] md:text-xl font-bold font-inconsolata">
                    Membership Fee
                  </p>

                  <p className="text-[12px] md:text-base leading-[14px] md:leading-[16px] font-inconsolata text-grey16">
                    Membership trial begins only once your team launches — not
                    before.
                  </p>
                </div>

                <OrderSummaryCard2
                  imageSrc={`/images/membership-card.svg`}
                  isMembership={true}
                  leftTopText={`Free for your first 2 drops`}
                  leftCenterText={`Renews at £${membershipAmount}/year`}
                  leftBottomText={`Renews on ${membershipExpiry}`}
                  rightTopText={
                    <p className="text-xl text-black font-bold font-inconsolata">
                      £{membershipPrice.toFixed(2)}
                    </p>
                  }
                  rightCenterText={
                    <div className="hidden md:block text-[20px] leading-[20px] text-grey4 md:text-end font-inconsolata whitespace-nowrap">
                      RRP{" "}
                      <span className="text-[20px] leading-[20px] line-through font-bold font-inconsolata">
                        £{membershipRrp.toFixed(2)}
                      </span>{" "}
                      <span className="text-[20px] leading-[20px] font-bold text-blue font-inconsolata whitespace-nowrap">
                        {membershipDiscount}% OFF
                      </span>
                    </div>
                  }
                  rightBottomText={""}
                  updateQuantityAction={(val) => {
                    setStorageQuantity(val);
                    setStorageQuantityState(val);
                  }}
                  storageQuantityState={storageQuantityState}
                  isMember={
                    orderPackage.memberType === MemberType.FOUNDING_MEMBER
                  }
                  isAlignmentDialog={false}
                  isUpdatableQuantity={false}
                  gPerCount={orderPackage?.gPerCount ?? 0}
                  pochesRequired={orderPackage?.pochesRequired ?? 0}
                />
              </>
            )}

          {!isReactivatePlan && (
            <>
              {context?.user &&
                orderPackage.memberType !== MemberType.FOUNDING_MEMBER && step !== 4 && (
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
            </>
          )}

          {referralInfo?.referrer?.name && (
            <div>
              <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata mb-4">
              Referral Code
            </p>
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
            </div>
          )}
          <hr className="border-grey3 border" />

          { orderPackage.memberType === MemberType.FOUNDING_MEMBER && !isReactivatePlan && (
            <div className="font-inconsolata bg-blue2 rounded-sm">
              <p className="text-blue font-inconsolata text-[12px] md:text-sm leading-[13px] md:leading-[14px] font-bold text-center py-2 px-2.5">
                Founder slot secured. You’ll be notified when the team is ready
                and charged <br /> only if you stay in.
              </p>
            </div>
          )}

          <div className="grid gap-[10px]">
            {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
              <div className="flex justify-between items-center">
                <p className="text-grey16 text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                  RRP
                </p>
                <p className="text-black text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
                  £{totalRrp?.toFixed(2)}
                </p>
              </div>
            )}
            {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
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
            <p className="text-[24px] md:text-[32px] leading-[33px] font-inconsolata font-[900] text-black whitespace-nowrap">
              {orderPackage.memberType === MemberType.FOUNDING_MEMBER
                ? "Founder Price"
                : "Total"}
            </p>
          </div>

          <div className="grid gap-[7px] text-right">
            <div className="gap-[2px] text-[24px] md:text-[32px] font-inconsolata font-[900] flex justify-end items-center">
              £{totalCount?.toFixed(2)}{" "}
            </div>
          </div>
        </div>
        {!isReactivatePlan && (
          <>
            {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
              <hr className="border-grey3 border my-6" />
            )}
            {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
              <p className="text-[14px] md:text-[20px] md:leading-[16px] font-[600] font-inconsolata mb-6">
                SUBSCRIPTIONS
              </p>
            )}
            {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
              <p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata mb-4">
                Quarterly Drop Subscription
              </p>
            )}
            {orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
              <OrderSummaryCard2
                imageSrc={orderPackage.imageSrc}
                leftTopText={`${
                  Number(orderPackage.capsuleCount) * Number(orderPackage.days)
                }${orderPackage.units} Every 3 months`}
                leftCenterText={
                  orderPackage.memberType === MemberType.EARLY_MEMBER
                    ? `EARLY MEMBER`
                    : `QUARTERLY SUBSCRIPTION`
                }
                leftBottomText={
                  <p className="text-sm text-grey4 font-normal font-inconsolata relative">
                    Next Subscription Billed: <br />
                    <span className="absolute text-sm text-grey4 font-normal font-inconsolata">
                      {nextEditableDate
                        ? format(new Date(nextEditableDate), "MMMM dd yyyy")
                        : ""}
                    </span>
                  </p>
                }
                rightTopText={
                  orderPackage.memberType === MemberType.EARLY_MEMBER
                    ? `Early Bird Pricing Forever`
                    : ``
                }
                rightCenterText={
                  <div
                    className={`text-xl  leading-[20px] flex !font-bold text-black font-inconsolata`}
                  >
                    £{Number(orderPackage.price).toFixed(2)}
                  </div>
                }
                rightBottomText={rightBottomText}
                updateQuantityAction={(val) => {
                  setStorageQuantity(val);
                  setStorageQuantityState(val);
                }}
                storageQuantityState={storageQuantityState}
                isMember={orderPackage.memberType === MemberType.MEMBER}
                isAlignmentDialog={false}
                isUpdatableQuantity={false}
                gPerCount={orderPackage?.gPerCount ?? 0}
                pochesRequired={orderPackage?.pochesRequired ?? 0}
                className="mb-11"
              />
            )}
            {!hasActiveSupplement &&
              orderPackage.memberType !== MemberType.FOUNDING_MEMBER && (
                <>
                  <div>
                    <p className="text-base font-bold font-inconsolata mb-4">
                      Membership Fee
                    </p>
                  </div>

                  <OrderSummaryCard2
                    imageSrc={`/images/membership-card.svg`}
                    isMembership={true}
                    leftTopText={`Free for your first 2 drops`}
                    leftCenterText={`Renews at £${membershipAmount}/year`}
                    leftBottomText={`Renews on ${membershipExpiry}`}
                    rightTopText={
                      <p className="text-xl text-black font-bold font-inconsolata">
                        £{membershipPrice.toFixed(2)}
                      </p>
                    }
                    rightCenterText={
                      <div className="hidden md:block text-[20px] leading-[20px] text-grey4 md:text-end font-inconsolata whitespace-nowrap">
                        RRP{" "}
                        <span className="text-[20px] leading-[20px] line-through font-bold font-inconsolata">
                          £{membershipRrp.toFixed(2)}
                        </span>{" "}
                        <span className="text-[20px] leading-[20px] font-bold text-blue font-inconsolata whitespace-nowrap">
                          {membershipDiscount}% OFF
                        </span>
                      </div>
                    }
                    rightBottomText={""}
                    updateQuantityAction={(val) => {
                      setStorageQuantity(val);
                      setStorageQuantityState(val);
                    }}
                    storageQuantityState={storageQuantityState}
                    isMember={false}
                    isAlignmentDialog={false}
                    isUpdatableQuantity={false}
                    gPerCount={orderPackage?.gPerCount ?? 0}
                    pochesRequired={orderPackage?.pochesRequired ?? 0}
                  />
                </>
              )}
            <div className="grid gap-[10px]">{children}</div>
          </>
        )}
      </div>
    </div>
  );
}
