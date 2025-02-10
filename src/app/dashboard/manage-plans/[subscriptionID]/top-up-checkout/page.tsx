"use client";

import { useEffect, useState } from "react";

import PaymentDetails from "@/components/PaymentDetails";
import TopUpCapsuleHeading from "@/components/dashboard/manage-plans/TopUpCapsuleHeading";
import AvailablePayment from "@/components/shared/AvailablePayment";
import BillingAddress from "@/components/shared/BillingAddress";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import Steps from "@/components/shared/Steps";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { usersService } from "@/services/usersService";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import type { SubscriptionProps } from "@/utils/props/SubscriptionProps";
import { getQuarterInfo } from "@/utils/utils";
import { Separator } from "@radix-ui/react-separator";

export default function TopUpCheckout({
	params,
}: Readonly<{ params: Promise<SubscriptionProps> }>) {
	const [step, setStep] = useState<number>(1);
	const context = useUser();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [capsulesPerDay, setCapsulesPerDay] = useState<number>(1);
	const [weeks, setWeeks] = useState<number>(1);
	const steps = ["Top Up Capsules", "Payment Details"];

	const [subscriptionId, setSubscriptionId] = useState<string>();
	const [managePlan, setManagePlan] = useState<IManagePlanModel>();
	const [summary, setSummary] = useState<ISummaryProductModel>(
		{} as ISummaryProductModel,
	);

	const { remainsDaysToNextQuater, endDate, year, currentQuarter } =
		getQuarterInfo();
	const nextQuater = currentQuarter + 1 > 4 ? 1 : currentQuarter + 1;
	const nextDelivery = `${endDate.toLocaleString("en", { month: "long" })} 1st ${year}`;

	useEffect(() => {
		const fetchParams = async () => {
			const { subscriptionID } = await params;
			setSubscriptionId(subscriptionID);
			const response = await usersService.getSubscriptionPlan(subscriptionID);
			setManagePlan(response);

			const orders = [] as IOrderSummaryModel[];
			for (const item of response.team.basket) {
				const capsules = +item.capsulePerDay * remainsDaysToNextQuater;
				orders.push({
					alt: item.product.imageUrl,
					description:
						capsules > 0
							? `${+item.capsulePerDay * remainsDaysToNextQuater} Capsules to see you to Q${nextQuater}`
							: "",
					capsules: capsules,
					name: item.product.name,
					delivery: nextDelivery,
					src: item.product.imageUrl,
					price: capsules * 0.25,
					pricePerCapsule: 0.25,
					rrp: item.product.rrp,
					id: item.id,
				});
			}

			const model = {
				title: "Top Up Order Summary",
				corporation: "KANEKA CORPRATION",
				name: response.name,
				deliveryText: "NEXT DAY DELIVERY",
				orders: orders as IOrderSummaryModel[],
			} as ISummaryProductModel;

			setTotalPrice(orders?.reduce((sum, item) => sum + item.price, 0));

			setSummary(model);
		};
		fetchParams();
	}, [params, nextDelivery, nextQuater, remainsDaysToNextQuater]);

	function setCapsulePerWeek(capules: string, week: string) {
		setCapsulesPerDay(+capules);
		setWeeks(+week);
		setStep(step + 1);
	}

	async function onPayment(paymentIntentId: string) {
		await paymentService.topUpSubscription(
			totalPrice,
			managePlan?.team?.id || "",
			paymentIntentId,
			context?.user?.id || "",
			managePlan?.team.basket[0].product.id || "",
			0,
			capsulesPerDay,
			100,
		);

		setIsDialogOpen(true);
	}

	function onOpenChange(val: boolean) {
		setIsDialogOpen(val);
	}

	return (
		<div className="grid md:grid-cols-2 gap-[26px] md:gap-[16px] max-w-[1280px] mx-auto md:py-[40px] bg-grey12 md:bg-transparent">
			<div className="flex flex-col gap-[37px]">
				<Steps activeStep={step} alignStart steps={steps} />
				{step === 1 && (
					<TopUpCapsuleHeading updateInfoAction={setCapsulePerWeek} />
				)}
				{step !== 1 && (
					<PaymentDetails
						totalPrice={totalPrice}
						successAction={() => setStep(step + 1)}
					>
						<BillingAddress />

						<Separator className="bg-grey3" />
					</PaymentDetails>
				)}

				<ConfirmDialog
					isDialogOpen={isDialogOpen}
					onOpenChange={onOpenChange}
					title="Top Up Capsules Order Received"
					description={`A confirmation email has been sent to ${context?.user?.email}`}
				/>
			</div>

			<div className="grid gap-[73px]">
				<SummaryProduct model={summary} />

				<AvailablePayment />
			</div>
		</div>
	);
}
