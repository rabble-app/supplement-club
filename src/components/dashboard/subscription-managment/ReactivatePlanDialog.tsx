/** @format */

import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";

import PricePerCapsule from "@/components/shared/PricePerCapsule";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import { getQuarterInfo } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import useProduct from "@/hooks/useProduct";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { teamsService } from "@/services/teamService";
import { toast } from "sonner";
import { addQuarters, format, startOfQuarter } from "date-fns";

export default function ReactivatePlanDialog({
  model,
  setIsSubscriptionUpdated,
}: Readonly<{
  model: IManagePlanModel;
  setIsSubscriptionUpdated: (isUpdated: boolean) => void;
}>) {
  const [packageAlignment, setPackageAlignment] = useState(false);
  const { remainsDaysToNextQuater, nextDeliveryText, currentQuarter } =
    getQuarterInfo();
  const nextQuater = currentQuarter + 1 > 4 ? 1 : currentQuarter + 1;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const context = useUser();

  async function confirmAction() {
    if (packageAlignment) {
      router.push(`/dashboard/manage-plans/${model.id}/reactivate-plan`);
    } else {
      onOpenChange(true);
    }

    setIsOpen(false);
  }

  useEffect(() => {
    localStorage.setItem(
      "packageAlignment",
      packageAlignment === true ? "true" : "false"
    );
  }, [packageAlignment]);

  const { product } = useProduct(
    model.team?.id,
    context?.user?.id,
    model.team?.basket[0]?.product?.id
  );

  const alignmentPrice =
    Math.ceil(
      Number(remainsDaysToNextQuater * model.capsulePerDay) /
        Number(product?.alignmentPoucheSize)
    ) * Number(product?.pricePerPoche);

  async function onOpenChange(val: boolean) {
    if (val) {
      try {
        await teamsService.reactivateSubscriptionPlan(model.id);
		setIsDialogOpen(true);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }else {
		setIsSubscriptionUpdated(true);
	}
  }

  const now = new Date();
  const nextQuarterStart = startOfQuarter(addQuarters(now, 1));

  return (
    <>
      <ConfirmDialog
        isDialogOpen={isDialogOpen}
        onOpenChange={onOpenChange}
        title="Your plan has been re-activated"
        description={`A confirmation email has been sent to ${context?.user?.email}`}
      />

      <Dialog open={isOpen}>
        <DialogTrigger onClick={() => setIsOpen(true)}>
          <div className="text-blue flex justify-center items-center text-center h-[50px] rounded-[2px] bg-grey27/[12%] text-[17px] leading-[22px] font-bold font-inconsolata cursor-pointer">
            Re-Activate Plan
          </div>
        </DialogTrigger>
        <DialogContent
          border={"rounded"}
          className="sm:max-w-[600px] gap-[24px] p-[24px] pt-[56px]"
        >
          <DialogHeader className="flex flex-col justify-between items-center">
            <div className="grid gap-[8px] w-full">
              <DialogTitle className="text-[24px] leading-[28px] font-hagerman font-[400] mx-auto">
                Are you sure you want to reactivate your plan?
              </DialogTitle>
              <p className="text-[16px] leading-[24px] font-helvetica font-[400] text-center">
                You are Re-Activating your plan and, the next delivery is on{" "}
                <span className="font-bold">{product?.deliveryDate ? format(product?.deliveryDate, "MMMM d, yyyy") : format(nextQuarterStart, "MMMM d, yyyy")}</span>.
              </p>
            </div>

            <DialogClose
              onClick={() => setIsOpen(false)}
              className="m-[0] p-[0] absolute top-[16px] right-[16px]"
            >
              <div className="border-[1px] border-grey32 w-[38px] h-[38px] rounded-[50%] flex justify-center">
                <Image
                  src="/images/icons/close-black-icon.svg"
                  alt="Close icon"
                  width={16}
                  height={16}
                />
              </div>
            </DialogClose>
          </DialogHeader>

          <div className="text-blue text-[16px] leading-[19px] font-inconsolata flex justify-center text-center bg-blue10 rounded-[100px] py-[9px] px-[15px] font-bold w-max mx-auto">
            {remainsDaysToNextQuater} days until the next quarterly drop{" "}
          </div>

          {model.role !== "FOUNDING_MEMBER" && <div className="flex items-center gap-[8px] mx-auto">
            <Checkbox
              id="packageAlignment"
              checked={packageAlignment}
              onCheckedChange={(checked) => {
                setPackageAlignment(checked === true);
                localStorage.setItem('storageQuantity', (
                  Math.ceil(
                    Number(remainsDaysToNextQuater * model.capsulePerDay) /
                      Number(product?.alignmentPoucheSize)
                  )
                ).toString());
              }}
            />
            <label
              htmlFor="packageAlignment"
              className="text-[16px] leading-[19px] text-black5 cursor-pointer"
            >
              Do you want an alignment package to get you there?
            </label>
          </div>}

          {packageAlignment && model.role !== "FOUNDING_MEMBER" && (
            <div className="grid gap-[8px] items-center grid-cols-[61px_1fr_auto] bg-grey12 p-[24px]">
              <Image
                src="/images/supplement-mockup.svg"
                alt=""
                width={61}
                height={61}
              />
              <div className="grid gap-[8px]">
                <p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
                  {`${remainsDaysToNextQuater * model.capsulePerDay}${
                    model.team?.basket[0]?.product?.unitsOfMeasurePerSubUnit ===
                    "grams"
                      ? "g"
                      : " Capsule(s)"
                  } to see you to Q${nextQuater}`}
                </p>
                <p className="text-[16px] leading-[16px] font-[600] font-inconsolata">
                  One time Alignment Package
                </p>
                <p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
                SHIPS TODAY
                </p>
              </div>
              <PricePerCapsule
                price={Number(alignmentPrice.toFixed(2))}
                pricePerCount={Number(product?.pricePerCount)}
              />
            </div>
          )}

          <div className="grid gap-[12px]">
            <Button
              onClick={confirmAction}
              className="text-white bg-blue flex justify-center items-center w-full text-[17px] leading-[22px] font-bold font-inconsolata h-[46px] cursor-pointer"
            >
              Re-Activate My Plan
            </Button>

            <DialogClose onClick={() => setIsOpen(false)} asChild>
              <Button className="text-blue bg-[#7878801F] flex justify-center items-center  w-full text-[17px] leading-[22px] font-bold font-inconsolata h-[46px]">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
