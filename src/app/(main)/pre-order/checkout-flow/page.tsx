"use client";

import { useState } from "react";

import AvailablePayment from "@/components/AvailablePayment";
import CreateAccount from "@/components/CreateAccount";
import Delivery from "@/components/Delivery";
import DeliveryAddress from "@/components/DeliveryAddress";
import Steps from "@/components/Steps";
import ConfirmJoining from "../components/ConfirmJoining";
import OrderSummary from "../components/OrderSummary";
import PaymentDetails from "../components/PaymentDetails";

export default function CheckoutFlow() {
	const [step, setStep] = useState<number>(2);
	const steps = ["Create an Account", "Delivery Address", "Payment Details"];
	return (
		<div className="grid md:grid-cols-2 gap-[16px] px-[16px] mx-[-16px] container-width">
			<div className="flex flex-col gap-[20px] md:gap-[40px] md:mb-[32px]">
				<Steps activeStep={step} steps={steps} />

				{step === 1 && (
					<CreateAccount step={step} updateStepAction={setStep}>
						<div className="grid gap-[16px]">
							<p className="text-[20px] leading-[24px] font-bold font-inconsolata">
								PRE-ORDER Now to become a Founding Member{" "}
							</p>
							<div className="grid gap-[8px]">
								<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
									Only get charged when we hit 50 pre-orders.
								</p>
								<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
									By becoming a founding member you get an extra 10% off the
									team price forever{" "}
								</p>
								<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
									Lead time is 6 weeks from when we charge you - but you get 10%
									off your subscription forever
								</p>
							</div>
						</div>
					</CreateAccount>
				)}
				{step === 2 && (
					<DeliveryAddress step={step} updateStepAction={setStep}>
						<div className="grid gap-[16px]">
							<p className="text-[20px] leading-[24px] font-bold font-inconsolata">
								PRE-ORDER Now to become a Founding Member{" "}
							</p>
							<div className="grid gap-[8px]">
								<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
									Only get charged when we hit 50 pre-orders.
								</p>
								<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
									By becoming a founding member you get an extra 10% off the
									team price forever
								</p>
								<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
									Lead time is 6 weeks from when we charge you - but you get 10%
									off your subscription forever
								</p>
							</div>
						</div>
					</DeliveryAddress>
				)}
				{step === 3 && (
					<PaymentDetails step={step} updateStepAction={setStep} />
				)}
				{step === 4 && <ConfirmJoining />}
			</div>

			<div className="mx-[-16px] md:mx-[0] mt-[32px] flex flex-col md:gap-[24px]">
				<OrderSummary activeStep={step} />
				{step === 4 && <Delivery />}
				{step < 4 && <AvailablePayment />}
			</div>
		</div>
	);
}
