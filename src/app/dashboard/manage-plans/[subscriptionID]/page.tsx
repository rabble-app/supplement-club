/** @format */

"use client";

import { useEffect, useMemo, useState } from "react";

import SubscriptionCancelDialog from "@/components/dashboard/subscription-managment/SubscriptionCancelDialog";
import SubscriptionCard from "@/components/dashboard/subscription-managment/SubscriptionCard";
import SubscriptionPlan from "@/components/dashboard/subscription-managment/SubscriptionPlan";
import SubscriptionSkipDialog from "@/components/dashboard/subscription-managment/SubscriptionSkipDialog";
import { Button } from "@/components/ui/button";
import { teamsService } from "@/services/teamService";
import { usersService } from "@/services/usersService";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type { SubscriptionProps } from "@/utils/props/SubscriptionProps";
import { getQuarterInfo } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  format,
  startOfMonth,
  addMonths,
  addQuarters,
  startOfQuarter,
} from "date-fns";
import Image from "next/image";
import PricePerCapsule from "@/components/shared/PricePerCapsule";
import useProduct from "@/hooks/useProduct";
import { useUser } from "@/contexts/UserContext";

export default function Subscription({
  params,
}: Readonly<{ params: Promise<SubscriptionProps> }>) {
  const [subscriptionID, setSubscriptionID] = useState<string>();
  const [totalCapsule, setTotalCapsule] = useState<number>(0);
  const [managePlan, setManagePlan] = useState<IManagePlanModel>();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const context = useUser();
  const { endDate, year, daysToNextQuarter, remainsDaysToNextQuater } =
    getQuarterInfo();
  const nextDelivery = `${format(
    startOfMonth(addMonths(endDate, 1)),
    "d MMM yyyy"
  )} - ${daysToNextQuarter} Days`;

  useEffect(() => {
    const fetchParams = async () => {
      const { subscriptionID } = await params;
      setSubscriptionID(subscriptionID);
      const response = await usersService.getSubscriptionPlan(subscriptionID);
      setManagePlan(response);

      let caps = 0;
      for (const item of response.team.basket) {
        const capsules = +item.capsulePerDay * remainsDaysToNextQuater;
        caps += capsules;
      }

      setTotalCapsule(caps);
    };
    fetchParams();
  }, [params, isOpen]);

  async function subscriptionCancel() {
    await teamsService.cancelSubscriptionPlan(subscriptionID);
    router.push("/dashboard/manage-plans/");
  }

  async function subscriptionSkipDialog() {
    await teamsService.skipNextDelivery(subscriptionID);
    router.push("/dashboard/manage-plans/");
  }

  const now = new Date();
  const nextQuarterStart = startOfQuarter(addQuarters(now, 1));

  const units =
    managePlan?.team?.basket[0]?.product?.unitsOfMeasurePerSubUnit === "grams"
      ? "g"
      : " Capsules";

  const { product, orderPackage } = useProduct(
    managePlan?.team?.id,
    context?.user?.id,
    managePlan?.team?.basket[0]?.product?.id
  );

  let bottomText = "Free Delivery";
  if (managePlan?.role === "EARLY_MEMBER") {
    bottomText = `${managePlan.team.supplementTeamProducts.earlyMembersDiscount}% OFF TEAM PRICE. FOREVER`;
  } else if (managePlan?.role === "FOUNDING_MEMBER") {
    bottomText = `${managePlan.team.supplementTeamProducts.foundingMembersDiscount}% OFF TEAM PRICE. FOREVER`;
  }

  const price =
    Number(
      ((product?.rrp ?? 0) *
        Number(managePlan?.team?.basket[0]?.capsulePerDay)) /
        Number(orderPackage.gPerCount)
    ) *
    (1 -
      Number(
        Number(orderPackage.discount) + Number(orderPackage.extraDiscount)
      ) /
        100);

        const rrpPerCount = Number(managePlan?.team?.basket[0]?.product?.rrp) / 90;

        const foundingMemberPricePerCount =
        Number(rrpPerCount) *
        (1 -
          (Number(managePlan?.team?.supplementTeamProducts?.foundingMembersDiscount) +
            Number(managePlan?.team?.basket[0]?.discount)) /
            100);

  return (
    <div className="mx-auto py-[30px] max-w-[600px]">
      <div className="grid gap-[16px]">
        <div className="text-[28px] leading-[28px] font-hagerman font-[400]">
          Plan settings
        </div>

        {managePlan?.role !== "FOUNDING_MEMBER" && (
          <SubscriptionCard
            title="Next Quarterly Drop"
            description={nextDelivery}
            imageSrc="/images/icons/calendar-blue-icon.svg"
            imageAlt="Calendar icon"
          />
        )}

        <SubscriptionPlan
          managePlan={managePlan}
          setIsUpdated={setIsUpdated}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {managePlan?.role !== "FOUNDING_MEMBER" && (
          <SubscriptionCard
            title="Your Stock"
            description={`You should have ${totalCapsule}${units} to tie you over to the ${format(
              startOfMonth(addMonths(endDate, 1)),
              "MMMM d"
            )} ${year} drop`}
            imageSrc="/images/icons/truck-icon.svg"
            imageAlt="Truck icon"
            key={managePlan?.capsulePerDay}
          >
            <Button
              asChild
              className="bg-blue13 w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-blue rounded-[2px] h-[50px]"
            >
              <Link
                href={`/dashboard/manage-plans/${subscriptionID}/top-up-checkout/`}
              >
                Order Top Up Capsules
              </Link>
            </Button>
          </SubscriptionCard>
        )}

        <div className="bg-grey12 p-6 mt-10">
          <div className="grid gap-[8px] items-center grid-cols-[61px_1fr_auto] bg-grey12 pb-[24px]">
            <Image
              src="/images/supplement-mockup.svg"
              alt=""
              width={61}
              height={61}
            />
            <div className="grid gap-[8px]">
              <p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
                {`${Number(managePlan?.team?.basket[0]?.capsulePerDay) * 90}${
                  managePlan?.team?.basket[0]?.product
                    ?.unitsOfMeasurePerSubUnit === "grams"
                    ? "g"
                    : " capsule(s)"
                } Every 3 months`}
              </p>
              <p className="text-[16px] leading-[16px] font-[600] font-inconsolata">
                {managePlan?.role !== "MEMBER"
                  ? managePlan?.role.replaceAll("_", " ")
                  : `QUARTERLY SUBSCRIPTION`}
              </p>
              <p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
                {bottomText}
              </p>
            </div>
            <PricePerCapsule
              price={Number(price.toFixed(2))}
              pricePerCount={managePlan?.role === "FOUNDING_MEMBER" ? Number(foundingMemberPricePerCount) : Number(product?.pricePerCount)}
            />
          </div>

          <SubscriptionCancelDialog confirmAction={subscriptionCancel} />

          <SubscriptionSkipDialog
            confirmAction={subscriptionSkipDialog}
            nextQuarterStart={nextQuarterStart}
            deliveryDate={product?.deliveryDate ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
