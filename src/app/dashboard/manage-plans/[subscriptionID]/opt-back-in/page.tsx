"use client";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { useUser } from "@/contexts/UserContext";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import Image from "next/image";
import { useState } from "react";

export default function OptBackIn() {
	const [isDialogOpen, setIsDialogOpen] = useState(true);
	const context = useUser();

	const summaryProductModel = {
		title: "Order Summary",
		corporation: "KANEKA CORPRATION",
		name: "Coenzyme Q10 Ubiquinol Kaneka TM",
		deliveryText: "NEXT DAY DELIVERY",
		orders: [
			{
				alt: "supplement mockup",
				description: "86 Capsules to see you to Q1",
				capsules: 86,
				name: "One time Alignment Package	",
				delivery: "Delivered Tomorrow",
				src: "/images/supplement-mockup.svg",
				price: 23.2,
				pricePerCapsule: 0.25,
			},
		] as IOrderSummaryModel[],
	} as ISummaryProductModel;

	function onOpenChange(val: boolean) {
		setIsDialogOpen(val);
	}

	const bottomContent = (
		<div className="flex gap-[8px] items-center justify-center text-blue h-[60px] text-[20px] leading-[23px] font-bold">
			<div className="p-[13px] bg-blue6 rounded-[50px]">
				<Image
					src="/images/icons/delivery-blue-icon.svg"
					alt="Delivery icon"
					width={24}
					height={24}
				/>
			</div>
			Delivering 1st April, 2025
		</div>
	);

	return (
		<div className="grid gap-[16px] py-[24px] md:grid-cols-[600px_600px] md:justify-center">
			<div>
				<ConfirmDialog
					isDialogOpen={isDialogOpen}
					onOpenChange={onOpenChange}
					title="You've been successfully opted back for April 2025"
					description={`A confirmation email has been sent to ${context?.user?.email}`}
					bottomContent={bottomContent}
				/>
			</div>
			<SummaryProduct totalPriceAction={() => {}} model={summaryProductModel} />
		</div>
	);
}
