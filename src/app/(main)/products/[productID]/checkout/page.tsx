"use client";

import { useEffect, useState } from "react";

import PaymentDetails from "@/components/PaymentDetails";
import ConfirmJoining from "@/components/main/products/[productID]/checkout/ConfirmJoining";
import CreateAccount from "@/components/main/products/[productID]/checkout/CreateAccount";
import Delivery from "@/components/main/products/[productID]/checkout/Delivery";
import DeliveryAddress from "@/components/main/products/[productID]/checkout/DeliveryAddress";
import AvailablePayment from "@/components/shared/AvailablePayment";
import BillingAddress from "@/components/shared/BillingAddress";
import Steps from "@/components/shared/Steps";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { useUser } from "@/contexts/UserContext";
import { productService } from "@/services/productService";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import type ISubscriptionSummaryModel from "@/utils/models/ISubscriptionSummaryModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { useRouter } from "next/navigation";

export default function Checkout({
	params,
}: Readonly<{ params: Promise<{ productID: string }> }>) {
	const router = useRouter();
	const [product, setProduct] = useState<ISingleProductModel>();
	const [step, setStep] = useState<number>(2);
	const steps = ["Create an Account", "Delivery Address", "Payment Details"];

	const summaryProductModel = {
		title: "Order Summary",
		corporation: "KANEKA CORPRATION",
		name: "Coenzyme Q10 Ubiquinol Kaneka TM",
		deliveryText: "NEXT DAY DELIVERY",
		orders: [
			{
				id: 1,
				alt: "",
				description: "$100 Capsules to see you to Q1",
				name: "One time Alignment Package",
				delivery: "Delivered Tomorrow ",
				src: "/images/ubiquinol.svg",
				capsules: 100,
				price: 200,
			},
			{
				id: 1,
				alt: "supplement mockup",
				description: "300 Capsules Every 3 months",
				name: "Quarterly Subscription",
				delivery: "text",
				src: "/images/supplement-mockup.svg",
				capsules: 300,
				price: 250,
			},
		] as IOrderSummaryModel[],
		subscriptions: [
			{
				id: 4,
				alt: "supplement mockup",
				description: "300 Capsules Every 3 months",
				name: "Quarterly Subscription",
				delivery: "text",
				src: "/images/supplement-mockup.svg",
				capsules: 300,
				price: 250,
			},
		] as ISubscriptionSummaryModel[],
	} as ISummaryProductModel;

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
					</PaymentDetails>
				)}
				{step === 4 && <ConfirmJoining />}
			</div>

			<div className="mx-[-16px] md:mx-[0] mt-[32px]">
				<SummaryProduct model={summaryProductModel} />
				{step === 4 && <Delivery />}
				{step < 4 && <AvailablePayment />}
			</div>
		</div>
	);
}
