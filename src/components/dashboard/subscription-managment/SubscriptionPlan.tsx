"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { paymentService } from "@/services/paymentService";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import { getQuarterInfo } from "@/utils/utils";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@reach/visually-hidden";
import { useEffect, useState } from "react";

export default function SubscriptionPlan({
	managePlan,
}: Readonly<{
	managePlan?: IManagePlanModel;
}>) {
	const [changePlan, setChangePlan] = useState(false);
	const [initCapsule, setInitCapsule] = useState(1);
	const [isOpen, setIsOpen] = useState(false);
	const { nextEditableDrop } = getQuarterInfo();

	useEffect(() => {
		if (managePlan?.team?.basket[0]?.capsulePerDay)
			setInitCapsule(Number(managePlan?.team?.basket[0]?.capsulePerDay));
	}, [managePlan]);

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

	async function onOpenChange(val: boolean) {
		setChangePlan(val);
		if (val) {
			await paymentService.updateSubscription(
				managePlan?.id ?? "",
				5,
				initCapsule,
			);
		}
		setIsOpen(val);
	}

	return (
		<div className="py-[16px] px-[12px] bg-white shadow-card rounded-[12px] grid gap-[16px]">
			<div className="grid gap-[4px]">
				<p className="text-[16px] leading-[24px] font-[500] font-inconsolata text-grey4">
					KANEKA CORPRATION
				</p>
				<p className="text-[24px] leading-[28px] font-[400] font-hagerman">
					{managePlan?.name}
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
						className={`border-[1px] border-grey31 font-helvetica h-[33px] flex justify-center items-center ${getBoxClasses(idx)}`}
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

			{changePlan && (
				<Dialog open={isOpen} onOpenChange={onOpenChange}>
					<DialogTrigger asChild onClick={() => onOpenChange}>
						<Button className="bg-blue w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-white rounded-[2px] h-[46px]">
							Confirm New Subscription Quantity
						</Button>
					</DialogTrigger>
					<DialogPortal>
						<DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]" />
						<DialogContent className="w-[calc(100%-20px)]  border rounded max-w-[600px] gap-[16px] fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white z-[201] p-[24px]">
							<DialogClose className="absolute right-[16px] top-[16px]">
								<div className="border-[1px] border-grey32 w-[38px] h-[38px] rounded-[50%] flex justify-center">
									<Image
										src="/images/icons/close-black-icon.svg"
										alt="Close icon"
										width={16}
										height={16}
									/>
								</div>
							</DialogClose>

							<VisuallyHidden>
								<DialogTitle>Your hidden title</DialogTitle>
							</VisuallyHidden>

							<VisuallyHidden>
								<DialogDescription />
							</VisuallyHidden>

							<div className="grid gap-[12px] pt-[20px]">
								<div className="w-[87px] h-[87px] rounded-[50%] mx-auto flex items-center justify-center bg-blue text-white">
									<Image
										src="/images/icons/check-white-icon.svg"
										alt="Check icon"
										width={100}
										height={100}
									/>
								</div>

								<div className="grid gap-[16px]">
									<p className="text-[24px] leading-[120%] font-hagerman uppercase text-center font-[400]">
										Subscription Quantity updated
									</p>
									<p className="text-[20px] leading-[24px] font-helvetica text-grey4 text-center w-full font-[400]">
										You have changed your subscription quantity from{" "}
										{managePlan?.team?.basket[0]?.capsulePerDay} capsules to{" "}
										{initCapsule} capsule per day. This update will apply from{" "}
										{nextEditableDrop} onwards.
									</p>
								</div>
							</div>
						</DialogContent>
					</DialogPortal>
				</Dialog>
			)}
		</div>
	);
}
