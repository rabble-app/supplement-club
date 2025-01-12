"use client";

import { useState } from "react";

import AvailablePayment from "@/components/AvailablePayment";
import BillingAddress from "@/components/BillingAddress";
import CreateAccount from "@/components/CreateAccount";
import Delivery from "@/components/Delivery";
import DeliveryAddress from "@/components/DeliveryAddress";
import PaymentDetails from "@/components/PaymentDetails";
import Steps from "@/components/Steps";
import ConfirmJoining from "./components/ConfirmJoining";
import OrderSummary from "./components/OrderSummary";

export default function Checkout() {
	const [step, setStep] = useState<number>(1);
	const steps = ["Create an Account", "Delivery Address", "Payment Details"];

	return (
		<div className="grid md:grid-cols-2 gap-[16px] px-[16px] mx-[-16px] container-width">
			<div className="flex flex-col gap-[40px] md:mb-[40px]">
				<Steps activeStep={step} steps={steps} />

				{step === 1 && <CreateAccount step={step} updateStepAction={setStep} />}
				{step === 2 && (
					<DeliveryAddress step={step} updateStepAction={setStep} />
				)}
				{step === 3 && (
					<PaymentDetails step={step} updateStepAction={setStep}>
						<BillingAddress />
					</PaymentDetails>
				)}
				{step === 4 && <ConfirmJoining />}
			</div>

			<div className="mx-[-16px] md:mx-[0] mt-[32px]">
				<OrderSummary activeStep={step} />
				{step === 4 && <Delivery />}
				{step < 4 && <AvailablePayment />}
			</div>
		</div>
	);
}
