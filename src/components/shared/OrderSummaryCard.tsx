/** @format */

import { Button } from "@/components/ui/button";
import { IMetadata } from "@/utils/models/api/response/IUserResponse";
import type IMembershipSummaryModel from "@/utils/models/IMembershipSummaryModel";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISubscriptionSummaryModel from "@/utils/models/ISubscriptionSummaryModel";
import Image from "next/image";
import useLocalStorage from "use-local-storage";

function renderPrice(
  model: IOrderSummaryModel | ISubscriptionSummaryModel,
  discount: number,
  isComming?: boolean,
  founderSpots?: number,
  founderMembersNeeded?: number,
  founderDiscount?: number,
  earlyMemberDiscount?: number,
  firstDelivery?: boolean
) {
  if (model.isFree) {
    return (
      <div className="grid gap-[7px]">
        <div className="gap-[2px] text-[20px] leading-[20px] font-inconsolata font-bold flex md:justify-end items-center line-through">
          £{model.price?.toFixed(2)}{" "}
        </div>
        <div className="text-[20px] leading-[20px] font-inconsolata font-[400] text-grey4 md:text-end">
          RRP{" "}
          <span className="text-[20px] leading-[20px] font-inconsolata line-through font-bold">
            £{model.rrp}
          </span>{" "}
          <span className="text-[20px] leading-[20px] font-inconsolata font-bold text-blue">
            FREE
          </span>
        </div>
      </div>
    );
  }

  if (model.isFoundingMember) {
    return (
      <div className="gap-[2px] text-[20px] leading-[20px] font-inconsolata font-bold flex md:justify-end items-center">
        £{model.price?.toFixed(2)}{" "}
      </div>
    );
  }

  const price = Number(model.price) ?? 0;

  const founderPrice = Number(model.price) * (1 - (founderDiscount ?? 0) / 100);
  const founderPricePerCount = Number(model.pricePerCount) * (1 - (founderDiscount ?? 0) / 100);

  const earlyMemberPrice = Number(model.price) * (1 - (earlyMemberDiscount ?? 0) / 100);
  const earlyMemberPricePerCount = Number(model.pricePerCount) * (1 - (earlyMemberDiscount ?? 0) / 100);

  let displayPrice = price;
  let displayPricePerCount = model.pricePerCount;

  if (firstDelivery) {
    displayPrice = earlyMemberPrice;
    displayPricePerCount = earlyMemberPricePerCount;
  }

  return (
    <div className="grid gap-[8px]">
      {isComming && (
        <p className="text-blue font-normal text-sm font-inconsolata">
          First {founderSpots} Spots
        </p>
      )}
      <div
        className={`${
          model.isMembership
            ? "md:text-xl  text-right items-end"
            : "text-xl md:text-3xl flex"
        } font-[800] text-black items-center gap-1 font-inconsolata`}
      >
        £{isComming ? founderPrice.toFixed(2) : displayPrice.toFixed(2)}
        {!model.isMembership && (
          <span className="text-xs leading-3 text-grey1 font-inconsolata font-bold">
            (£{isComming ? founderPricePerCount.toFixed(2) : displayPricePerCount?.toFixed(2)}/count)
          </span>
        )}
      </div>
      {!isComming && (
        <div className="hidden md:block text-[20px] leading-[20px] text-grey4 md:text-end font-inconsolata whitespace-nowrap">
          RRP{" "}
          <span className="text-[20px] leading-[20px] line-through font-bold font-inconsolata">
            £{(Number(model.rrp) ?? 0).toFixed(2)}
          </span>{" "}
          <span className="text-[20px] leading-[20px] font-bold text-blue font-inconsolata whitespace-nowrap">
            {model?.isMembership ? discount : discount.toFixed(2)}% OFF
          </span>
        </div>
      )}
      {isComming && (
        <p className="text-blue font-normal text-sm font-inconsolata">
          {founderMembersNeeded} Founder Spots Remaining!
        </p>
      )}
    </div>
  );
}

export default function OrderSummaryCard({
  model,
  updateQuantityAction,
  discount,
  className,
  step,
  isAlignmentDialog,
  isComming,
  founderSpots,
  founderMembersNeeded,
  founderDiscount,
  earlyMemberDiscount,
  firstDelivery,
}: Readonly<{
  model:
    | IOrderSummaryModel
    | ISubscriptionSummaryModel
    | IMembershipSummaryModel;

  updateQuantityAction?: (val: number) => void;
  discount?: number;
  className?: string;
  step?: number;
  isAlignmentDialog?: boolean;
  isComming?: boolean;
  founderSpots?: number;
  founderMembersNeeded?: number;
  founderDiscount?: number;
  earlyMemberDiscount?: number;
  firstDelivery?: boolean;
}>) {
  const [checkoutData] = useLocalStorage<IMetadata>("checkoutData", {});
  const increment = () => {
    if (updateQuantityAction) {
      updateQuantityAction((checkoutData.quantity ?? 0) + 1);
    }
  };

  const decrement = () => {
    const currentQuantity = checkoutData.quantity ?? 0;
    if (updateQuantityAction && currentQuantity > 0) {
      updateQuantityAction(currentQuantity - 1);
    }
  };

  return (
    <div
      className={`grid gap-2 items-center ${className} ${
        model?.src
          ? "grid-cols-[61px_1fr] md:grid-cols-[61px_1fr_210px]"
          : "md:grid-cols-[1fr_210px]"
      }`}
    >
      {model?.src && (
        <Image
          src={model.src}
          alt={model.alt ?? ""}
          className={`object-contai ${
            model.imageBorder
              ? "border-[1px] border-[#DDDDDD] rounded-[8px] py-[17px] px-[12px]"
              : ""
          }`}
          width={61}
          height={61}
          unoptimized
        />
      )}

      <div className="grid gap-2">
        <p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
          {model.description}
        </p>
        <p className="text-[16px] leading-[16px] font-[600] font-inconsolata">
          {model.name}
        </p>
        {model.delivery && (
          <p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
            {model.delivery}
          </p>
        )}

        <div className="flex md:hidden">
          {renderPrice(model, discount ?? 0, isComming, founderSpots, founderMembersNeeded, founderDiscount, earlyMemberDiscount, firstDelivery)}
        </div>
        {typeof model.quantity === "number" && step !== 4 && (
          <div className="flex items-center gap-[16px]">
            <Button
              type="button"
              className={`w-[20px] h-[20px] rounded-[50%] bg-[#666666] text-white p-0 text-[20px] cursor-pointer ${
                checkoutData.quantity === 1 && isAlignmentDialog
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={decrement}
              disabled={checkoutData.quantity === 1 && isAlignmentDialog}
            >
              -
            </Button>
            <span className="text-[20px] font-bold font-inconsolata">
              {checkoutData.quantity}
            </span>
            <Button
              type="button"
              className={`w-[20px] h-[20px] rounded-[50%] bg-[#666666] text-white p-0 text-[20px] cursor-pointer select-none ${
                (checkoutData.quantity ?? 0) === 12
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={increment}
              disabled={(checkoutData.quantity ?? 0) === 12}
            >
              +
            </Button>
          </div>
        )}
      </div>

      <div className="hidden md:flex justify-end">
        {renderPrice(model, discount ?? 0, isComming, founderSpots, founderMembersNeeded, founderDiscount, earlyMemberDiscount, firstDelivery)}
      </div>
    </div>
  );
}
