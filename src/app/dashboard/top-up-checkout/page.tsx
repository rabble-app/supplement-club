"use client";

import { useState } from "react";

import AvailablePayment from "@/components/AvailablePayment";
import BillingAddress from "@/components/BillingAddress";
import PaymentDetails from "@/components/PaymentDetails";
import Steps from "@/components/Steps";
import SuccessDialog from "@/components/dashboard/top-up-checkout/SuccessDialog";
import TopUpCapsuleHeading from "@/components/dashboard/top-up-checkout/TopUpCapsuleHeading";
import TopUpOrderSummary from "@/components/dashboard/top-up-checkout/TopUpOrderSummary";

export default function TopUpCheckout() {
	const [step, setStep] = useState<number>(1);
	const steps = ["Top Up Capsules", "Payment Details"];

	const [isDialogOpen, setIsDialogOpen] = useState(true);

	function onOpenChange(open: boolean) {
		console.log(open);
		setIsDialogOpen(false);
	}

	return (
		<div className="grid md:grid-cols-2 gap-[26px] md:gap-[16px] max-w-[1280px] mx-auto md:py-[40px] bg-grey12 md:bg-transparent">
			<div className="grid gap-[37px]">
				<Steps activeStep={step} alignStart steps={steps} />
				{step === 1 && (
					<TopUpCapsuleHeading step={step} updateStepAction={setStep} />
				)}
				{step !== 1 && (
					<PaymentDetails step={step} updateStepAction={setStep}>
						<BillingAddress />
					</PaymentDetails>
				)}
				{step === 3 && (
					<SuccessDialog
						isDialogOpen={isDialogOpen}
						onOpenChange={onOpenChange}
					/>
				)}
			</div>

			<div className="grid gap-[73px]">
				<TopUpOrderSummary />
				<AvailablePayment />
			</div>
		</div>
	);
}
