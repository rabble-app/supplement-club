"use client";

import { useState } from "react";

import PaymentDetails from "@/components/PaymentDetails";
import TopUpCapsuleHeading from "@/components/dashboard/manage-plans/TopUpCapsuleHeading";
import AvailablePayment from "@/components/shared/AvailablePayment";
import BillingAddress from "@/components/shared/BillingAddress";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import Steps from "@/components/shared/Steps";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { useUser } from "@/contexts/UserContext";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { Separator } from "@radix-ui/react-separator";

export default function TopUpCheckout() {
	const [step, setStep] = useState<number>(1);
	const context = useUser();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const steps = ["Top Up Capsules", "Payment Details"];

	const summaryProductModel = {
		title: "Top Up Order Summary",
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

	function updateStep(val: number) {
		setStep(val);
		// on success payment
		if (val === 3) {
			setIsDialogOpen(true);
		}
	}

	function onOpenChange(val: boolean) {
		setIsDialogOpen(val);
	}

	return (
		<div className="grid md:grid-cols-2 gap-[26px] md:gap-[16px] max-w-[1280px] mx-auto md:py-[40px] bg-grey12 md:bg-transparent">
			<div className="grid gap-[37px]">
				<Steps activeStep={step} alignStart steps={steps} />
				{step === 1 && (
					<TopUpCapsuleHeading step={step} updateStepAction={updateStep} />
				)}
				{step !== 1 && (
					<PaymentDetails
						totalPrice={totalPrice}
						successAction={() => updateStep(step + 1)}
					>
						<BillingAddress />

						<Separator className="bg-grey13" />
					</PaymentDetails>
				)}

				<ConfirmDialog
					isDialogOpen={isDialogOpen}
					onOpenChange={onOpenChange}
					title="Top Up Capsules Order Received"
					description={`A confirmation email has been sent to ${context?.user?.email}`}
				/>
			</div>

			<div className="grid gap-[73px]">
				<SummaryProduct
					totalPriceAction={setTotalPrice}
					model={summaryProductModel}
				/>

				<AvailablePayment />
			</div>
		</div>
	);
}
