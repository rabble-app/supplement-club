/** @format */

"use client";
import OrderSummaryCard from "@/components/shared/OrderSummaryCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { VisuallyHidden } from "@reach/visually-hidden";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AlignmentDialogProps = {
  daysUntilNextDrop: number;
  deliveryDate: string;
  orders: IOrderSummaryModel[];
  updateQuantityAction: (val: number) => void;
  discount: number;
  founderDiscount: number;
  earlyMemberDiscount: number;
  setSummary: React.Dispatch<React.SetStateAction<ISummaryProductModel>>;
  isComming?: boolean;
  isInfoIconClicked?: boolean;
  setIsInfoIconClicked?: (val: boolean) => void;
  firstDelivery?: boolean;
  producer: string;
  step: number;
  orderDate: string;
  pochesRequired: number;
  alignmentPoucheSize: number;
  units: string;
  status: string;
  capsulePerDay: number;
};

export default function AlignmentDialog({
  daysUntilNextDrop,
  deliveryDate,
  orders,
  updateQuantityAction,
  discount,
  founderDiscount,
  earlyMemberDiscount,
  setSummary,
  isComming,
  isInfoIconClicked,
  setIsInfoIconClicked,
  firstDelivery,
  producer,
  step,
  orderDate,
  pochesRequired,
  alignmentPoucheSize,
  units,
  status,
  capsulePerDay,
}: Readonly<AlignmentDialogProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if ([1, 3].includes(step) || isInfoIconClicked) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isInfoIconClicked, step]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nativeEvent = e.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter as HTMLButtonElement | null;

    if (submitter?.value === "yes") {
      console.log("yes");
    } else {
      setSummary((prev) => ({
        ...prev,
        orders: [],
      }));
    }

    setIsOpen(false);
  };

  const daysSinceLaunch = orderDate
    ? Math.floor(
        (new Date().getTime() - new Date(orderDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const monthNameFromDeliveryDate = deliveryDate
    ? format(new Date(deliveryDate), "MMMM")
    : "";

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-full h-full sm:h-auto sm:max-w-[650px] gap-4 rounded pb-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <DialogHeader
              className={`flex flex-row justify-between items-center relative ${
                isComming || firstDelivery
                  ? "pb-[200px] md:pb-[70px]"
                  : "pb-60 md:pb-40"
              }`}
            >
              <DialogTitle
                className={`absolute ${
                  isComming || firstDelivery
                    ? "top-[70px] md:top-0"
                    : "top-[120px] md:top-[56px]"
                } left-0 right-0`}
              >
                <h1 className="uppercase text-center font-hagerman text-2xl font-normal">
                  {isComming && "YOU’RE REGISTERING AS A FOUNDING MEMBER"}
                  {!isComming &&
                    !firstDelivery &&
                    `You have ${daysUntilNextDrop} days until the next drop`}
                  {!isComming &&
                    firstDelivery &&
                    `You're Joining Early, Before the First Drop Ships`}
                </h1>
                <p className="text-center font-helvetica text-base font-normal mt-2 mb-6 text-[#8E8E93]">
                  {isComming &&
                    `You’ll lock in ${founderDiscount}% extra off for life if you stay in when the team goes live.`}
                  {!isComming &&
                    !firstDelivery &&
                    status === "IN_STOCK" &&
                    `Do you want us to send you an alignment package to cover the next ${daysUntilNextDrop} days. This takes you up to ${
                      deliveryDate
                        ? format(new Date(deliveryDate), "MMMM dd yyyy")
                        : ""
                    } and aligns you with the team.`}
                  {!isComming &&
                    !firstDelivery &&
                    status === "OUT_OF_STOCK" &&
                    `We’ve run out of alignment packages. The next drop is on ${
                      deliveryDate
                        ? format(new Date(deliveryDate), "MMMM dd yyyy")
                        : ""
                    }, want to secure your spot now?`}
                  {!isComming &&
                    firstDelivery &&
                    `This team launched ${daysSinceLaunch} days ago and is already in production at ${producer}`}
                </p>
              </DialogTitle>
              {!isComming && !firstDelivery && (
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

            {!isComming &&
              !firstDelivery &&
              status === "IN_STOCK" &&
              orders?.map((order) => (
                <OrderSummaryCard
                  key={order.id}
                  model={order}
                  updateQuantityAction={updateQuantityAction}
                  discount={discount}
                  className="bg-[#F6F6F6] p-4 mb-6"
                  isAlignmentDialog={true}
                />
              ))}
            {(isComming || firstDelivery) && (
              <div className="bg-[#F6F6F6] p-6">
                <h3 className="font-hagerman text-lg font-normal mb-2 text-black">
                  {isComming &&
                    "We’ll notify you when the team launches and orders go to the lab."}
                  {firstDelivery &&
                    `As an Early Member, you’re locking in an extra ${earlyMemberDiscount}% off for life.`}
                </h3>
                {isComming && (
                  <p className="font-helvetica text-sm font-normal mb-8 text-grey4">
                    Once all founding slots are filled, your order will go to{" "}
                    {producer} for production. We’ll email you with your
                    delivery date and give you 24h before charging
                  </p>
                )}

                {isComming && (
                  <p className="text-[#303030] font-inconsolata text-sm font-normal mb-2">
                    Your Launch Package Includes:
                  </p>
                )}
                {firstDelivery && (
                  <p className="text-[#303030] font-inconsolata text-sm font-normal mb-6">
                    Launch package will ship on{" "}
                    {deliveryDate
                      ? format(new Date(deliveryDate), "MMMM dd yyyy")
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
                    {isComming && (
                      <p className="text-grey4 font-inconsolata text-sm font-normal text-center">
                        Capsules to cover you until the first drop
                      </p>
                    )}
                    {firstDelivery && (
                      <p className="text-grey4 font-inconsolata text-sm font-normal text-center">
                        {pochesRequired * capsulePerDay} x {alignmentPoucheSize}
                        {units === "g"
                          ? `${units} Pouch`
                          : `${units.slice(0, -1)} Pouch`}
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
                      {isComming
                        ? "1st Quarterly Drop"
                        : `${monthNameFromDeliveryDate}'s Quarterly Drop`}
                    </p>
                    <p className="text-grey4 font-inconsolata text-sm font-normal">
                      {orders?.[0]?.capsules} capsule pouch
                    </p>
                  </div>
                </div>

                <div className="bg-blue2 w-full rounded-full mt-6">
                  {isComming && (
                    <p className="text-blue font-inconsolata text-sm font-semibold py-1.5 text-center">
                      Reminder: You don’t need to do anything — we’ll notify you
                      before charging.
                    </p>
                  )}
                  {firstDelivery && (
                    <p className="text-blue font-inconsolata text-sm font-semibold py-1.5 text-center">
                      Estimated delivery:{" "}
                      {deliveryDate
                        ? format(new Date(deliveryDate), "MMMM dd yyyy")
                        : ""}
                    </p>
                  )}
                </div>
                {firstDelivery && (
                  <p className="text-grey4 font-inconsolata text-sm font-normal text-center mt-2">
                    We’ll email you when your shipment is on its way.
                  </p>
                )}
              </div>
            )}
          </div>

          {!isComming && !firstDelivery && (
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className={`text-white text-[16px] md:text-[18px] font-inconsolata w-full ml-auto font-bold bg-blue`}
                value={status === "IN_STOCK" ? "yes" : "no"}
              >
                Yes
              </Button>
              <Button
                type={status === "IN_STOCK" ? "submit" : "button"}
                className={`text-blue text-[16px] md:text-[18px] font-inconsolata w-full ml-auto font-bold bg-[#7878801F]`}
                value={status === "IN_STOCK" ? "no" : ""}
                onClick={() => {
                  if (status === "OUT_OF_STOCK") {
                    router.back();
                  }
                }}
              >
                No
              </Button>
            </div>
          )}
          {(isComming || firstDelivery) && (
            <div className="flex flex-col gap-4 mt-6">
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
