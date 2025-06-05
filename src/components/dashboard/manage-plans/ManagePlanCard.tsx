"use client";
import Image from "next/image";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import { type ReactNode } from "react";
import OptBackInDialog from "../subscription-managment/OptBackInDialog";
import ReactivatePlanDialog from "../subscription-managment/ReactivatePlanDialog";

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
	const units = model.team?.basket[0]?.product?.unitsOfMeasurePerSubUnit === "grams" ? "g" : " Capsules";
	const rrp = Number(model.team?.basket[0]?.product?.rrp ?? 0);
	const price = Number(model.team?.basket[0]?.product?.price ?? 0);

	const discountPercentage = ((rrp - price) / rrp) * 100;

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
								£{Number(model.team?.basket[0]?.product?.price ?? 0) * (model.quantity ?? 0)}{" "}
								<span className="text-[10px] leading-[11px] text-grey1 font-bold font-inconsolata">
									(£{(Number(model.team?.basket[0]?.product?.price ?? 0 )* (model.quantity) / (90* (model.capsulePerDay ?? 0))).toFixed(2)}/count)
								</span>
							</div>

							<div className="text-[12px] leading-[13px] font-inconsolata font-[400] text-grey4">
								RRP{" "}
								<span className="text-[12px] leading-[13px] font-inconsolata line-through font-bold">
									£{Number(model.team?.basket[0]?.product?.rrp ?? 0) * (model.quantity ?? 0)}
								</span>{" "}
								<span className="text-[12px] leading-[13px] font-inconsolata font-bold text-blue">
									{Number(discountPercentage).toFixed(2)}% OFF
								</span>
							</div>

							<div className="text-[12px] leading-[13px] text-grey4 font-helvetica">
								{model.capsulePerDay} {units} per Day - {90 * model.capsulePerDay}{" "}
								{units}
							</div>
						</div>
					</div>
					<ChevronRight className="text-blue" />
				</div>
				{model.isSkipped && model.subscriptionStatus === "ACTIVE" && (
					<Button className="contents">
						<div className="h-[30px] rounded-[17px]  flex justify-center items-center text-center text-[16px] leading-[20px] font-hagerman text-blue bg-blue11/10">
							You&apos;ve opted to skip the Jan 1 2025 Drop
						</div>

						<OptBackInDialog model={model} />
					</Button>
				)}
				{model.subscriptionStatus !== "ACTIVE" && (
					<>
						<div className="h-[30px] rounded-[17px]  flex justify-center items-center text-center text-[16px] leading-[20px] font-hagerman bg-[#FF3B301A] text-red3">
							You&apos;ve cancelled this plan
						</div>
						<ReactivatePlanDialog model={model} />
					</>
				)}
			</div>
		</ConditionalLink>
	);
}
