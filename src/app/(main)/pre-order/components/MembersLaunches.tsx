import type IUnlockTeamPriceMode from "@/utils/models/IUnlockTeamPriceMode";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

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
		<div>
			<div className="flex justify-end gap-[60px] mb-[52px] relative mx-[-16px] md:mx-[0]">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 overflow-hidden -translate-y-1/2 h-[16px] w-[calc(100%-80px)] bg-grey19 z-[2] flex items-center gap-[5px] shadow-progress rounded-[20px]">
					{Array.from({ length: 50 }, (_, i) => i + 1).map((i, index) => (
						<div
							key={i}
							className={`min-w-[12px] h-[12px] ${
								(index * 12) < members ? "bg-blue" : "bg-grey18"
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

						{index !== currentIndex && (
							<>
								{index > currentIndex && (
									<Image
										src="/images/icons/lock-grey-icon.svg"
										alt="User profile group icon"
										className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
										width={26}
										height={26}
									/>
								)}

								{index <= currentIndex && (
									<Image
										src="/images/icons/check-blue-icon.svg"
										alt="User profile group icon"
										className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
										width={26}
										height={26}
									/>
								)}
							</>
						)}
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
