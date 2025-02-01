"use client";

import Image from "next/image";

import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SubscriptionPlan({
	confirmAction,
}: Readonly<{
	confirmAction: (val: number) => void;
}>) {
	const capsule = 1;
	const [changePlan, setChangePlan] = useState(false);
	const [initCapsule, setInitCapsule] = useState(capsule);

	function getBoxClasses(idx: number) {
		const isFirst = idx === 0;
		const isLast = idx === 3;
		const isSelected = idx + 1 === initCapsule;

		return [
			isFirst && "rounded-l-[4px]",
			isLast && "rounded-r-[4px] border-l-[0]",
			!isFirst && !isLast && "border-l-[0]",
			isSelected ? "bg-blue text-white border-none" : "text-grey31",
		]
			.filter(Boolean)
			.join(" ");
	}

	function confirmChangeCapsule(val: number) {
		setChangePlan(false);
		confirmAction(val);
	}

	return (
		<div className="py-[16px] px-[12px] bg-white shadow-card rounded-[12px] grid gap-[16px]">
			<div className="grid gap-[4px]">
				<p className="text-[16px] leading-[24px] font-[500] font-inconsolata text-grey4">
					KANEKA CORPRATION
				</p>
				<p className="text-[24px] leading-[28px] font-[400] font-hagerman">
					Coenzyme Q10 Ubiquinol Kaneka TM
				</p>
			</div>

			<div className="flex items-center gap-[8px]">
				<Image
					src="/images/icons/link-icon.svg"
					alt="security-card-icon"
					width={24}
					height={24}
				/>
				<div className="grid gap-[2px]">
					<p className="text-[12px] leading-[13px] font-helvetica text-grey4">
						Daily Capsule Quantity
					</p>
					<p className="text-[12px] leading-[13px] font-helvetica">
						{initCapsule === 1 && "1 Capsule per day is good for test"}
						{initCapsule !== 1 &&
							`${initCapsule} Capsules per day is good for test`}
					</p>
				</div>
			</div>

			<div className="px-[16px] py-[5px] grid grid-cols-4">
				{Array.from({ length: 4 }).map((_, idx) => (
					<Button
						key={`len-${idx + 1}`}
						onClick={() => changePlan && setInitCapsule(idx + 1)}
						className={`border-[1px] border-grey31 font-sf-pro h-[33px] flex justify-center items-center ${getBoxClasses(idx)}`}
					>
						{idx + 1}
					</Button>
				))}
			</div>
			{!changePlan && (
				<Button
					type="submit"
					onClick={() => setChangePlan(true)}
					className="bg-blue13 w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-blue rounded-[2px] h-[50px]"
				>
					Change My Plan
				</Button>
			)}

			{changePlan && (
				<Button
					type="submit"
					onClick={() => setChangePlan(false)}
					className="bg-grey27/[12%] w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-blue rounded-[2px] h-[40px]"
				>
					Cancel
				</Button>
			)}

			{changePlan && capsule !== initCapsule && (
				<ConfirmDialog
					onOpenChange={() => confirmChangeCapsule}
					title="Subscription Quantity updated"
					description={`You have changed your subscription quantity from ${capsule} capsule
							to ${initCapsule} capsules per day, the next delivery is on X
							date.`}
					topContent="Confirm New Subscription Quantity"
				/>
			)}
		</div>
	);
}
