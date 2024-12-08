"use client";

import { useState } from "react";

import AvailablePayment from "@/components/AvailablePayment";
import CreateAccount from "@/components/CreateAccount";
import Delivery from "@/components/Delivery";
import DeliveryAddress from "@/components/DeliveryAddress";
import PaymentDetails from "@/components/PaymentDetails";
import Steps from "@/components/Steps";
import { Checkbox } from "@/components/ui/checkbox";
import ConfirmJoining from "../components/ConfirmJoining";
import OrderSummary from "../components/OrderSummary";

export default function CheckoutFlow() {
	const [step, setStep] = useState<number>(1);
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
					<PaymentDetails step={step} updateStepAction={setStep}>
						<div className="grid gap-[16px]">
							<p className="text-[20px] leading-[24px] font-bold font-inconsolata">
								PRE-ORDER Now to Become a Founding Member
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
						<p className="text-[24px] leading-[27px] font-bold uppercase font-hagerman">
							Billing Address
						</p>

						<div className="flex items-center gap-[8px]">
							<Checkbox id="delivery" />
							<label
								htmlFor="delivery"
								className="text-[16px] leading-[19px] text-black5 cursor-pointer font-helvetica"
							>
								Same as delivery address
							</label>
						</div>

						<div className="text-blue text-[16px] leading-[19px] font-helvetica flex justify-center text-center bg-blue10 rounded-[100px] py-[4px] px-[10px] w-full">
							Register now. Only be charged when we reach 50 pre-orders.{" "}
						</div>
					</PaymentDetails>
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
