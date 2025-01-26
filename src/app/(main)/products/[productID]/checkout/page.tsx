"use client";

import { useEffect, useState } from "react";

import AvailablePayment from "@/components/AvailablePayment";
import BillingAddress from "@/components/BillingAddress";
import DeliveryAddress from "@/components/DeliveryAddress";
import PaymentDetails from "@/components/PaymentDetails";
import Steps from "@/components/Steps";
import CreditCards from "@/components/products/CreditCards";
import ConfirmJoining from "@/components/products/checkout/ConfirmJoining";
import CreateAccount from "@/components/products/checkout/CreateAccount";
import Delivery from "@/components/products/checkout/Delivery";
import OrderSummary from "@/components/products/checkout/OrderSummary";
import { useUser } from "@/contexts/UserContext";
import { productService } from "@/services/productService";
import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import { Separator } from "@radix-ui/react-separator";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
export default function Checkout({
	params,
}: Readonly<{ params: Promise<{ productID: string }> }>) {
	const router = useRouter();
	const [product, setProduct] = useState<ISingleProductModel>();
	const [step, setStep] = useState<number>(3);
	const steps = ["Create an Account", "Delivery Address", "Payment Details"];

	const context = useUser();

	useEffect(() => {
		const fetchProductId = async () => {
			const { productID } = await params;
			const response = await productService.product(productID);
			setProduct(response);
		};
		fetchProductId();
	}, [params]);

	useEffect(() => {
		if (context?.user) {
			if (context?.user.isVerified) {
				setStep(3);
			} else {
				router.push("/auth/email-verification");
			}
		}
	}, [context?.user, router]);

	return (
		<div className="grid md:grid-cols-2 gap-[16px] px-[16px] mx-[-16px] container-width">
			<div className="flex flex-col gap-[40px] md:mb-[40px]">
				<Steps activeStep={step} steps={steps} />

				{step === 1 && (
					<CreateAccount step={step} updateStepAction={setStep} params={params}>
						{product?.isComming && (
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
										Lead time is 6 weeks from when we charge you - but you get
										10% off your subscription forever
									</p>
								</div>
							</div>
						)}
					</CreateAccount>
				)}
				{step === 2 && (
					<DeliveryAddress step={step} updateStepAction={setStep}>
						{product?.isComming && (
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
										Lead time is 6 weeks from when we charge you - but you get
										10% off your subscription forever
									</p>
								</div>
							</div>
						)}
					</DeliveryAddress>
				)}
				{step === 3 && (
					<PaymentDetails
						step={step}
						updateStepAction={setStep}
						isComming={product?.isComming || false}
					>
						{product?.isComming && (
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
										Lead time is 6 weeks from when we charge you - but you get
										10% off your subscription forever
									</p>
								</div>
							</div>
						)}
						<BillingAddress />

						{product?.isComming && (
							<div className="text-blue text-[16px] leading-[19px] font-helvetica flex justify-center text-center bg-blue10 rounded-[100px] py-[4px] px-[10px] w-full">
								Register now. Only be charged when we reach 50 pre-orders.{" "}
							</div>
						)}

						<Separator className="bg-grey13 h-[1px]" />

						<Elements stripe={stripePromise}>
							<CreditCards />
						</Elements>
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
