import Image from "next/image";

import { ChevronRight } from "lucide-react";

import type IManagePlanModel from "@/utils/models/IManagePlanModel";

export default function ManagePlanCard(model: Readonly<IManagePlanModel>) {
	let buttonTitle = "Opt Back in";
	let label = "You've opted to skip the Jan 1 2025 Drop";

	if (model.isSkipped) {
		buttonTitle = "Re-Activate Plan";
		label = "You’ve cancelled this plan";
	}
	return (
		<div className="py-[16px] px-[12px] bg-white rounded-[12px] shadow-card grid gap-[10px]">
			<div className="flex justify-between items-center h-[69px]">
				<div className="grid grid-cols-[69px_1fr] gap-[8px]">
					<div className="rounded-[8px] border-[1px] border-grey28 w-[69px] p-[4px]">
						<Image
							src="/images/supplement-mockup.svg"
							alt="supplement icon"
							width={61}
							height={61}
						/>
					</div>
					<div className="flex flex-col gap-[2px] h-[64px]">
						<div className="flex items-center gap-[2px]">
							<span className="text-[12px] leading-[13px] font-hagerman text-grey4">
								{model.name} -
							</span>
							<span className="text-[12px] leading-[13px] font-inconsolata text-grey4">
								Subscription
							</span>
						</div>

						<div className="text-[16px] font-[800] text-black flex items-center gap-[5px] font-inconsolata">
							£{model.price?.toFixed(2)}{" "}
							<span className="text-[10px] leading-[11px] text-grey1 font-bold font-inconsolata">
								(£{model.pricePerCapsule} / capsule)
							</span>
						</div>

						<div className="text-[12px] leading-[13px] font-inconsolata font-[400] text-grey4">
							RRP{" "}
							<span className="text-[12px] leading-[13px] font-inconsolata line-through font-bold">
								£144
							</span>{" "}
							<span className="text-[12px] leading-[13px] font-inconsolata font-bold text-blue">
								{model.percent}% OFF
							</span>
						</div>

						<div className="text-[12px] leading-[13px] text-grey4 font-helvetica">
							{model.description}
						</div>
					</div>
				</div>

				<ChevronRight className="text-blue" />
			</div>
			{(model.isSkipped || !model.isActive) && (
				<div className="contents">
					<div
						className={`h-[30px] rounded-[17px]  flex justify-center items-center text-center text-[16px] leading-[20px] font-hagerman ${model.isSkipped ? "bg-red3/10 text-red3" : "text-blue bg-blue11/10"}`}
					>
						{label}
					</div>
					<div className="text-blue flex justify-center items-center text-center h-[50px] rounded-[2px] bg-grey27/[12%] text-[17px] leading-[22px] font-bold font-inconsolata">
						{buttonTitle}
					</div>
				</div>
			)}
		</div>
	);
}
