"use client";

import { useEffect, useMemo, useState } from "react";

import PaymentDetails from "@/components/PaymentDetails";
import ConfirmJoining from "@/components/main/products/[productID]/checkout/ConfirmJoining";
import CreateAccount from "@/components/main/products/[productID]/checkout/CreateAccount";
import Delivery from "@/components/main/products/[productID]/checkout/Delivery";
import DeliveryAddress from "@/components/main/products/[productID]/checkout/DeliveryAddress";
import AvailablePayment from "@/components/shared/AvailablePayment";
import BillingAddress from "@/components/shared/BillingAddress";
import PaymentCards from "@/components/shared/PaymentCards";
import Steps from "@/components/shared/Steps";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { productService } from "@/services/productService";
import { teamsService } from "@/services/teamService";
import { useProductStore } from "@/stores/productStore";
import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import { getQuarterInfo } from "@/utils/utils";
import { useRouter } from "next/navigation";

const PreOrderMessage = () => {
	return (
		<div className="grid gap-[16px]">
			<p className="text-[20px] leading-[24px] font-bold font-inconsolata">
				PRE-ORDER Now to Become a Founding Member
			</p>
			<div className="grid gap-[8px]">
				<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
					Only get charged when we hit 50 pre-orders.
				</p>
				<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
					By becoming a founding member you get an extra 10% off the team price
					forever.
				</p>
				<p className="text-[14px] leading-[16px] font-helvetica text-grey6">
					Lead time is 6 weeks from when we charge you - but you get 10% off
					your subscription forever.
				</p>
			</div>
		</div>
	);
};

export default function Checkout({
	params,
}: Readonly<{ params: Promise<{ productID: string }> }>) {
	const router = useRouter();
	const days = 90;
	const context = useUser();
	const productStore = useProductStore();

	const [step, setStep] = useState<number>(1);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [userCards, setUserCards] = useState<IUserPaymentOptionModel[]>([]);
	const steps = ["Create an Account", "Delivery Address", "Payment Details"];

	const [capsulePerDay] = useState(productStore.capsulesPerDay || 2);
	const [product, setProduct] = useState<ISingleProductModel>();

	const { currentQuarter, year, endDate, remainsDaysToNextQuater } =
		getQuarterInfo();

	const nextDeliveryProductText = `Next Drop Delivered: ${endDate.toLocaleString("en", { month: "long" })} 1st ${year}`;
	const [nextQuater] = useState(
		currentQuarter + 1 > 4 ? 1 : currentQuarter + 1,
	);

	const capsulesPackage = useMemo(
		() => remainsDaysToNextQuater * capsulePerDay,
		[remainsDaysToNextQuater, capsulePerDay],
	);

	const [summary, setSummary] = useState<ISummaryProductModel>(
		calculateSummary(2),
	);

	useEffect(() => {
		const fetchUserPaymentOptions = async () => {
			const model = await paymentService.getUserPaymentOptions(
				context?.user?.stripeCustomerId || "",
			);
			setUserCards(model);
		};
		fetchUserPaymentOptions();
	}, [context?.user?.stripeCustomerId]);

	useEffect(() => {
		const fetchProductId = async () => {
			const { productID } = await params;
			const response = await productService.product(productID);
			setProduct(response);
		};
		fetchProductId();
	}, [params]);

	useEffect(() => {
		setSummary(
			calculateSummary(
				capsulePerDay,
				product?.name,
				product?.isComming,
				product?.teamName,
				product?.rrp,
				product?.quantityOfSubUnitPerOrder,
				product?.unitsOfMeasurePerSubUnit,
			),
		);
	}, [capsulePerDay, product]);

	function calculateSummary(
		capsulePerDay: number,
		name?: string,
		isComming?: boolean,
		teamName?: string,
		rrp?: number,
		quantityOfSubUnitPerOrder?: number,
		unitsOfMeasurePerSubUnit?: string,
	) {
		const orders = [];
		const subscriptions = [];

		if (!isComming) {
			orders.unshift({
				id: 1,
				alt: "",
				description: `${capsulesPackage} Capsules to see you to Q${nextQuater}`,
				name: "One time Alignment Package",
				delivery: "Delivered Tomorrow ",
				src: "/images/ubiquinol.svg",
				capsules: capsulesPackage,
			});

			subscriptions.push({
				id: 2,
				alt: "supplement mockup",
				description: `${capsulePerDay * days} Capsules Every 3 months`,
				name: "Quarterly Subscription",
				delivery: nextDeliveryProductText,
				src: "/images/supplement-mockup.svg",
				capsules: capsulePerDay * days,
			});
		} else {
			orders.push({
				id: 1,
				alt: "supplement mockup",
				description: `${capsulePerDay * days} Capsules Every 3 months`,
				name: "Quarterly Subscription",
				delivery: nextDeliveryProductText,
				src: "/images/supplement-mockup.svg",
				capsules: capsulePerDay * days,
			});
			orders.push({
				id: 2,
				alt: "supplement mockup",
				description: "Startup Package",
				name: "Glass Bottle Container",
				src: "/images/ubiquinol.svg",
				capsules: 0,
				rrp: 18,
				price: 0,
				isFree: true,
			});
		}

		return {
			title: "Order Summary",
			corporation: teamName,
			name: name,
			deliveryText: !isComming ? "NEXT DAY DELIVERY" : "",
			percentage: (capsulePerDay * days * 0.25) / Number(rrp),
			rrp: rrp,
			subscriptions: subscriptions,
			quantityOfSubUnitPerOrder: quantityOfSubUnitPerOrder,
			unitsOfMeasurePerSubUnit: unitsOfMeasurePerSubUnit,
			orders: orders,
		} as ISummaryProductModel;
	}

	useEffect(() => {
		if (context?.user) {
			if (context?.user.isVerified) {
				if (context?.user?.shipping) {
					setStep(3);
					return;
				}
				setStep(2);
			} else {
				router.push("/auth/email-verification");
			}
		}
	}, [context?.user, router]);

	async function successPayment() {
		if (!product?.isComming) {
			await paymentService.addPaymentIntent(totalPrice, "gbp", "", "");
			await paymentService.addCapturePayment(totalPrice, "gbp", "", "");
		}
		await teamsService.addTeamMember(
			context?.user?.id || "",
			product?.supplementTeamProducts?.team.id || "",
		);
		setStep(step + 1);
	}

	return (
		<div className="grid md:grid-cols-2 gap-[16px] px-[16px] mx-[-16px] container-width">
			<div className="flex flex-col gap-[40px] md:mb-[40px]">
				<Steps activeStep={step} steps={steps} />

				{step === 1 && (
					<CreateAccount step={step} updateStepAction={setStep} params={params}>
						{product?.isComming && <PreOrderMessage />}{" "}
					</CreateAccount>
				)}
				{step === 2 && (
					<DeliveryAddress step={step} updateStepAction={setStep}>
						{product?.isComming && <PreOrderMessage />}{" "}
					</DeliveryAddress>
				)}
				{step === 3 && (
					<PaymentDetails
						totalPrice={totalPrice}
						successAction={() => successPayment}
					>
						{product?.isComming && <PreOrderMessage />}
						<BillingAddress />
						{userCards.length > 0 && <PaymentCards />}
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
				<SummaryProduct
					model={summary}
					totalPriceAction={setTotalPrice}
					showTopLine={product?.isComming}
				/>
				{step === 4 && <Delivery />}
				{step < 4 && <AvailablePayment />}
			</div>
		</div>
	);
}
