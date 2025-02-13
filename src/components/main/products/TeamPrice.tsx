import Image from "next/image";

import type IPriceInfoModel from "@/utils/models/api/IPriceInfoModel";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";

export default function TeamPrice({
	members,
	price,
	rrp,
	wholesalePrice,
	priceInfo,
}: Readonly<{
	members: number;
	price: number;
	rrp: number;
	wholesalePrice: number;
	priceInfo: IPriceInfoModel[];
}>) {
	const [activeMemberIndex, setActiveMemberIndex] = useState(1);
	useEffect(() => {
		for (const info of priceInfo) {
			info.price = (price * info.percentageDiscount) / 100;
		}
	}, [priceInfo, price]);

	useEffect(() => {
		const itemIdx = priceInfo.findIndex((p) => p.teamMemberCount > members);
		if (itemIdx === -1) {
			setActiveMemberIndex(priceInfo.length);
		} else {
			setActiveMemberIndex(itemIdx - 1);
		}
	}, [priceInfo, members]);

	function getCurrentClasses(index: number) {
		let classes = " bg-grey19 my-[15px]";

		if (index === activeMemberIndex) {
			classes = " bg-white h-[223px] rounded-[5px] my-[0]";
		} else if (index < activeMemberIndex) {
			classes = "bg-grey14 my-[15px]";
		}

		return classes;
	}

	const teamPrice = priceInfo.find(
		(p) =>
			(price - price * (p.percentageDiscount / 100)).toString() ===
			wholesalePrice.toString(),
	);

	function getCellClasses(index: number, i: number) {
		let result = "   ";
		if (index === 0 && i === 3) {
			result += " rounded-l-[20px]";
		}

		if (index === priceInfo.length - 1 && i === 7) {
			result += " rounded-r-[20px]";
		}

		if ((index === 0 && i < 3) || (index === priceInfo.length - 1 && i > 7)) {
			if (index <= activeMemberIndex) {
				result += " bg-grey14";
			} else result += " bg-grey19";

			result += "  z-[20]";
		} else {
			if (isCellIncluded(index, i)) {
				result += " bg-blue";
				return result;
			}

			result += " bg-grey";
		}

		return result;
	}

	function isActiveIndex(infoIndex: number): boolean {
		return activeMemberIndex === infoIndex;
	}

	function shouldIncludePreviousToMiddle(
		infoIndex: number,
		idx: number,
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
		members: number,
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
		members: number,
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
		members: number,
	): boolean {
		if (infoIndex !== 0 || idx >= 5) return false;
		const avg = priceInfo[0].teamMemberCount / 4;
		return idx * avg < members || (idx === 1 && members > 0);
	}

	function isCellIncluded(infoIndex: number, idx: number): boolean {
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

		return false;
	}

	return (
		<div>
			<p className="text-[24px] leading-[28px] font-bold font-inconsolata pt-[32px] md:pt-[0]">
				Team Price
			</p>
			<div className="flex flex-col md:flex-row md:justify-between md:items-start pt-[16px] md:pb-[11px]">
				<div className="grid gap-[4px]">
					<div className="flex gap-[3px] items-center text-blue text-[24px] font-[600] leading-[25px] font-inconsolata">
						<Image
							src="/images/icons/user-profile-group-blue-icon.svg"
							alt="User profile group icon"
							width={30}
							height={30}
						/>
						{members} Members
					</div>

					<p className="text-[16px] leading-[18px]">
						{priceInfo[activeMemberIndex + 1]?.teamMemberCount - members} more
						members unlocks{" "}
						{priceInfo[activeMemberIndex + 1]?.percentageDiscount}% off for
						everyone
					</p>
				</div>
				<div className="grid gap-[8px]">
					<div className="text-[32px] leading-[34px] font-[900] font-inconsolata flex items-center">
						£{Number(wholesalePrice).toFixed(2)}{" "}
						<span className="text-[16px] leading-[18px] font-bold font-inconsolata text-grey1 ml-[2px]">
							(£0.25 / capsule)
						</span>
					</div>
					<div className="text-[16px] leading-[16px] text-grey4 pb-[34px] md:text-end font-inconsolata">
						RRP{" "}
						<span className="text-[16px] leading-[16px] line-through font-bold font-inconsolata">
							£{rrp}
						</span>{" "}
						{activeMemberIndex > 0 && (
							<span className="text-[16px] leading-[16px] font-bold text-blue font-inconsolata">
								{priceInfo[activeMemberIndex]?.percentageDiscount}% OFF
							</span>
						)}
					</div>
				</div>
			</div>
			<div className="flex justify-center mb-[46px] relative mx-auto gap-[0]">
				{priceInfo.map((item, index) => (
					<div
						key={`info-${index + 1}`}
						className="relative grid overflow-hidden"
					>
						{index === activeMemberIndex && (
							<Image
								src="/images/icons/check-blue-icon.svg"
								alt="User profile group icon"
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
								width={34}
								height={34}
							/>
						)}
						{index > activeMemberIndex && (
							<Image
								src="/images/icons/lock-grey-icon.svg"
								alt="User profile group icon"
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
								width={26}
								height={26}
							/>
						)}
						{index < activeMemberIndex && (
							<Image
								src="/images/icons/check-blue-icon.svg"
								alt="User profile group icon"
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
								width={26}
								height={26}
							/>
						)}

						<div
							className={`p-[10px] border-[1px] border-grey20 grid gap-[8px] z-[1] h-[192px] relative w-[148px]
									${getCurrentClasses(index)}	`}
						>
							<div className="grid gap-[4px] mx-auto">
								<p
									className={`text-[12px] leading-[13px] font-inconsolata font-bold text-center ${item === teamPrice && activeMemberIndex > 0 ? "text-[24px] leading-[25px]" : ""}`}
								>
									£
									{(price - price * (item.percentageDiscount / 100)).toFixed(
										2,
									)}{" "}
								</p>
								<p
									className={`text-[12px] leading-[13px] font-inconsolata font-bold text-center
											${index === activeMemberIndex ? "text-[16px] leading-[16px]" : ""}
											${index < activeMemberIndex || index === activeMemberIndex ? "text-blue" : "text-grey6"}`}
								>
									{item.percentageDiscount}% OFF
								</p>
							</div>

							<Separator
								orientation="vertical"
								className=" w-[1px] h-[80px] mx-auto  bg-gradient-to-b from-grey23 from-[10px] via-grey24 via-[40px] to-grey23 top-[70px]"
							/>

							{index === activeMemberIndex && (
								<Image
									src="/images/icons/user-profile-group-blue-icon.svg"
									alt="User profile group icon"
									className="mx-auto"
									width={34}
									height={34}
								/>
							)}
							{index !== activeMemberIndex && (
								<Image
									src="/images/icons/user-profile-group-grey-icon.svg"
									alt="User profile group icon"
									className="mx-auto"
									width={26}
									height={26}
								/>
							)}

							<p className="text-[12px] leading-[13px] font-bold font-inconsolata text-grey6 text-center">
								{item.teamMemberCount}+
							</p>
						</div>

						<div
							className={`absolute top-1/2 transform overflow-hidden -translate-y-1/2 h-[16px]  left-1/2 -translate-x-1/2
					z-[2] flex items-center gap-[4px] ${index === 0 ? "pl-[1px]" : ""}`}
						>
							{Array.from({ length: 9.5 }, (_, i) => i + 1).map((i) => (
								<div
									key={i}
									className={`min-w-[12.5px] h-[12.5px] ${getCellClasses(index, i)}`}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
