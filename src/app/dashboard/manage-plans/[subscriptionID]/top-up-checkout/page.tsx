"use client";

import { useEffect, useState } from "react";

import TopUpCapsuleHeading from "@/components/dashboard/manage-plans/TopUpCapsuleHeading";
import AvailablePayment from "@/components/shared/AvailablePayment";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import PaymentList from "@/components/shared/PaymentList";
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
import { useRouter } from "next/navigation";

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
	const router = useRouter();

	const [managePlan, setManagePlan] = useState<IManagePlanModel>();
	const [summary, setSummary] = useState<ISummaryProductModel>(
		{} as ISummaryProductModel,
	);

	const { remainsDaysToNextQuater, nextDeliveryText, currentQuarter } =
		getQuarterInfo();
	const nextQuater = currentQuarter + 1 > 4 ? 1 : currentQuarter + 1;

	useEffect(() => {
		const fetchParams = async () => {
			const { subscriptionID } = await params;
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
					delivery: nextDeliveryText,
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

			setTotalPrice(orders?.reduce((sum, item) => sum + (item.price || 0), 0));

			setSummary(model);
		};
		fetchParams();
	}, [params, nextDeliveryText, nextQuater, remainsDaysToNextQuater]);

	function setCapsulePerWeek(capules: string, week: string) {
		setCapsulesPerDay(+capules);
		setWeeks(+week);
		setStep(step + 1);
	}

	async function onOpenChange(val: boolean) {
		setIsDialogOpen(val);

		if (val) {
			await paymentService.topUpSubscription(
				weeks * 7 * capsulesPerDay,
				managePlan?.team?.id || "",
				context?.user?.stripeDefaultPaymentMethodId || "",
				context?.user?.id || "",
				managePlan?.team.basket[0].product.id || "",
				weeks * capsulesPerDay,
				capsulesPerDay,
				totalPrice,
			);
		} else {
			router.push("/dashboard/manage-plans/");
		}
	}

	return (
		<div className="grid md:grid-cols-2 gap-[26px] md:gap-[16px] max-w-[1280px] mx-auto md:py-[40px] bg-grey12 md:bg-transparent">
			<div className="flex flex-col gap-[37px]">
				<Steps activeStep={step} alignStart steps={steps} />
				{step === 1 && (
					<TopUpCapsuleHeading updateInfoAction={setCapsulePerWeek} />
				)}
				{step !== 1 && (
					<PaymentList
						successAction={() => onOpenChange(true)}
						totalPrice={totalPrice}
					/>
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
