import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

import ClaimRewardDialog from "./ClaimRewardDialog";

export default function ReferalCard({
	isQuickWin,
	isActive,
	rate,
	requires,
	credit,
	isBestValue,
	percentage,
	claimRewardAction,
	openAction,
}: Readonly<{
	isQuickWin?: boolean;
	isActive: boolean;
	rate: number;
	requires: number;
	credit: number;
	isBestValue?: boolean;
	percentage: number;
	claimRewardAction: (credit: number) => void;
	openAction: (val: boolean) => void;
}>) {
	return (
		<div
			onClick={() => openAction(true)}
			onKeyDown={() => {}}
			className={` p-[16px] rounded-[4px] border-[1px] border-grey35 flex justify-between items-center ${isActive ? "bg-white shadow-3 mx-[-10px] md:mx-[0]" : "md:mx-[24px] bg-grey35 shadow-5"}`}
		>
			<div className="grid gap-[16px]">
				<div className="flex gap-[8px] items-center">
					<div className="text-[24px] leading-[27px] font-hagerman">
						🎉 £{credit.toFixed(2)} Credit
					</div>
					{isQuickWin && (
						<div className="text-[12px] leading-[13px] font-[500] font-inconsolata px-[10px] py-[4px] bg-[#FBF89F4D]">
							⭐ Quick Win
						</div>
					)}
					{isBestValue && (
						<div className="text-[12px] leading-[13px] font-[500] font-inconsolata px-[10px] py-[4px] bg-[#FBF89F4D]">
							⭐ Best Value
						</div>
					)}
				</div>
				<div className="grid grid-cols-[auto_1px_auto] gap-[16px]">
					<div className="grid gap-[4px]">
						<p className="text-[12px] leading-[13px] font-[500] font-inconsolata">
							Requires
						</p>
						<p className="text-[16px] leading-[16px] font-[700] font-inconsolata text-blue">
							{requires.toLocaleString()} CC
						</p>
					</div>
					<Separator className="bg-[#F0F0F0] w-[1px] h-full" />
					<div className="grid gap-[4px]">
						<p className="text-[12px] leading-[13px] font-[500] font-inconsolata">
							Rate
						</p>
						<p className="text-[16px] leading-[16px] font-[700] font-inconsolata text-blue">
							{rate} CC per £1
						</p>
					</div>
				</div>
			</div>
			{!isActive && (
				<div className="grid gap-[4px] justify-center">
					<Image
						src="/images/icons/refer-lock-icon.svg"
						className="mx-auto"
						alt="Lock icon"
						width={40}
						height={40}
					/>
					<p className="text-[16px] leading-[16px] font-[500] font-inconsolata">
						{percentage?.toFixed(0) ?? 0}% Complete
					</p>
				</div>
			)}
			{isActive && (
				<ClaimRewardDialog
					claimRewardAction={claimRewardAction}
					credit={credit}
					requires={requires}
				/>
			)}
		</div>
	);
}
