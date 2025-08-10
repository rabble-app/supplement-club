/** @format */

"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { paymentService } from "@/services/paymentService";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@reach/visually-hidden";
import { useEffect, useState } from "react";
import { CustomToast, StatusToast } from "@/components/shared/Toast";
import useProduct from "@/hooks/useProduct";
import { useUser } from "@/contexts/UserContext";

export default function SubscriptionPlan({
  managePlan,
  setIsUpdated,
  isOpen,
  setIsOpen,
}: Readonly<{
  managePlan?: IManagePlanModel;
  setIsUpdated?: (val: boolean) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}>) {
  const [changePlan, setChangePlan] = useState(false);
  const [initCapsule, setInitCapsule] = useState(1);
  const [deadline, setDeadline] = useState<string>();
  const context = useUser();

  useEffect(() => {
    const date = new Date(
      managePlan?.team?.latestOrder?.deadline ?? Date.now()
    );

    setDeadline(
      `${date.toLocaleString("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })}`
    );
  }, [managePlan]);

  useEffect(() => {
    const currentCapsule = Number(managePlan?.team?.basket[0]?.capsulePerDay);
    setInitCapsule(currentCapsule);
  }, [managePlan]);

  const { product } = useProduct(
    managePlan?.team?.id,
    context?.user?.id,
    managePlan?.team?.basket[0]?.product?.id
  );

  const gramsPerCount =
    Number(product?.gramsPerCount) === 0 ? 1 : Number(product?.gramsPerCount);

  const quantity = initCapsule / gramsPerCount;

  function getBoxClasses(idx: number) {
    const isFirst = idx === 0;
    const isLast = idx === (capsuleInfo?.length ?? 0) - 1;
    const isSelected = initCapsule === capsuleInfo?.[idx]?.capsuleCount;

    return [
      isFirst && "rounded-l-[4px]",
      isLast && "rounded-r-[4px] border-l-[0]",
      !isFirst && !isLast && "border-l-[0]",
      isSelected ? "bg-blue text-white border-none" : "text-grey31",
    ]
      .filter(Boolean)
      .join(" ");
  }

  async function onOpenChange(val: boolean) {
    setChangePlan(val);
    if (val) {
      try {
        await paymentService.updateSubscription(
          managePlan?.team?.basket[0]?.id ?? "",
          quantity,
          initCapsule
        );
        setIsUpdated?.(true);
        setIsOpen(val);
      } catch (error: unknown) {
        const errorMessage =
          error && typeof error === "object" && "error" in error
            ? JSON.parse((error as { error: string }).error).message
            : "An error occurred";
        CustomToast({
          title: errorMessage,
          status: StatusToast.ERROR,
          position: "top-right",
        });
        console.log(error);
      }
    }
  }

  const unit =
    managePlan?.team?.basket[0]?.product?.unitsOfMeasurePerSubUnit === "grams"
      ? "Gram"
      : "Capsule";

  const capsuleInfo = managePlan?.team?.basket[0]?.product?.capsuleInfo;

  const selectedCapsuleInfo = capsuleInfo?.find(
    (info) => info.capsuleCount === initCapsule
  );

  return (
    <div className="py-[16px] px-[12px] bg-white shadow-card rounded-[12px] grid gap-[16px]">
      <div className="grid gap-[4px]">
        <p className="text-[16px] leading-[24px] font-[500] font-inconsolata text-grey4">
          {managePlan?.team?.basket[0]?.product?.producer?.businessName}
        </p>
        <p className="text-[24px] leading-[28px] font-[400] font-hagerman">
          {managePlan?.name}
        </p>
      </div>

      <div className="flex items-center gap-[8px]">
        <Image
          src="/images/icons/link-icon.svg"
          alt="security-card-icon"
          width={24}
          height={24}
        />
        <div className="grid gap-[2px]">
          <p className="text-[12px] leading-[13px] font-helvetica text-grey4">
            Daily {unit} Quantity
          </p>
          <p className="text-[12px] leading-[13px] font-helvetica">
            {selectedCapsuleInfo?.others}
          </p>
        </div>
      </div>

      <div
        className={`px-[16px] py-[5px] grid grid-flow-col auto-cols-fr mx-auto w-full`}
      >
        {capsuleInfo?.map((info, idx) => (
          <Button
            key={`len-${idx + 1}`}
            onClick={() => {
              // eslint-disable-next-line
              changePlan && setInitCapsule(info.capsuleCount);
            }}
            className={`border-[1px] border-grey31 font-helvetica h-[33px] flex justify-center items-center ${getBoxClasses(
              idx
            )}`}
          >
            {info.capsuleCount}
          </Button>
        ))}
      </div>
      {!changePlan && (
        <Button
          type="submit"
          onClick={() => {
            setChangePlan(true);
            setIsOpen(false);
          }}
          className="bg-blue13 w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-blue rounded-[2px] h-[50px]"
        >
          Change My Plan
        </Button>
      )}

      {changePlan && (
        <Button
          type="submit"
          onClick={() => setChangePlan(false)}
          className="bg-grey27/[12%] w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-blue rounded-[2px] h-[40px]"
        >
          Cancel
        </Button>
      )}

      {changePlan && (
        <Dialog
          open={isOpen}
          onOpenChange={(val) => {
            onOpenChange(val);
          }}
        >
          <DialogTrigger asChild onClick={() => onOpenChange}>
            <Button className="bg-blue w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-white rounded-[2px] h-[46px]">
              Confirm New Subscription Quantity
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]" />
            <DialogContent className="w-[calc(100%-20px)]  border rounded max-w-[600px] gap-[16px] fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white z-[201] p-[24px]">
              <DialogClose className="absolute right-[16px] top-[16px]">
                <div className="border-[1px] border-grey32 w-[38px] h-[38px] rounded-[50%] flex justify-center">
                  <Image
                    src="/images/icons/close-black-icon.svg"
                    alt="Close icon"
                    width={16}
                    height={16}
                  />
                </div>
              </DialogClose>

              <VisuallyHidden>
                <DialogTitle>Your hidden title</DialogTitle>
              </VisuallyHidden>

              <VisuallyHidden>
                <DialogDescription />
              </VisuallyHidden>

              <div className="grid gap-[12px] pt-[20px]">
                <div className="w-[87px] h-[87px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
                  <Image
                    src="/images/icons/check-white-icon.svg"
                    alt="Check icon"
                    width={100}
                    height={100}
                  />
                </div>

                <div className="grid gap-[16px]">
                  <p className="text-[24px] leading-[120%] font-hagerman uppercase text-center font-[400]">
                    Subscription Quantity updated
                  </p>
                  <p className="text-[20px] leading-[24px] font-helvetica text-grey4 text-center w-full font-[400]">
                    You have changed your subscription quantity
                    to {initCapsule}
                    {managePlan?.team?.basket[0]?.product
                      ?.unitsOfMeasurePerSubUnit === "grams"
                      ? "g"
                      : " capsule(s)"}{" "}
                    per day. This update will apply from {deadline} onwards.
                  </p>
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  );
}
