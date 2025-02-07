"use client";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { useUser } from "@/contexts/UserContext";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { useState } from "react";

export default function ReactivatePlan() {
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
				name: "Alignment Capsules",
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
	return (
		<div className="grid gap-[16px] py-[24px] md:grid-cols-[600px_600px] md:justify-center">
			<div>
				<ConfirmDialog
					isDialogOpen={isDialogOpen}
					onOpenChange={onOpenChange}
					title="Your plan has be re-activated"
					description={`A confirmation email has been sent to ${context?.user?.email}`}
				/>
			</div>
			<SummaryProduct totalPriceAction={() => {}} model={summaryProductModel} />
		</div>
	);
}
