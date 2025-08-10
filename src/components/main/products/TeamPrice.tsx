/** @format */

import Image from "next/image";

import type IPriceInfoModel from "@/utils/models/api/IPriceInfoModel";
import { Separator } from "@radix-ui/react-separator";

export default function TeamPrice({
  members,
  rrp,
  price,
  priceInfo,
  isFoundingProduct,
  pricePerCount,
  nextPriceDiscountLevel,
  activeMemberIndex,
  discount,
  activePercentageDiscount,
  gramsPerCount,
  capsuleCount,
}: Readonly<{
  rrp: number;
  members: number;
  price: number;
  isFoundingProduct: boolean;
  priceInfo: IPriceInfoModel[];
  pricePerCount: number;
  nextPriceDiscountLevel: {
    membersNeeded: number;
    expectedDiscount: number;
  };
  activeMemberIndex: number;
  discount: number;
  activePercentageDiscount: number;
  gramsPerCount: number;
  capsuleCount: number;
}>) {
  const gPerCount = Number(gramsPerCount) === 0 ? 1 : Number(gramsPerCount);
  function getCurrentClasses(percentageDiscount: number) {
    let classes = "border-[1px] bg-grey19 my-[15px] border-grey20";

    if (percentageDiscount === activePercentageDiscount && !isFoundingProduct) {
      classes = " bg-white h-[223px] rounded-[5px] my-[0]";
    } else if (percentageDiscount < activePercentageDiscount) {
      classes = " bg-grey14 my-[15px]";
    }

    return classes;
  }

  function getCellClasses(index: number, i: number) {
    const classes = [];

    if (index === 0 && i === 3) {
      classes.push("rounded-l-[20px]");
    }
    if (index === priceInfo.length - 1 && i === 6)
      classes.push("rounded-r-[20px]");

    if ((index === 0 && i < 3) || (index === priceInfo.length - 1 && i > 6)) {
      classes.push(
        index <= activeMemberIndex ? "bg-transparent" : "bg-transparent"
      );
      classes.push("z-[20]");
    } else {
      if (isCellIncluded(index, i)) {
        classes.push("bg-blue");
      } else classes.push("bg-grey");
    }
    return classes.join(" ");
  }

  function isActiveIndex(infoIndex: number): boolean {
    return activeMemberIndex === infoIndex;
  }

  function shouldIncludePreviousToMiddle(
    infoIndex: number,
    idx: number
  ): boolean {
    return (
      (activeMemberIndex === 0 && idx < 4) || (activeMemberIndex > 0 && idx < 6)
    );
  }

  function getAverageMembers(infoIndex: number): number {
    return (
      ((priceInfo[infoIndex + 1]?.teamMemberCount || 0) +
        priceInfo[infoIndex].teamMemberCount) /
      2
    );
  }

  function shouldShowBasedOnAvg(infoIndex: number, members: number): boolean {
    const avgMembers = getAverageMembers(infoIndex);
    return members >= avgMembers;
  }

  function shouldShowAfterMiddle(
    infoIndex: number,
    idx: number,
    members: number
  ): boolean {
    const avgMembers = getAverageMembers(infoIndex);
    const leftAvgItem = (avgMembers - priceInfo[infoIndex].teamMemberCount) / 5;
    return (
      Math.abs(5 - idx) * leftAvgItem + priceInfo[infoIndex].teamMemberCount <=
      members
    );
  }

  function shouldIncludeFirstInactive(
    infoIndex: number,
    idx: number,
    members: number
  ): boolean {
    const avgMem =
      ((priceInfo[infoIndex]?.teamMemberCount || 0) +
        (priceInfo[infoIndex - 1]?.teamMemberCount || 0)) /
      2;
    const unit = ((priceInfo[infoIndex]?.teamMemberCount || 0) - avgMem) / 5;
    return idx * unit + avgMem <= members;
  }

  function shouldIncludePreviousActive(infoIndex: number): boolean {
    return activeMemberIndex > infoIndex;
  }

  function shouldIncludeFirstValue(
    infoIndex: number,
    idx: number,
    members: number
  ): boolean {
    if (infoIndex !== 0 || idx >= 5) return false;
    const avg = priceInfo[0].teamMemberCount / 4;
    return idx * avg < members || (idx === 1 && members > 0);
  }

  function isCellIncluded(infoIndex: number, idx: number): boolean {
    if (isActiveIndex(infoIndex) && infoIndex === 0) {
      const circleCellIdx = 5;
      if (members === priceInfo[0].teamMemberCount) {
        return idx <= circleCellIdx;
      }
    }
    if (isActiveIndex(infoIndex)) {
      if (shouldIncludePreviousToMiddle(infoIndex, idx)) return true;
      if (shouldShowBasedOnAvg(infoIndex, members)) return true;
      if (shouldShowAfterMiddle(infoIndex, idx, members)) return true;
    }
    if (
      activeMemberIndex + 1 === infoIndex &&
      shouldIncludeFirstInactive(infoIndex, idx, members)
    )
      return true;

    if (shouldIncludePreviousActive(infoIndex)) return true;
    if (shouldIncludeFirstValue(infoIndex, idx, members)) return true;

    if (
      activeMemberIndex === -1 &&
      (members / priceInfo[0].teamMemberCount < 0.5 ||
        members / priceInfo[0].teamMemberCount < 1) &&
      idx < 4 &&
      infoIndex === 0 &&
      members !== 0
    )
      return true;

    return false;
  }

  const membersToLaunch = Math.abs(
    priceInfo[activeMemberIndex === -1 ? 0 : activeMemberIndex + 1]
      ?.teamMemberCount - members
  );

  return (
    <div>
      <div
        className={`flex flex-col md:flex-row md:justify-between md:items-start pb-[26px] pt-[16px] md:pb-[11px]`}
      >
        <div className="grid gap-[4px]">
          <div className="flex gap-[3px] items-center text-blue text-[22px] font-[600] leading-[25px] font-inconsolata">
            <Image
              src="/images/icons/user-profile-group-blue-icon.svg"
              alt="User profile group icon"
              width={30}
              height={30}
            />
            {members} {`${isFoundingProduct ? "Founding Members" : "Members"}`}
          </div>
          {!isFoundingProduct && activeMemberIndex + 1 < priceInfo.length && (
            <p className="text-[14px] md:text-[16px] font-semibold text-[#999999] leading-[18px] mb-2 md:mb-10">
              {nextPriceDiscountLevel?.membersNeeded} more members unlocks{" "}
              {nextPriceDiscountLevel?.expectedDiscount.toFixed(2)}% off for
              everyone
            </p>
          )}
          {isFoundingProduct && activeMemberIndex + 1 < priceInfo.length && (
            <p className="text-[14px] md:text-[16px] leading-[18px] font-semibold text-[#999999]">
              {membersToLaunch} more pre-orders until product launches!
            </p>
          )}
        </div>

        <div className="grid gap-[8px]">
          <div className="text-[28px] font-[900] font-inconsolata flex items-center">
            £{Number((price * capsuleCount) / gPerCount).toFixed(2)}{" "}
            <span className="text-[14px] md:text-[16px] leading-[18px] font-bold font-inconsolata text-grey1 ml-[2px] whitespace-nowrap">
              (£{pricePerCount.toFixed(2)} / count)
            </span>
          </div>
          <div className="text-[20px] leading-[20px] text-grey4 md:text-end font-inconsolata">
            RRP{" "}
            <span className="text-[20px] leading-[20px] line-through font-bold font-inconsolata">
              £{Number((rrp * capsuleCount) / gPerCount).toFixed(2)}
            </span>{" "}
            <span className="text-[20px] leading-[20px] font-bold text-blue font-inconsolata">
              {activePercentageDiscount
                ? activePercentageDiscount.toFixed(2)
                : discount.toFixed(2)}
              % OFF
            </span>
          </div>
        </div>
      </div>

      {isFoundingProduct && members < priceInfo[0]?.teamMemberCount && (
        <div className="bg-blue2 rounded-sm w-full mt-8 mb-2">
          <p className="text-blue font-bold text-base font-inconsolata w-full text-center py-2">
            When all {membersToLaunch + members} founding slots are reserved, we'll launch
            the product
          </p>
        </div>
      )}

      <div className="flex justify-center mb-[46px] relative md:mx-auto gap-[0] mt-0">
        {priceInfo.map((item, index) => (
          <div
            key={`info-${index + 1}`}
            className="relative grid overflow-hidden max-w-[148px] w-full"
          >
            {item.percentageDiscount === activePercentageDiscount &&
              !isFoundingProduct && (
                <div className="w-8 h-8 rounded-full bg-blue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] border-[1px] border-white" />
              )}
            {item.percentageDiscount === activePercentageDiscount &&
              isFoundingProduct && (
                <Image
                  src="/images/icons/lock-grey-icon.svg"
                  alt="User profile group icon"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
                  width={26}
                  height={26}
                />
              )}
            {item.percentageDiscount > activePercentageDiscount && (
              <Image
                src="/images/icons/lock-grey-icon.svg"
                alt="User profile group icon"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
                width={26}
                height={26}
              />
            )}
            {item.percentageDiscount < activePercentageDiscount && (
              <div className="w-5 h-5 rounded-full bg-blue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] border-[1px] border-white" />
            )}

            <div
              className={`p-[10px] grid gap-[8px] border-[1px] border-grey20 z-[1] ${
                item.percentageDiscount === activePercentageDiscount &&
                !isFoundingProduct
                  ? "h-[231px]"
                  : "h-[192px]"
              } relative w-full md:w-[148px]
									${getCurrentClasses(item.percentageDiscount)}`}
            >
              <div className="grid gap-[4px] mx-auto">
                <p
                  className={`text-[12px] leading-[13px] font-inconsolata font-bold text-center ${
                    item.percentageDiscount === activePercentageDiscount &&
                    !isFoundingProduct
                      ? "md:text-[24px] font-bold leading-[25px]"
                      : ""
                  }`}
                >
                  £
                  {item.actualDiscountedValue
                    ? (
                        (item.actualDiscountedValue * capsuleCount) /
                        gPerCount
                      ).toFixed(2)
                    : 0}
                </p>
                <p
                  className={`text-[12px] leading-[13px] font-inconsolata font-bold text-center
											${
                        item.percentageDiscount === activePercentageDiscount &&
                        !isFoundingProduct
                          ? "text-[14px] md:text-[16px] leading-[16px]"
                          : ""
                      }
											${
                        item.percentageDiscount === activePercentageDiscount &&
                        !isFoundingProduct
                          ? "text-blue text-[14px] md:text-[16px]"
                          : "text-grey6"
                      }`}
                >
                  {item.percentageDiscount}% OFF
                </p>
              </div>

              <Separator
                orientation="vertical"
                className=" w-[1px] h-[80px] mx-auto  bg-gradient-to-b from-grey23 from-[10px] via-grey24 via-[40px] to-grey23 top-[70px]"
              />

              {item.percentageDiscount === activePercentageDiscount &&
                !isFoundingProduct && (
                  <Image
                    src="/images/icons/user-profile-group-blue-icon.svg"
                    alt="User profile group icon"
                    className="mx-auto"
                    width={34}
                    height={34}
                  />
                )}
              {item.percentageDiscount === activePercentageDiscount &&
                isFoundingProduct && (
                  <Image
                    src="/images/icons/user-profile-group-grey-icon.svg"
                    alt="User profile group icon"
                    className="mx-auto"
                    width={26}
                    height={26}
                  />
                )}
              {item.percentageDiscount !== activePercentageDiscount && (
                <Image
                  src="/images/icons/user-profile-group-grey-icon.svg"
                  alt="User profile group icon"
                  className="mx-auto"
                  width={26}
                  height={26}
                />
              )}

              <p
                className={`text-[12px] leading-[13px] font-bold font-inconsolata  text-center ${
                  item.percentageDiscount === activePercentageDiscount &&
                  !isFoundingProduct
                    ? "text-black text-[18px]"
                    : "text-grey6"
                }`}
              >
                {item.teamMemberCount}+
              </p>
            </div>

            <div
              className={`absolute top-1/2 transform overflow-hidden -translate-y-1/2 h-[16px]  left-1/2 -translate-x-1/2
					z-[2] flex items-center gap-[4px] ${index === 0 ? "pr-[10px]" : ""}`}
            >
              {Array.from({ length: 9.5 }, (_, i) => i + 1).map((i) => (
                <div
                  key={i}
                  className={`min-w-[12.5px] h-[12.5px] ${getCellClasses(
                    index,
                    i
                  )}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
