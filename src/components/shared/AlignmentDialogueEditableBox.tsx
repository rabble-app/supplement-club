/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

function renderPrice(
  rightTopText: React.ReactNode,
  rightCenterText: React.ReactNode,
  rightBottomText: React.ReactNode
) {
  return (
    <div id="order-summary-price" className="flex flex-col items-end gap-[4px] md:gap-[8px]">
      {rightTopText && (
        <p className="text-blue font-normal text-[10px] md:text-sm font-inconsolata whitespace-nowrap">
          {/* {rightTopText} */}
        </p>
      )}
      {rightCenterText}
      {rightBottomText && (
        <p className="text-blue font-normal text-[10px] md:text-sm font-inconsolata whitespace-nowrap mt-[-6px] md:mt-0">
          {rightBottomText}
        </p>
      )}
    </div>
  );
}

export default function AlignmentDialogueEditableBox({
  imageSrc,
  leftTopText,
  leftBottomText,
  leftCenterText,
  rightTopText,
  rightCenterText,
  rightBottomText,
  updateQuantityAction,
  storageQuantityState,
  className,
  step,
  isAlignmentDialog,
  isMember,
  isUpdatableQuantity,
  gPerCount,
  pochesRequired,
  isMembership,
  isReactivatePlan,
}: Readonly<{
  imageSrc: string;
  leftTopText: string;
  leftBottomText: React.ReactNode;
  leftCenterText: string;
  rightTopText: React.ReactNode;
  rightCenterText: React.ReactNode;
  rightBottomText: React.ReactNode;
  updateQuantityAction?: (val: number) => void;
  storageQuantityState?: number;
  className?: string | '';
  step?: number;
  isAlignmentDialog?: boolean;
  isMember?: boolean;
  isUpdatableQuantity?: boolean;
  gPerCount?: number;
  pochesRequired?: number;
  isMembership?: boolean;
  isReactivatePlan?: boolean;
}>) {
  const [storageCapsuleCount] = useLocalStorage("capsuleCount", 0);
  const [storageQuantity, setStorageQuantity] = useLocalStorage(
    "storageQuantity",
    0
  );
  const updatableQuantity =
    ((pochesRequired ?? 0) * (storageCapsuleCount ?? 0)) / (gPerCount ?? 0);

  const increment = () => {
    if (updateQuantityAction) {
      updateQuantityAction(storageQuantity + 1);
    }
  };

  useEffect(() => {
    if (isReactivatePlan) return;
    setStorageQuantity(storageQuantityState ?? updatableQuantity);
  }, [updatableQuantity]);

  const decrement = () => {
    const currentQuantity = storageQuantity ?? 0;
    if (updateQuantityAction && currentQuantity > 0) {
      updateQuantityAction(currentQuantity - 1);
    }
  };

  return (
    <div
      id="order-summary-card"
      className={`grid gap-2 ${isUpdatableQuantity ? "items-start" : "items-center"} ${className??''} ${
        imageSrc
          ? "grid-cols-[40px_1fr_auto] md:grid-cols-[61px_1fr_210px]"
          : "grid-cols-[1fr_auto] md:grid-cols-[1fr_210px]"
      }`}
    >
      {imageSrc && (
        <Image
          id="order-summary-image"
          src={imageSrc}
          alt={imageSrc}
          width={61}
          height={61}
          className={`w-[40px] h-[40px] md:w-[61px] md:h-[61px] ${
            isMembership
              ? "border-[1px] border-[#DDDDDD] rounded-[8px] py-[17px] px-[12px] membership-image"
              : ""
          }`}
          unoptimized
        />
      )}

      <div className={`grid gap-1 md:gap-2 ${isMembership ? "ml-2" : ""}`}>
        <p className="text-[10px] md:text-[14px] leading-[10px] md:leading-[14px] font-inconsolata text-grey4">
          {leftTopText}
        </p>
        <p className="text-[12px] md:text-[16px] leading-[12px] md:leading-[16px] font-[600] font-inconsolata">
          {leftCenterText}
        </p>
        {leftBottomText && (
          <p className="text-[10px] md:text-[14px] leading-[10px] md:leading-[14px] font-inconsolata text-grey4">
            {leftBottomText}
          </p>
        )}

        {/* <div className="flex md:hidden">
          {renderPrice(rightTopText, rightCenterText, rightBottomText)}
        </div> */}
        {isMember && isUpdatableQuantity && step !== 4 && (
          <div className="flex items-center gap-[8px] md:gap-[16px]">
            <Button
              type="button"
              className={`w-[16px] h-[16px] md:w-[20px] md:h-[20px] rounded-[50%] bg-[#666666] text-white p-0 text-[12px] md:text-[20px] cursor-pointer ${
                storageQuantity === 1 && isAlignmentDialog
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={decrement}
              disabled={storageQuantity === 1 && isAlignmentDialog}
            >
              -
            </Button>
            <span className="text-[14px] md:text-[20px] font-bold font-inconsolata">
              {storageQuantity}
            </span>
            <Button
              type="button"
              className={`w-[16px] h-[16px] md:w-[20px] md:h-[20px] rounded-[50%] bg-[#666666] text-white p-0 text-[12px] md:text-[20px] cursor-pointer select-none ${
                (storageQuantity ?? 0) === 12
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={increment}
              disabled={(storageQuantity ?? 0) === 12}
            >
              +
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {renderPrice(rightTopText, rightCenterText, rightBottomText)}
      </div>
    </div>
  );
}
