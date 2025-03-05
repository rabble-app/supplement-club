"use client";
import Image from "next/image";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import { getQuarterInfo } from "@/utils/utils";
import { type ReactNode, useEffect, useState } from "react";
import PlanDialog from "../subscription-managment/PlanDialog";

const ConditionalLink = ({
	href,
	condition,
	children,
}: Readonly<{
	href: string;
	condition: boolean;
	children: ReactNode;
}>) => {
	if (condition) {
		return <Link href={href}>{children}</Link>;
	}
	return <>{children}</>;
};

export default function ManagePlanCard({
	model,
}: Readonly<{
	model: IManagePlanModel;
}>) {
	const [totalCount, setTotalCount] = useState(0);
	const [totalCapsules, setTotalCapsules] = useState(0);
	const [totalRrp, setTotalRrp] = useState(0);
	const [percentage, setPercentage] = useState(0);
	const { nextDeliveryTextShort } = getQuarterInfo();

	useEffect(() => {
		const totalSum = model?.team?.basket?.reduce(
			(sum, item) => sum + (item?.capsulePerDay ?? 0) * 0.25,
			0,
		);
		const totalRRP = Math.round(
			model?.team?.basket?.reduce(
				(sum, item) => sum + (item?.product?.rrp ?? 0),
				0,
			),
		);
		const totalCaps = model?.team?.basket?.reduce(
			(sum, item) => sum + (item?.capsulePerDay ?? 0),
			0,
		);

		setTotalRrp(totalRRP);
		if (totalSum > 0 && +totalRRP > 0) {
			setPercentage(totalSum / Number(totalRRP));
		}
		setTotalCount(totalSum);
		setTotalCapsules(totalCaps);
	}, [model]);
	return (
		<ConditionalLink
			href={`/dashboard/manage-plans/${model.id}`}
			condition={model.subscriptionStatus === "ACTIVE" && !model.isSkipped}
		>
			<div className="py-[16px] px-[12px] bg-white rounded-[12px] shadow-card grid gap-[10px]">
				<div className="flex justify-between items-center h-[69px]">
					{" "}
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
								{model.name && (
									<span className="text-[12px] leading-[13px] font-hagerman text-grey4">
										{model.name} -
									</span>
								)}
								<span className="text-[12px] leading-[13px] font-inconsolata text-grey4">
									Subscription
								</span>
							</div>

							<div className="text-[16px] font-[800] text-black flex items-center gap-[5px] font-inconsolata">
								£{totalCount}{" "}
								<span className="text-[10px] leading-[11px] text-grey1 font-bold font-inconsolata">
									(£0.25 / capsule)
								</span>
							</div>

							<div className="text-[12px] leading-[13px] font-inconsolata font-[400] text-grey4">
								RRP{" "}
								<span className="text-[12px] leading-[13px] font-inconsolata line-through font-bold">
									£{totalRrp}
								</span>{" "}
								<span className="text-[12px] leading-[13px] font-inconsolata font-bold text-blue">
									{Number(percentage).toFixed(2)}% OFF
								</span>
							</div>

							<div className="text-[12px] leading-[13px] text-grey4 font-helvetica">
								{totalCapsules} Capsules per Day -{" "}
								{(model.quantity ?? 0) * totalCapsules} Capsules
							</div>
						</div>
					</div>
					<ChevronRight className="text-blue" />
				</div>
				{model.isSkipped && model.subscriptionStatus === "ACTIVE" && (
					<div className="contents">
						<div className="h-[30px] rounded-[17px]  flex justify-center items-center text-center text-[16px] leading-[20px] font-hagerman text-blue bg-blue11/10">
							You&apos;ve opted to skip the {nextDeliveryTextShort}
						</div>

						<PlanDialog
							model={model}
							title="Are you sure you want to Opt back in?"
							triggerText="Opt Back In"
							apiRoute="opt-back-in"
						/>
					</div>
				)}
				{model.subscriptionStatus !== "ACTIVE" && (
					<>
						<div className="h-[30px] rounded-[17px]  flex justify-center items-center text-center text-[16px] leading-[20px] font-hagerman bg-[#FF3B301A] text-red3">
							You&apos;ve cancelled this plan
						</div>
						<PlanDialog
							model={model}
							title="Are you sure you want to reactivate your plan?"
							triggerText="Re-Activate Plan"
							apiRoute="reactivate-plan"
						/>
					</>
				)}
			</div>
		</ConditionalLink>
	);
}
