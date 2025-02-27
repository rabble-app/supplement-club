"use client";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { useEffect, useState } from "react";
import OrderSummaryCard from "./OrderSummaryCard";

export default function SummaryProduct({
	model,
	className,
	children,
	showOnlyTotal,
	showTopLine,
}: Readonly<{
	model: ISummaryProductModel;
	className?: string;
	showOnlyTotal?: boolean;
	children?: React.ReactNode;
	showTopLine?: boolean;
}>) {
	const [totalCount, setTotalCount] = useState(0);
	const [totalCapsules, setTotalCapsules] = useState(0);
	const [totalRrp, setTotalRrp] = useState(0);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		const totalSum = model?.orders?.reduce(
			(sum, item) => sum + item.capsules * 0.25,
			0,
		);

		const totalRRP =
			Math.round(
				model?.orders?.reduce(
					(sum, item) => sum + (item?.rrp ?? 0),
					model.rrp ?? 0,
				),
			) ?? 0;
		setTotalRrp(totalRRP);

		let percentage = model?.percentage ?? 0;
		if (totalSum > 0 && +totalRRP > 0) {
			percentage = totalSum / Number(totalRRP);
		}
		setPercentage(percentage);

		const totalSumOfSubs =
			model?.subscriptions?.reduce(
				(sum, item) => sum + item.capsules * 0.25,
				0,
			) ?? 0;

		setTotalCount(totalSum + totalSumOfSubs);

		const totalSubsCapsules =
			model?.subscriptions?.reduce((sum, item) => sum + item.capsules, 0) ?? 0;

		const ordersSubsCapsules = model?.orders?.reduce(
			(sum, item) => sum + item.capsules,
			0,
		);
		setTotalCapsules(totalSubsCapsules + ordersSubsCapsules);
	}, [model]);
	return (
		<div
			key={model?.id}
			className={`grid gap-[24px] py-[16px] md:py-[24px] bg-grey12  p-[24px] ${className}`}
		>
			{!showOnlyTotal && (
				<>
					{model?.title && (
						<h1 className="text-[24px] leading-[27px] font-hagerman text-blue mb-[8px]">
							{model.title}
						</h1>
					)}

					{model?.corporation && model.name && (
						<div className="grid gap-[8px]">
							<p className="text-[20px] leading-[24px] md:font-[500] font-inconsolata md:text-grey4">
								{model.corporation}
							</p>
							<div className="text-[24px] md:text-[40px] leading-[28px] md:leading-[48px] font-hagerman flex items-center gap-[5px]">
								{model.name}
								<Image
									src="/images/TM-black.svg"
									alt="TM corporation"
									width={24}
									height={24}
								/>
							</div>
							{model.quantityOfSubUnitPerOrder &&
								model.unitsOfMeasurePerSubUnit && (
									<div className="flex items-center gap-[8px]">
										<Image
											src="/images/icons/link-icon.svg"
											alt="security-card-icon"
											width={24}
											height={24}
										/>

										<p className="text-[14px] leading-[16px] text-grey6">
											{model.quantityOfSubUnitPerOrder}{" "}
											{model.unitsOfMeasurePerSubUnit}
										</p>
									</div>
								)}
						</div>
					)}

					{model?.deliveryText && (
						<p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
							{model.deliveryText}
						</p>
					)}

					{showTopLine && <Separator className="bg-grey3 h-[1px]" />}

					{model?.orders?.map((order) => (
						<OrderSummaryCard key={order.id} model={order} />
					))}

					{model?.referals?.length > 0 && (
						<Separator className="bg-grey3 h-[1px]" />
					)}

					{model?.referals?.map((referal, idx) => (
						<div
							key={`${idx + 1}`}
							className="flex justify-between items-center"
						>
							<div className="grid gap-[8px]">
								<p className="text-[20px] leading-[20px] font-[600] font-inconsolata">
									Succesful Referal x {referal.count}
								</p>
								<p className="text-[14px] leading-[14px] font-[400] font-inconsolata text-grey4">
									This Quarter
								</p>
							</div>
							<div className="text-[20px] leading-[20px] font-bold font-inconsolata">
								£{referal.price.toFixed(2)}
							</div>
						</div>
					))}

					{model?.subscriptions?.length > 0 && (
						<Separator className="bg-grey3 h-[1px]" />
					)}

					{model?.subscriptions?.length > 0 && (
						<p className="text-[16px] leading-[18px] md:leading-[16px] font-[600] font-inconsolata">
							Quarterly Subscription
						</p>
					)}

					{model?.subscriptions?.map((item) => (
						<OrderSummaryCard key={item.id} model={item} />
					))}

					<Separator className="bg-grey3 h-[1px]" />
				</>
			)}

			<div>
				<div className="grid gap-[7px] md:gap-0 grid-cols-[84px_1fr]">
					<div>
						<p className="text-[32px] leading-[33px] font-inconsolata font-bold text-black">
							Total
						</p>
						<p className="text-[14px] leading-[15px] text-grey4 font-inconsolata">
							{totalCapsules} Capsules
						</p>
					</div>

					<div className="grid gap-[7px] text-right">
						<div className="gap-[2px] text-[32px] font-inconsolata font-bold flex justify-end items-center">
							£{totalCount?.toFixed(2)}{" "}
							<span className="text-[12px] my-[auto] font-inconsolata font-bold text-grey1">
								(£0.25/capsule)
							</span>
						</div>
						<div className="text-[24px] leading-[25px] font-inconsolata font-[400] text-grey4 md:text-end">
							RRP{" "}
							<span className="text-[24px] leading-[25px] font-inconsolata line-through font-bold">
								£{totalRrp}
							</span>{" "}
							<span className="text-[24px] leading-[25px] font-inconsolata font-bold text-blue">
								{percentage?.toFixed(2)}% OFF
							</span>
						</div>
					</div>
				</div>

				<div className="grid gap-[10px]">{children}</div>
			</div>
		</div>
	);
}
