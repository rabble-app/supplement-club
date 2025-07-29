/** @format */

"use client";
import Image from "next/image";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import { useState, type ReactNode } from "react";
import OptBackInDialog from "../subscription-managment/OptBackInDialog";
import ReactivatePlanDialog from "../subscription-managment/ReactivatePlanDialog";
import { Ellipsis } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import SubscriptionUnregisterDialog from "../subscription-managment/SubscriptionUnregisterDialog";
import useProduct from "@/hooks/useProduct";
import { useUser } from "@/contexts/UserContext";
import { addQuarters, format, startOfQuarter } from "date-fns";

const ConditionalLink = ({
  href,
  condition,
  children,
}: Readonly<{
  href: string;
  condition: boolean;
  children: ReactNode;
}>) => {
  if (condition) {
    return <Link href={href}>{children}</Link>;
  }
  return <>{children}</>;
};

export default function ManagePlanCard({
  model,
  unregisterMembership,
  setIsSubscriptionUpdated,
}: Readonly<{
  model: IManagePlanModel;
  unregisterMembership: (id: string) => void;
  setIsSubscriptionUpdated: (isUpdated: boolean) => void;
}>) {
  const [open, setOpen] = useState(false);
  const context = useUser();

  let basketPrice = 0;
  let basketRrp = 0;
  let basketPricePerCount = 0;

  let extraDiscount = 0;
  if (model.role === "FOUNDING_MEMBER") {
    extraDiscount = Number(
      model.team?.supplementTeamProducts?.foundingMembersDiscount ?? 0
    );
  } else if (model.role === "EARLY_MEMBER") {
    extraDiscount = Number(
      model.team?.supplementTeamProducts?.earlyMembersDiscount ?? 0
    );
  }
  const { product } = useProduct(
    model.team?.id,
    context?.user?.id,
    model.team?.basket[0]?.product?.id
  );
  const gramsPerCount =
    Number(product?.gramsPerCount) === 0 ? 1 : Number(product?.gramsPerCount);

  const basketPrice2 =
    Number(
      ((model.team?.basket[0]?.product?.rrp ?? 0) * model.capsulePerDay) /
        gramsPerCount
    ) *
    (1 -
      Number(Number(model.team?.basket[0]?.discount) + Number(extraDiscount)) /
        100);

  const productRrp =
    (model.quantity / gramsPerCount) *
    (model.team?.basket[0]?.product?.rrp ?? 0);

  const rrpPerCount = Number(model.team?.basket[0]?.product?.rrp) / 90;

  const foundingMemberPricePerCount =
    Number(rrpPerCount) *
    (1 -
      (Number(model.team?.supplementTeamProducts?.foundingMembersDiscount) +
        Number(model.team?.basket[0]?.discount)) /
        100);

  const units =
    model.team?.basket[0]?.product?.unitsOfMeasurePerSubUnit === "grams"
      ? "g"
      : " Capsules";

  if (model.role === "FOUNDING_MEMBER") {
    basketPrice = basketPrice2;
    basketRrp = productRrp;
    basketPricePerCount = Number(foundingMemberPricePerCount);
  } else if (model.role === "EARLY_MEMBER") {
    basketPrice = basketPrice2;
    basketRrp = productRrp;
    basketPricePerCount = Number(model.team?.basket[0]?.pricePerCount);
  } else {
    basketPrice = basketPrice2;
    basketRrp = productRrp;
    basketPricePerCount = Number(model.team?.basket[0]?.pricePerCount);
  }

  const now = new Date();
  const nextQuarterStart = startOfQuarter(addQuarters(now, 1));

  console.log('model', model);

  return (
    <ConditionalLink
      href={`/dashboard/manage-plans/${model.id}`}
      condition={model.subscriptionStatus === "ACTIVE" && !model.isSkipped}
    >
      <div className="py-[16px] px-[12px] bg-white rounded-[12px] shadow-card grid gap-[10px] relative">
        {["FOUNDING_MEMBER", "EARLY_MEMBER"].includes(model.role) && (
          <div className="absolute -top-2.5 left-2.5 bg-blue2 rounded-full w-fit">
            <p className="text-blue font-inconsolata text-[10px] font-bold leading-[10px] py-1 px-2">
              Registered
            </p>
          </div>
        )}
        <div className="flex justify-between items-center h-[69px]">
          {" "}
          <div className="grid grid-cols-[69px_1fr] gap-[8px]">
            <div className="rounded-[8px] border-[1px] border-grey28 w-[69px] p-[4px]">
              <Image
                src="/images/supplement-mockup.svg"
                alt="supplement icon"
                width={61}
                height={61}
              />
            </div>
            <div className="flex flex-col gap-[2px] h-[64px]">
              <div className="flex items-center gap-[2px]">
                {model.name && (
                  <span className="text-[12px] leading-[13px] font-hagerman text-grey4">
                    {model.name} -
                  </span>
                )}
                <span className="text-[12px] leading-[13px] font-inconsolata text-grey4">
                  {model.role === "FOUNDING_MEMBER"
                    ? "Founding Member Subscription"
                    : model.role === "EARLY_MEMBER"
                    ? "Early Member Subscription"
                    : "Subscription"}
                </span>
              </div>

              <div className="text-[16px] font-[800] text-black flex items-center gap-[5px] font-inconsolata">
                £{Number(basketPrice).toFixed(2)}{" "}
                <span className="text-[10px] leading-[11px] text-grey1 font-bold font-inconsolata">
                  (£
                  {Number(basketPricePerCount).toFixed(2)}
                  /count)
                </span>
              </div>

              <div className="text-[12px] leading-[13px] font-inconsolata font-[400] text-grey4">
                RRP{" "}
                <span className="text-[12px] leading-[13px] font-inconsolata line-through font-bold">
                  £{basketRrp.toFixed(2)}
                </span>{" "}
                <span className="text-[12px] leading-[13px] font-inconsolata font-bold text-blue">
                  {(
                    Number(model.team?.basket[0]?.discount ?? 0) + extraDiscount
                  ).toFixed(2)}
                  % OFF
                </span>
              </div>

              <div className="text-[12px] leading-[13px] text-grey4 font-helvetica">
                {model.capsulePerDay}
                {units} per Day - {90 * model.capsulePerDay}
                {units}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {model.role === "FOUNDING_MEMBER" && (
              <div className="bg-[#FFF5E9] text-[#BF6A02] font-hagerman text-base py-0.5 px-3 rounded-full">
                WAITING TO LAUNCH
              </div>
            )}
            {model.role === "EARLY_MEMBER" && (
              <div className="bg-blue2 text-blue font-hagerman text-base py-0.5 px-3 rounded-full">
                NEXT DROP: PENDING
              </div>
            )}
            {["FOUNDING_MEMBER", "EARLY_MEMBER"].includes(model.role) && (
              <HoverCard open={open} onOpenChange={setOpen}>
                <HoverCardTrigger
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  <Ellipsis className="text-blue hover:cursor-pointer" />
                </HoverCardTrigger>

                <HoverCardContent
                  className="!h-[51px] !w-[150px] flex justify-center items-center"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="w-fit bg-red-500 flex items-center gap-2 cursor-pointer ">
                    <SubscriptionUnregisterDialog
                      confirmAction={() => {
                        unregisterMembership(model.id ?? "");
                        setOpen(false);
                      }}
                    />
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
            <ChevronRight className="text-blue" />
          </div>
        </div>
        {model.isSkipped && model.subscriptionStatus === "ACTIVE" && (
          <Button className="contents">
            <div className="h-[30px] rounded-[17px]  flex justify-center items-center text-center text-[16px] leading-[20px] font-hagerman text-blue bg-blue11/10">
              You&apos;ve opted to skip the {product?.deliveryDate ? format(product?.deliveryDate, "MMMM d, yyyy") : format(nextQuarterStart, "MMMM d, yyyy")} Drop
            </div>

            <OptBackInDialog model={model} setIsSubscriptionUpdated={setIsSubscriptionUpdated} />
          </Button>
        )}
        {model.subscriptionStatus !== "ACTIVE" && (
          <>
            <div className="h-[30px] rounded-[17px]  flex justify-center items-center text-center text-[16px] leading-[20px] font-hagerman bg-[#FF3B301A] text-red3">
              You&apos;ve cancelled this plan
            </div>
            <ReactivatePlanDialog setIsSubscriptionUpdated={setIsSubscriptionUpdated} model={model} />
          </>
        )}
        { model.role === "FOUNDING_MEMBER" && !model.isSkipped && model.subscriptionStatus === "ACTIVE" && (
          <div className="bg-blue2 rounded-sm w-full">
            <p className="text-blue font-bold text-xs font-inconsolata w-full text-center py-2">
              When the team launches, we’ll email you 24h before charging
            </p>
          </div>
        )}
        {model.role === "EARLY_MEMBER" && !model.isSkipped && model.subscriptionStatus === "ACTIVE" && (
          <div className="bg-blue2 rounded-sm w-full">
            <p className="text-blue font-bold text-xs font-inconsolata w-full text-center py-2">
              {/* eslint-disable-next-line */}
              You're early. We’ll notify you when your order ships.
            </p>
          </div>
        )}
      </div>
    </ConditionalLink>
  );
}
