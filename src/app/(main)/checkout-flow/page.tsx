"use client";

import Image from "next/image";
import { useState } from "react";
import ConfirmJoining from "./components/ConfirmJoining";
import CreateAccount from "./components/CreateAccount";
import Delivery from "./components/Delivery";
import DeliveryAddress from "./components/DeliveryAddress";
import OrderSummary from "./components/OrderSummary";
import PaymentDetails from "./components/PaymentDetails";
import Steps from "./components/Steps";

export default function Checkout() {
	const [step, setStep] = useState<number>(1);

	return (
		<div className="grid md:grid-cols-2 gap-[16px] px-[16px] mx-[-16px] container-width">
			<div className="flex flex-col gap-[40px] my-[32px]">
				<Steps activeStep={step} />

				{step === 1 && <CreateAccount step={step} updateStepAction={setStep} />}
				{step === 2 && (
					<DeliveryAddress step={step} updateStepAction={setStep} />
				)}
				{step === 3 && (
					<PaymentDetails step={step} updateStepAction={setStep} />
				)}
				{step === 4 && <ConfirmJoining />}
			</div>

			<div className="mx-[-16px] md:mx-[0] my-[32px]">
				<OrderSummary activeStep={step} />
				{step === 4 && <Delivery />}
				{step < 4 && (
					<div>
						<div className="flex justify-center gap-[8px] items-center p-[24px]">
							<Image
								src="/images/icons/security-card-icon.svg"
								alt="security-card-icon"
								width={24}
								height={24}
							/>
							<p className=" text-blue">Secure Payment</p>
						</div>
						<div className="flex justify-center gap-[4px] items-center">
							<Image
								src="/images/master-card.svg"
								alt="master-card"
								width={40}
								height={28}
							/>
							<Image
								src="/images/visa-card.svg"
								alt="visa-card"
								width={40}
								height={28}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
