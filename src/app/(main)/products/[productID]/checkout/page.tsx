"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { useUser } from "@/contexts/UserContext";
import { productService } from "@/services/productService";
import { useProductStore } from "@/stores/productStore";
import { getQuarterInfo } from "@/utils/utils";

import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";

import ConfirmJoining from "@/components/main/products/[productID]/checkout/ConfirmJoining";
import CreateAccount from "@/components/main/products/[productID]/checkout/CreateAccount";
import Delivery from "@/components/main/products/[productID]/checkout/Delivery";
import DeliveryAddress from "@/components/main/products/[productID]/checkout/DeliveryAddress";
import AvailablePayment from "@/components/shared/AvailablePayment";
import PaymentList from "@/components/shared/PaymentList";
import Spinner from "@/components/shared/Spinner";
import Steps from "@/components/shared/Steps";
import SummaryProduct from "@/components/shared/SummaryProduct";

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
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const days = 90;
	const context = useUser();
	const productStore = useProductStore();

	const [step, setStep] = useState<number>(1);
	const [productId, setProductId] = useState<string>("");
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const steps = ["Create an Account", "Delivery Address", "Payment Details"];

	const [capsulePerDay] = useState(productStore.capsulesPerDay ?? 2);
	const [product, setProduct] = useState<ISingleProductModel>();
	const [summary, setSummary] = useState<ISummaryProductModel>(
		{} as ISummaryProductModel,
	);

	const { year, endDate, remainsDaysToNextQuater } = getQuarterInfo();

	const nextDeliveryProductText = `Next Drop Delivered: ${endDate.toLocaleString("en", { month: "long" })} 1st ${year}`;

	const capsulesPackage = useMemo(
		() => remainsDaysToNextQuater * capsulePerDay,
		[remainsDaysToNextQuater, capsulePerDay],
	);

	useEffect(() => {
		const fetchProductId = async () => {
			const { productID } = await params;
			setProductId(productID);
			const response = await productService.product(productID);
			setProduct(response);

			const orders = [];
			const subscriptions = [];
			const membership = [
				{
					id: "12",
					alt: "supplement mockup",
					description: "Free for your first 2 drops",
					name: "Membership Subscription",
					delivery: `${endDate.toLocaleString("en", { month: "long" })} 1st ${year}`,
					src: "/images/membership-card.svg",
					capsules: 0,
					price: 0,
					imageBorder: true,
				},
			];

			if (response.isComming) {
				orders.push({
					price: 0, // Ensure price is included
					id: "1",
					alt: "supplement mockup",
					description: `${capsulePerDay * days} Capsules Every 3 months`,
					name: "Quarterly Subscription",
					delivery: nextDeliveryProductText,
					src: "/images/supplement-mockup.svg",
					capsules: capsulePerDay * days,
					count: 1,
				});
				orders.push({
					id: "2",
					alt: "supplement mockup",
					description: "Startup Package",
					name: "Glass Bottle Container",
					src: "/images/ubiquinol.svg",
					capsules: 0,
					rrp: 18,
					price: 0,
					isFree: true,
				});
			} else {
				orders.unshift({
					id: "1",
					alt: "",
					description: `${capsulesPackage} Capsules to align you with next drop`,
					name: "Alignment Capsules",
					src: "/images/supplement-mockup.svg",
					delivery: "Delivered Tomorrow",
					capsules: capsulesPackage,
					price: 0,
					quantity: 1,
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
			}

			const ordersSum = orders?.reduce(
				(sum, item) => sum + item.capsules * 0.25,
				0,
			);
			const totalSumOfSubs = subscriptions?.reduce(
				(sum, item) => sum + item.capsules * 0.25,
				0,
			);
			setTotalPrice(ordersSum + totalSumOfSubs);

			setSummary({
				referals: [],
				id: 0,
				title: "Order Summary",
				corporation: response?.teamName,
				name: response.name,
				deliveryText:
					!response.isComming && step < 4 ? "NEXT DAY DELIVERY" : "",
				percentage: (capsulePerDay * days * 0.25) / Number(response.rrp),
				rrp: response.rrp,
				subscriptions: subscriptions,
				membership: membership as [],
				quantityOfSubUnitPerOrder: response?.quantityOfSubUnitPerOrder,
				unitsOfMeasurePerSubUnit: response?.unitsOfMeasurePerSubUnit,
				orders: orders,
			});
			setLoading(false);
		};
		fetchProductId();
	}, [
		params,
		capsulePerDay,
		capsulesPackage,
		nextDeliveryProductText,
		step,
		endDate,
		year,
	]);

	useEffect(() => {
		if (context?.user) {
			if (context.user.isVerified) {
				if (context?.user?.shipping) {
					setStep(3);
					return;
				}
				setStep(2);
			} else {
				router.push(
					`/auth/email-verify?redirect=/products/${productId}/checkout`,
				);
			}
		}
	}, [context?.user, router, productId]);

	async function successAction() {
		const currentStep = step + 1;
		setStep(currentStep);
	}

	if (loading) return <Spinner />;

	return (
		<div className="grid md:grid-cols-2 gap-[16px] px-[16px] mx-[-16px] container-width">
			<div className="flex flex-col gap-[40px] md:mb-[40px]">
				<Steps activeStep={step} steps={steps} />

				{step === 1 && (
					<CreateAccount params={params}>
						{product?.isComming && <PreOrderMessage />}{" "}
					</CreateAccount>
				)}
				{step === 2 && (
					<DeliveryAddress step={step} updateStepAction={setStep}>
						{product?.isComming && <PreOrderMessage />}{" "}
					</DeliveryAddress>
				)}
				{step === 3 && (
					<PaymentList
						productId={product?.id ?? ""}
						topupQuantity={capsulesPackage}
						teamId={product?.supplementTeamProducts?.team.id ?? ""}
						isComming={product?.isComming}
						totalPrice={totalPrice}
						capsulePerDay={capsulePerDay}
						successAction={successAction}
					/>
				)}
				{step === 4 && <ConfirmJoining email={context?.user?.email} />}
			</div>

			<div className="mx-[-16px] md:mx-[0] mt-[32px]">
				<SummaryProduct model={summary} showTopLine={product?.isComming} />
				{step === 4 && <Delivery />}
				{step < 4 && <AvailablePayment />}
			</div>
		</div>
	);
}
