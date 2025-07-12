/** @format */

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

function renderPrice(
  rightTopText: string,
  rightCenterText: React.ReactNode,
  rightBottomText: React.ReactNode
) {
  return (
    <div className="flex flex-col items-end gap-[8px]">
      {rightTopText && (
        <p className="text-blue font-normal text-sm font-inconsolata">
          {rightTopText}
        </p>
      )}
      {rightCenterText}
      {rightBottomText && (
        <p className="text-blue font-normal text-sm font-inconsolata">
          {rightBottomText}
        </p>
      )}
    </div>
  );
}

export default function OrderSummaryCard2({
  imageSrc,
  leftTopText,
  leftBottomText,
  leftCenterText,
  rightTopText,
  rightCenterText,
  rightBottomText,
  updateQuantityAction,
  className,
  step,
  isAlignmentDialog,
  isMember,
  isUpdatableQuantity,
  gPerCount,
  pochesRequired,
}: Readonly<{
  imageSrc: string;
  leftTopText: string;
  leftBottomText: string;
  leftCenterText: string;
  rightTopText: string;
  rightCenterText: React.ReactNode;
  rightBottomText: React.ReactNode;
  updateQuantityAction?: (val: number) => void;
  className?: string;
  step?: number;
  isAlignmentDialog?: boolean;
  isMember?: boolean;
  isUpdatableQuantity?: boolean;
  gPerCount?: number;
  pochesRequired?: number;
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
    setStorageQuantity(updatableQuantity);
  }, [updatableQuantity]);

  const decrement = () => {
    const currentQuantity = storageQuantity ?? 0;
    if (updateQuantityAction && currentQuantity > 0) {
      updateQuantityAction(currentQuantity - 1);
    }
  };

  return (
    <div
      className={`grid gap-2 items-start ${className} ${
        imageSrc
          ? "grid-cols-[61px_1fr] md:grid-cols-[61px_1fr_210px]"
          : "md:grid-cols-[1fr_210px]"
      }`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageSrc}
          width={61}
          height={61}
          unoptimized
        />
      )}

      <div className="grid gap-2">
        <p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
          {leftTopText}
        </p>
        <p className="text-[16px] leading-[16px] font-[600] font-inconsolata">
          {leftCenterText}
        </p>
        {leftBottomText && (
          <p className="text-[14px] leading-[14px] font-inconsolata text-grey4">
            {leftBottomText}
          </p>
        )}

        <div className="flex md:hidden">
          {renderPrice(rightTopText, rightCenterText, rightBottomText)}
        </div>
        {isMember && isUpdatableQuantity && step !== 4 && (
          <div className="flex items-center gap-[16px]">
            <Button
              type="button"
              className={`w-[20px] h-[20px] rounded-[50%] bg-[#666666] text-white p-0 text-[20px] cursor-pointer ${
                storageQuantity === 1 && isAlignmentDialog
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={decrement}
              disabled={storageQuantity === 1 && isAlignmentDialog}
            >
              -
            </Button>
            <span className="text-[20px] font-bold font-inconsolata">
              {storageQuantity}
            </span>
            <Button
              type="button"
              className={`w-[20px] h-[20px] rounded-[50%] bg-[#666666] text-white p-0 text-[20px] cursor-pointer select-none ${
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

      <div className="hidden md:flex justify-end">
        {renderPrice(rightTopText, rightCenterText, rightBottomText)}
      </div>
    </div>
  );
}
