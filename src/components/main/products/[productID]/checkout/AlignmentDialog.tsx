/** @format */

"use client";
import { useEffect, useState } from "react";
import OrderSummaryCard2 from "@/components/shared/OrderSummaryCard2";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IOrderPackageModel, {
  MemberType,
} from "@/utils/models/IOrderPackageModel";
import { VisuallyHidden } from "@reach/visually-hidden";
import { format, addWeeks } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getQuarterInfo } from "@/utils/utils";

type AlignmentDialogProps = {
  orderPackage: IOrderPackageModel;
  storageCapsuleCount?: number;
  daysUntilNextDrop: number;
  deliveryDate: string;
  updateQuantityAction: (val: number) => void;
  isInfoIconClicked?: boolean;
  setIsInfoIconClicked?: (val: boolean) => void;
  step: number;
  orderDate: string;
  leadTime: number;
  gPerCount: number;
  storageQuantity: number;
  setHasAlignmentPackage: (val: boolean) => void;
  hasSubscriptionPlan: boolean;
};

export default function AlignmentDialog({
  orderPackage,
  daysUntilNextDrop,
  deliveryDate,
  updateQuantityAction,
  isInfoIconClicked,
  setIsInfoIconClicked,
  step,
  orderDate,
  leadTime,
  gPerCount,
  storageQuantity,
  setHasAlignmentPackage,
  hasSubscriptionPlan,
}: Readonly<AlignmentDialogProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const { currentQuarter } = getQuarterInfo();
  const nextQuater = currentQuarter + 1 > 4 ? 1 : currentQuarter + 1;

  const router = useRouter();

  useEffect(() => {
    if ([1].includes(step) || (hasSubscriptionPlan && [3].includes(step)) || isInfoIconClicked) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isInfoIconClicked, step, hasSubscriptionPlan]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nativeEvent = e.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter as HTMLButtonElement | null;

    if (submitter?.value === "yes" && orderPackage.memberType === MemberType.MEMBER) {
      setHasAlignmentPackage(true);
    } else {
      setHasAlignmentPackage(false);
    }

    setIsOpen(false);
  };

  const daysSinceLaunch = orderDate
    ? Math.floor(
        (new Date().getTime() - new Date(orderDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const orderPlusLeadTimeDate = orderDate
    ? addWeeks(new Date(orderDate), leadTime)
    : null;

  const leftTopText =
    storageQuantity +
    " x " +
    orderPackage.alignmentPoucheSize +
    (orderPackage.units === "g"
      ? `${orderPackage.units} Pouch`
      : `${orderPackage.units.slice(0, -1)} Pouch`);

  const rrp = storageQuantity * (orderPackage.alignmentPoucheSize ?? 0) * (orderPackage.rrpPerCount ?? 0)

  const rightCenterText = (
    <div
      className={`text-xl md:text-3xl flex font-[800] text-black items-center gap-1 font-inconsolata`}
    >
      £{(Number(orderPackage.pricePerPoche) * storageQuantity).toFixed(2)}
      <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
        (£{orderPackage.pricePerCount?.toFixed(2)}/count)
      </span>
    </div>
  );

  const rightBottomContent = (
    <div className="hidden md:block text-[20px] leading-[20px] text-grey4 md:text-end font-inconsolata whitespace-nowrap">
      RRP{" "}
      <span className="text-[20px] leading-[20px] line-through font-bold font-inconsolata">
        £{Number(rrp).toFixed(2)}
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
    MEMBER: {
      leftCenter: `Alignment Package`,
      leftBottom: `Ships Today`,
      rightTop: "",
      rightBottom: rightBottomContent,
    },
  } as const;

  const currentMemberType = memberTypeTexts.MEMBER;

  const leftCenterText = currentMemberType.leftCenter;
  const leftBottomText = currentMemberType.leftBottom;
  const rightTopText = currentMemberType.rightTop;
  const rightBottomText = currentMemberType.rightBottom;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-full h-full sm:h-auto sm:max-w-[650px] gap-4 rounded pb-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <DialogHeader
              className={`flex flex-row justify-between items-center relative ${
                orderPackage.memberType !== MemberType.MEMBER
                  ? "pb-[200px] md:pb-[70px]"
                  : "pb-60 md:pb-40"
              }`}
            >
              <DialogTitle
                className={`absolute ${
                  orderPackage.memberType !== MemberType.MEMBER
                    ? "top-[70px] md:top-0"
                    : "top-[120px] md:top-[56px]"
                } left-0 right-0`}
              >
                <h1 className="uppercase text-center font-hagerman text-[18px] md:text-2xl font-normal">
                  {orderPackage.memberType === MemberType.FOUNDING_MEMBER &&
                    "YOU’RE REGISTERING AS A FOUNDING MEMBER"}
                  {orderPackage.memberType === MemberType.MEMBER &&
                    `You have ${daysUntilNextDrop} days until the next drop`}
                  {orderPackage.memberType === MemberType.EARLY_MEMBER &&
                    `You're Joining Early, Before the First Drop Ships`}
                </h1>
                <p className="text-center font-helvetica text-base font-normal mt-2 mb-6 text-[#8E8E93]">
                  {orderPackage.memberType === MemberType.FOUNDING_MEMBER &&
                    `You’ll lock in ${orderPackage.extraDiscount}% extra off for life if you stay in when the team goes live.`}

                  {orderPackage.memberType === MemberType.MEMBER &&
                    orderPackage.stockStatus === "IN_STOCK" &&
                    `Do you want us to send you an alignment package to cover the next ${daysUntilNextDrop} days. This takes you up to ${
                      deliveryDate
                        ? format(new Date(deliveryDate), "MMMM dd yyyy")
                        : ""
                    } and aligns you with the team.`}
                  {orderPackage.memberType === MemberType.MEMBER &&
                    orderPackage.stockStatus === "OUT_OF_STOCK" &&
                    `We’ve run out of alignment packages. The next drop is on ${
                      deliveryDate
                        ? format(new Date(deliveryDate), "MMMM dd yyyy")
                        : ""
                    }, want to secure your spot now?`}
                  {orderPackage.memberType === MemberType.EARLY_MEMBER &&
                    `This team launched ${daysSinceLaunch} days ago and is already in production at ${orderPackage.producer}`}
                </p>
              </DialogTitle>
              {orderPackage.memberType === MemberType.MEMBER && (
                <DialogClose
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 right-0"
                >
                  <div className="border border-grey32 w-10 h-10 rounded-full flex justify-center items-center">
                    <Image
                      src="/images/icons/close-black-icon.svg"
                      alt="Close icon"
                      width={16}
                      height={16}
                    />
                  </div>
                </DialogClose>
              )}
            </DialogHeader>
            <VisuallyHidden>
              <DialogDescription />
            </VisuallyHidden>

            {orderPackage.memberType === MemberType.MEMBER &&
              orderPackage.stockStatus === "IN_STOCK" && (
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
                  isAlignmentDialog={true}
                  isUpdatableQuantity={true}
                  step={step}
                  gPerCount={gPerCount}
                  pochesRequired={orderPackage?.pochesRequired ?? 0}
                  className="bg-[#F6F6F6] p-4 mb-6"
                />
              )}
            {orderPackage.memberType !== MemberType.MEMBER && (
              <div className="bg-[#F6F6F6] p-6">
                <h3 className="font-hagerman text-lg font-normal mb-2 text-black">
                  {orderPackage.memberType === MemberType.FOUNDING_MEMBER &&
                    "We’ll notify you when the team launches and orders go to the lab."}
                  {orderPackage.memberType === MemberType.EARLY_MEMBER &&
                    `As an Early Member, you’re locking in an extra ${orderPackage.extraDiscount}% off for life.`}
                </h3>
                {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                  <p className="font-helvetica text-sm font-normal mb-8 text-grey4">
                    Once all founding slots are filled, your order will go to{" "}
                    {orderPackage.producer} for production. We’ll email you with
                    your delivery date and give you 24h before charging
                  </p>
                )}

                {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                  <p className="text-[#303030] font-inconsolata text-sm font-normal mb-2">
                    Your Launch Package Includes:
                  </p>
                )}
                {orderPackage.memberType === MemberType.EARLY_MEMBER && (
                  <p className="text-[#303030] font-inconsolata text-sm font-normal mb-6">
                    Launch package will ship on{" "}
                    {orderPlusLeadTimeDate
                      ? format(new Date(orderPlusLeadTimeDate), "MMMM dd yyyy")
                      : ""}{" "}
                    and will include:
                  </p>
                )}

                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col items-center justify-center bg-white rounded-xl w-full h-[145px]">
                    <Image
                      src="/images/supplement-mockup.png"
                      alt="product icon"
                      width={61}
                      height={61}
                    />
                    <p className="text-black font-inconsolata text-base font-semibold my-0.5">
                      Alignment Package
                    </p>
                    {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                      <p className="text-grey4 font-inconsolata text-sm font-normal text-center">
                        Capsules to cover you until the first drop
                      </p>
                    )}
                    {orderPackage.memberType === MemberType.EARLY_MEMBER && (
                      <p className="text-grey4 font-inconsolata text-sm font-normal text-center">
                        {(orderPackage?.pochesRequired ?? 0) *
                          orderPackage.storageCapsuleCount}{" "}
                        x {orderPackage.alignmentPoucheSize}
                        {orderPackage.units === "g"
                          ? `${orderPackage.units} Pouch`
                          : `${orderPackage.units.slice(0, -1)} Pouch`}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center bg-white rounded-xl w-full h-[145px]">
                    <Image
                      src="/images/supplement-mockup.png"
                      alt="product icon"
                      width={61}
                      height={61}
                    />
                    <p className="text-black font-inconsolata text-base font-semibold my-0.5">
                      {orderPackage.memberType === MemberType.FOUNDING_MEMBER
                        ? "1st Quarterly Drop"
                        : `Q${nextQuater} Drop`}
                    </p>
                    <p className="text-grey4 font-inconsolata text-sm font-normal">
                      {orderPackage.capsuleCount * orderPackage.days} capsule
                      pouch
                    </p>
                  </div>
                </div>

                <div className="bg-blue2 w-full rounded-full mt-6">
                  {orderPackage.memberType === MemberType.FOUNDING_MEMBER && (
                    <p className="text-blue font-inconsolata text-sm font-semibold py-1.5 text-center">
                      Reminder: You don’t need to do anything — we’ll notify you
                      before charging.
                    </p>
                  )}
                  {orderPackage.memberType === MemberType.EARLY_MEMBER && (
                    <p className="text-blue font-inconsolata text-sm font-semibold py-1.5 text-center">
                      Estimated delivery:{" "}
                      {orderPlusLeadTimeDate
                        ? format(
                            new Date(orderPlusLeadTimeDate),
                            "MMMM dd yyyy"
                          )
                        : ""}
                    </p>
                  )}
                </div>
                {orderPackage.memberType === MemberType.EARLY_MEMBER && (
                  <p className="text-grey4 font-inconsolata text-sm font-normal text-center mt-2">
                    We’ll email you when your shipment is on its way.
                  </p>
                )}
              </div>
            )}
          </div>

          {orderPackage.memberType === MemberType.MEMBER && (
            <div className="flex flex-col gap-4 mb-[70px] md:mb-6">
              <Button
                type="submit"
                className={`text-white text-[16px] md:text-[18px] font-inconsolata w-full ml-auto font-bold bg-blue`}
                value={orderPackage.stockStatus === "IN_STOCK" ? "yes" : "no"}
              >
                Yes
              </Button>
              <Button
                type={
                  orderPackage.stockStatus === "IN_STOCK" ? "submit" : "button"
                }
                className={`text-blue text-[16px] md:text-[18px] font-inconsolata w-full ml-auto font-bold bg-[#7878801F]`}
                value={orderPackage.stockStatus === "IN_STOCK" ? "no" : ""}
                onClick={() => {
                  if (orderPackage.stockStatus === "OUT_OF_STOCK") {
                    router.back();
                  }
                }}
              >
                No
              </Button>
            </div>
          )}
          {orderPackage.memberType !== MemberType.MEMBER && (
            <div className="flex flex-col gap-4 mt-1 mb-[70px] md:mb-6">
              <Button
                type="submit"
                className={`text-white text-[16px] md:text-[18px] font-inconsolata w-full ml-auto font-bold bg-blue`}
                value="yes"
                onClick={() => {
                  setIsInfoIconClicked?.(false);
                }}
              >
                Ok
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
