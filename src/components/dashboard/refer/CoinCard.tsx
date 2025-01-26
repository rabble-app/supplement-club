import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

import ClaimRewardDialog from "./ClaimRewardDialog";

import type { IReferCoinModel } from "@/utils/models/IReferCoinModel";

export default function CoinCard({
	model,
}: Readonly<{ model: IReferCoinModel }>) {
	return (
		<>
			{model.percentage >= 100 && (
				<div className="bg-white p-[16px] rounded-[4px] shadow-3 border-[1px] border-grey35 flex justify-between items-center">
					<div className="grid gap-[16px]">
						<div className="flex gap-[8px] items-center">
							<div className="text-[24px] leading-[27px] font-hagerman">
								🎉 £{model.credit} Credit
							</div>
							{model.isQuickWin && (
								<div className="text-[12px] leading-[13px] font-[500] font-inconsolata px-[10px] py-[4px] bg-[#FBF89F4D]">
									⭐ Quick Win
								</div>
							)}
						</div>
						<div className="grid grid-cols-[auto_1px_auto] gap-[16px]">
							<div className="grid gap-[4px]">
								<p className="text-[12px] leading-[13px] font-[500] font-inconsolata">
									Requires
								</p>
								<p className="text-[16px] leading-[16px] font-[700] font-inconsolata text-blue">
									{model.requires.toLocaleString()} CC
								</p>
							</div>
							<Separator className="bg-[#F0F0F0] w-[1px] h-full" />
							<div className="grid gap-[4px]">
								<p className="text-[12px] leading-[13px] font-[500] font-inconsolata">
									Rate
								</p>
								<p className="text-[16px] leading-[16px] font-[700] font-inconsolata text-blue">
									{model.rate} CC per £1
								</p>
							</div>
						</div>
					</div>
					<ClaimRewardDialog credit={model.credit} requires={model.requires} />
				</div>
			)}
			{model.percentage < 100 && (
				<div className="bg-grey35 p-[16px] rounded-[4px] shadow-5 border-[1px] border-grey35 flex justify-between items-center mx-[24px]">
					<div className="grid gap-[16px]">
						<div className="flex gap-[8px] items-center">
							<div className="text-[24px] leading-[27px] font-hagerman">
								🎉 £{model.credit} Credit
							</div>
							{model.isBestValue && (
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
									{model.requires.toLocaleString()} CC
								</p>
							</div>
							<Separator className="bg-[#F0F0F0] w-[1px] h-full" />
							<div className="grid gap-[4px]">
								<p className="text-[12px] leading-[13px] font-[500] font-inconsolata">
									Rate
								</p>
								<p className="text-[16px] leading-[16px] font-[700] font-inconsolata text-blue">
									{model.rate} CC per £1
								</p>
							</div>
						</div>
					</div>
					<div className="grid gap-[4px] justify-center">
						<Image
							src="/images/icons/refer-lock-icon.svg"
							className="mx-auto"
							alt="Lock icon"
							width={40}
							height={40}
						/>
						<p className="text-[16px] leading-[16px] font-[500] font-inconsolata">
							{model.percentage}% Complete
						</p>
					</div>
				</div>
			)}
		</>
	);
}
