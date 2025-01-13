import Image from "next/image";

import { Separator } from "@radix-ui/react-separator";

import type IUnlockTeamPriceMode from "@/utils/models/IUnlockTeamPriceMode";

const teamsItems = [
	{
		id: 1,
		price: 45,
		percent: 28,
		members: 50,
	},
	{
		id: 2,
		price: 41,
		percent: 33,
		members: 100,
	},
	{
		id: 3,
		price: 37,
		percent: 38,
		members: 300,
	},
	{
		id: 4,
		price: 35,
		percent: 42,
		members: 500,
	},
] as IUnlockTeamPriceMode[];

export default function TeamPrice({ members }: Readonly<{ members: number }>) {
	function getCurrentClasses(index: number) {
		let classes = " bg-grey19 my-[15px]";

		if (index === currentIndex) {
			classes = " bg-white h-[223px] rounded-[5px] my-[0]";
		} else if (index < currentIndex) {
			classes = "bg-grey14 my-[15px]";
		}

		return classes;
	}

	let currentIndex = 2;

	if (members <= 50) {
		currentIndex = 0;
	} else if (members >= 500) {
		currentIndex = 3;
	} else if (members > 50 && members <= 300) {
		currentIndex = 1;
	}
	const teamPrice = teamsItems[currentIndex];
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
						25 more members unlocks 38% off for everyone
					</p>
				</div>
				<div className="grid gap-[8px]">
					<div className="text-[32px] leading-[34px] font-[900] font-inconsolata flex items-center">
						£{teamPrice.price}.00{" "}
						<span className="text-[16px] leading-[18px] font-bold font-inconsolata text-grey1 ml-[2px]">
							(£0.25 / capsule)
						</span>
					</div>
					<div className="text-[16px] leading-[16px] text-grey4 pb-[28px] md:mb-[20px] lg:mb-[16px] md:text-end font-inconsolata">
						RRP{" "}
						<span className="text-[16px] leading-[16px] line-through font-bold font-inconsolata">
							£144
						</span>{" "}
						<span className="text-[16px] leading-[16px] font-bold text-blue font-inconsolata">
							{teamPrice.percent}% OFF
						</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-4 mb-[46px] relative mx-[-16px] md:mx-[0]">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 overflow-hidden -translate-y-1/2 h-[16px] w-[calc(100%-80px)] bg-grey19 z-[2] flex items-center gap-[4px] shadow-progress rounded-[20px]">
					{Array.from({ length: 35 }, (_, i) => i + 1).map((i, index) => (
						<div
							key={i}
							className={`min-w-[12px] h-[12px] ${
								index * 14 < members ? "bg-blue" : "bg-grey18"
							}`}
						/>
					))}
				</div>

				{teamsItems.map((item, index) => (
					<div key={item.id} className="relative">
						{index === currentIndex && (
							<Image
								src="/images/icons/check-blue-icon.svg"
								alt="User profile group icon"
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
								width={34}
								height={34}
							/>
						)}
						{index > currentIndex && (
							<Image
								src="/images/icons/lock-grey-icon.svg"
								alt="User profile group icon"
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
								width={26}
								height={26}
							/>
						)}
						{index < currentIndex && (
							<Image
								src="/images/icons/check-blue-icon.svg"
								alt="User profile group icon"
								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
								width={26}
								height={26}
							/>
						)}

						<div
							className={`p-[10px] border-[1px] border-grey20 grid gap-[8px] z-[1] h-[192px] relative
								 ${getCurrentClasses(index)}`}
						>
							<div className="grid gap-[4px] mx-auto">
								<p
									className={`text-[12px] leading-[13px] font-inconsolata font-bold text-center ${item === teamPrice ? "text-[24px] leading-[25px]" : ""}`}
								>
									£{item.price}.00{" "}
								</p>
								<p
									className={`text-[12px] leading-[13px] font-inconsolata font-bold text-center
										 ${index === currentIndex ? "text-[16px] leading-[16px]" : ""}
										  ${index < currentIndex || index === currentIndex ? "text-blue" : "text-grey6"}`}
								>
									{item.percent}% OFF
								</p>
							</div>

							<Separator
								orientation="vertical"
								className=" w-[1px] h-[80px] mx-auto  bg-gradient-to-b from-grey23 from-[10px] via-grey24 via-[40px] to-grey23 top-[70px]"
							/>

							{index === currentIndex && (
								<Image
									src="/images/icons/user-profile-group-blue-icon.svg"
									alt="User profile group icon"
									className="mx-auto"
									width={34}
									height={34}
								/>
							)}
							{index !== currentIndex && (
								<Image
									src="/images/icons/user-profile-group-grey-icon.svg"
									alt="User profile group icon"
									className="mx-auto"
									width={26}
									height={26}
								/>
							)}

							<p className="text-[12px] leading-[13px] font-bold font-inconsolata text-grey6 text-center">
								{item.members}+
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
