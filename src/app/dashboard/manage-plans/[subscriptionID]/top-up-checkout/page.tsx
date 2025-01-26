"use client";

import { useState } from "react";

import AvailablePayment from "@/components/AvailablePayment";
import BillingAddress from "@/components/BillingAddress";
import PaymentDetails from "@/components/PaymentDetails";
import Steps from "@/components/Steps";
import SuccessDialog from "@/components/dashboard/manage-plans/SuccessDialog";
import TopUpCapsuleHeading from "@/components/dashboard/manage-plans/TopUpCapsuleHeading";
import TopUpOrderSummary from "@/components/dashboard/manage-plans/TopUpOrderSummary";
import CreditCards from "@/components/products/CreditCards";
import { Separator } from "@radix-ui/react-separator";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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
					<PaymentDetails
						step={step}
						updateStepAction={setStep}
						isComming={false}
					>
						<BillingAddress />

						<Separator className="bg-grey13" />

						<Elements stripe={stripePromise}>
							<CreditCards />
						</Elements>
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
