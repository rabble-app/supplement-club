import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

import type IUnlockTeamPriceMode from "@/utils/models/IUnlockTeamPriceMode";

const teamsItems = [
	{
		id: 1,
		price: 45,
		percent: 33,
		members: 50,
	},
	{
		id: 2,
		price: 37,
		percent: 38,
		members: 100,
	},
	{
		id: 3,
		price: 35,
		percent: 42,
		members: 200,
	},
] as IUnlockTeamPriceMode[];

export default function MembersLaunches({ members }: { members: number }) {
	const currentIndex = members <= 50 ? 0 : members >= 200 ? 2 : 1;
	return (
		<div className="flex justify-end md:gap-[60px] mb-[52px] relative mx-[-16px] md:mx-[0]">
			<div className="h-[26px] flex items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 overflow-hidden -translate-y-1/2 w-[calc(100%-80px)]">
				<div className="bg-grey19 z-[2] flex items-center gap-[5px] shadow-progress rounded-[20px] h-[16px]">
					{Array.from({ length: 31 }, (_, i) => i + 1).map((i, index) => (
						<div
							key={i}
							className={`min-w-[12px] h-[12px] ${
								(index * 5) < members ? "bg-grey23" : "bg-grey18"
							}`}
						/>
					))}
				</div>

				<div
					className={`absolute z-[2] h-[28px] text-[12px] leading-[13px] font-bold font-helvetica w-[30px] flex 
				justify-center items-center rounded-[50%] border-[1px] border-white text-white bg-grey23 left-[140px]`}
				>
					{members}
				</div>
			</div>

			{members < 50 && (
				<div className="text-[10px] leading-[11px] text-blue font-helvetica text-center bg-blue10 h-[30px] rounded-[100px] px-[10px] py-[2px] w-[145px] absolute top-[220px] left-1/2 transform -translate-x-1/2 -translate-y-1/2  md:left-[75px] md:top-[50px]">
					When it gets to 50 people we will launch the product
				</div>
			)}
			{teamsItems.map((item, index) => (
				<div key={item.id} className="relative">
					<Image
						src="/images/icons/lock-grey-icon2.svg"
						alt="User profile group icon"
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
						width={26}
						height={26}
					/>

					<div className="p-[10px] grid gap-[8px] z-[1] relative w-[100px]">
						<div className="grid gap-[4px] mx-auto">
							<p
								className={`text-[12px] leading-[13px] font-inconsolata font-bold text-center ${index === currentIndex || index < currentIndex ? "text-blue" : "text-grey6"}`}
							>
								£{item.price}.00{" "}
							</p>
							<p
								className={`text-[12px] leading-[13px] font-inconsolata font-bold text-center ${index === currentIndex || index < currentIndex ? "text-blue" : "text-grey6"}`}
							>
								{item.percent}% OFF
							</p>
						</div>

						<Separator
							orientation="vertical"
							className="bg-black w-[1px] h-[80px] mx-auto bg-gradient-to-b from-grey23 from-[20px] via-grey24 via-[40px] to-grey23"
						/>

						<Image
							src="/images/icons/user-profile-group-grey-icon.svg"
							alt="User profile group icon"
							className="mx-auto"
							width={26}
							height={26}
						/>

						<p className="text-[12px] leading-[13px] font-bold font-inconsolata text-grey6 text-center">
							{item.members}+
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
