/** @format */

"use client";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";

import ManagePlanCard from "@/components/dashboard/manage-plans/ManagePlanCard";
import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import { useEffect, useState } from "react";
import Spinner from "@/components/shared/Spinner";
import IMembershipSubscriptionResponse from "@/utils/models/api/response/IMembershipSubscriptionResponse";
import { paymentService } from "@/services/paymentService";
import Image from "next/image";
import { format } from "date-fns";
import { Ellipsis } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { CustomToast, StatusToast } from "@/components/shared/Toast";

export default function Plans() {
  const context = useUser();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [subscriptions, setSubscriptions] = useState<IManagePlanModel[]>([]);
  const [membershipSubscription, setMembershipSubscription] =
    useState<IMembershipSubscriptionResponse>({
      subscriptionId: "",
      subscriptionName: "",
      subscriptionPrice: 0,
      subscriptionStatus: "",
      subscriptionStartDate: "",
      subscriptionEndDate: "",
      subscriptionDiscount: 0,
      subscriptionRRP: 0,
      expiryDate: "",
      subscriptionAmount: 0,
      status: "ACTIVE",
    });

  useEffect(() => {
    (async () => {
      const response = await usersService.getSubscriptionPlans(
        context?.user?.id ?? ""
      );
      const response2 = await getMembershipSubscription(
        context?.user?.id ?? ""
      );
      setMembershipSubscription(response2);
      setSubscriptions(response);
      setLoading(false);
    })();
  }, [context?.user]);

  async function getMembershipSubscription(id: string) {
    const response = await paymentService.getMembershipSubscription(id);
    return response;
  }

  async function updateMembershipStatus(
    id: string,
    status: "ACTIVE" | "CANCELED"
  ) {
    try {
      const response = await paymentService.updateMembershipStatus(id, status);
      setMembershipSubscription((prev) => ({
        ...prev,
        status: response.status,
        expiryDate: response.expiryDate,
      }));
      CustomToast({
        title: "Membership Status Updated",
        status: StatusToast.SUCCESS,
        position: "top-right",
      });
      return response;
    } catch {
      CustomToast({
        title: "Error: Something went wrong",
        status: StatusToast.ERROR,
        position: "top-right",
      });
    }
  }

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-[600px] py-[16px] md:py-[50px] grid gap-[20px]">
      {membershipSubscription && (
        <div className="flex flex-col gap-2 shadow-card rounded-[12px] py-4 px-3">
          <div className="w-full flex justify-between items-center ">
            <div className={`flex gap-2 items-center `}>
              <div className="w-[61px] h-[61px] border border-grey28 rounded-[8px] flex items-center justify-center">
                <Image
                  src="/images/membership-card.svg"
                  alt={"membership-card"}
                  width={38}
                  height={40}
                  unoptimized
                />
              </div>

              {membershipSubscription.status !== "CANCELED" && (
                <div className="grid gap-2">
                  <p className="text-[12px] leading-[12px] font-inconsolata text-grey4">
                    Free for your first 2 drops
                  </p>
                  <p className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
                    Renews at £{membershipSubscription.subscriptionAmount}
                    /year on
                  </p>
                  <div className="text-[12px] leading-[12px] text-grey4 font-bold font-inconsolata whitespace-nowrap">
                    RRP{" "}
                    <span className="text-[12px] leading-[12px] line-through font-bold font-inconsolata">
                      £
                      {Number(
                        membershipSubscription.subscriptionRRP ?? 0
                      ).toFixed(2)}
                    </span>{" "}
                    <span className="text-[12px] leading-[12px] font-bold text-blue font-inconsolata whitespace-nowrap">
                      {membershipSubscription.subscriptionDiscount?.toFixed(2)}%
                      OFF
                    </span>
                  </div>
                  <p className="text-[12px] leading-[12px] font-medium font-helvetica text-grey4">
                    {membershipSubscription.expiryDate
                      ? format(
                          new Date(membershipSubscription.expiryDate ?? ""),
                          "MMMM dd yyyy"
                        )
                      : "N/A"}
                  </p>
                </div>
              )}
              {membershipSubscription.status === "CANCELED" && (
                <div>
                  <p className="text-[12px] leading-[12px] font-inconsolata text-grey4">
                    Cancelled From
                  </p>
                  <p className="text-[16px] leading-[16px] font-[800] font-inconsolata text-black">
                    {membershipSubscription.expiryDate
                      ? format(
                          new Date(membershipSubscription.expiryDate ?? ""),
                          "MMMM dd yyyy"
                        )
                      : "N/A"}
                  </p>
                </div>
              )}
            </div>
            <HoverCard open={open} onOpenChange={setOpen}>
              {membershipSubscription.status !== "CANCELED" && (
                <HoverCardTrigger onClick={() => setOpen(true)}>
                  <Ellipsis className="text-blue hover:cursor-pointer" />
                </HoverCardTrigger>
              )}
              <HoverCardContent>
                <div
                  className="w-fit bg-red-500 flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    updateMembershipStatus(context?.user?.id ?? "", "CANCELED");
                    setOpen(false);
                  }}
                >
                  <Image
                    src="/images/icons/trash-red-icon.svg"
                    alt="cancel-icon"
                    width={24}
                    height={24}
                  />
                  <p className="text-[16px] leading-[16px] font-[800] font-inconsolata text-red4">
                    Cancel Membership
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          {membershipSubscription.status === "CANCELED" && (
            <Button
              variant="outline"
              className="w-full text-blue font-inconsolata text-[16px] leading-[16px] font-[700] bg-grey"
              onClick={() =>
                updateMembershipStatus(context?.user?.id ?? "", "ACTIVE")
              }
            >
              Opt Back In
            </Button>
          )}
        </div>
      )}
      {subscriptions.map((item) => (
        <ManagePlanCard model={item} key={item.id} />
      ))}
    </div>
  );
}
