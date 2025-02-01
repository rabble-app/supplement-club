"use client";

import { useEffect, useState } from "react";

import SubscriptionCancelDialog from "@/components/dashboard/subscription-managment/SubscriptionCancelDialog";
import SubscriptionCard from "@/components/dashboard/subscription-managment/SubscriptionCard";
import SubscriptionPlan from "@/components/dashboard/subscription-managment/SubscriptionPlan";
import SubscriptionSkipDialog from "@/components/dashboard/subscription-managment/SubscriptionSkipDialog";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { Button } from "@/components/ui/button";
import { paymentService } from "@/services/paymentService";
import { teamsService } from "@/services/teamService";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type IReferalSummaryModel from "@/utils/models/IReferalSummaryModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import { getQuarterDates, getQuarterInfo } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SubscriptionProps {
	subscriptionID: string;
}

export default function Subscription({
	params,
}: Readonly<{ params: Promise<SubscriptionProps> }>) {
	const [setCapsule] = useState<number>(1);
	const [subscriptionID, setSubscriptionID] = useState<string>();
	const { currentQuarter, daysToNextQuarter, year } = getQuarterInfo();
	const { startDate } = getQuarterDates(year, currentQuarter);
	const router = useRouter();
	const nextDeliveryText = `1 ${startDate.toLocaleString("en", { month: "short" })} ${year} - ${daysToNextQuarter} Days`;

	useEffect(() => {
		const fetchParams = async () => {
			const { subscriptionID } = await params;
			setSubscriptionID(subscriptionID);
		};
		fetchParams();
	}, [params]);

	const summaryProductModel = {
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
		referals: [
			{
				price: -5,
				count: 1,
			},
		] as IReferalSummaryModel[],
	} as ISummaryProductModel;

	async function confirmAction(capsule: number) {
		await paymentService.updateSubscription(subscriptionID || "", 5, capsule);
		setCapsule(capsule);
	}

	async function subscriptionCancel() {
		await teamsService.cancelSubscriptionPlan(subscriptionID);
		router.push("/dashboard/manage-plans/");
	}

	async function subscriptionSkipDialog() {
		await teamsService.skipNextDelivery(subscriptionID);
		router.push("/dashboard/manage-plans/");
	}

	return (
		<div className="mx-auto py-[30px] max-w-[600px]">
			<div className="grid gap-[16px]">
				<div className="text-[28px] leading-[28px] font-hagerman font-[400]">
					Plan settings
				</div>

				<SubscriptionCard
					title="Next Quarterly Drop"
					description={nextDeliveryText}
					imageSrc="/images/icons/calendar-blue-icon.svg"
					imageAlt="Calendar icon"
				/>

				<SubscriptionPlan confirmAction={confirmAction} />

				<SubscriptionCard
					title="Your Stock"
					description="You should have 148 Capsules to tie you over to the Jan 1st 2024 drop"
					imageSrc="/images/icons/truck-icon.svg"
					imageAlt="Truck icon"
				>
					<Button
						asChild
						className="bg-blue13 w-full text[16px] md:text-[17px] md:leading-[22px] font-inconsolata font-bold text-blue rounded-[2px] h-[50px]"
					>
						<Link
							href={`/dashboard/manage-plans/${subscriptionID}/top-up-checkout/`}
						>
							Order Top Up Capsules
						</Link>
					</Button>
				</SubscriptionCard>

				<SummaryProduct model={summaryProductModel}>
					<SubscriptionCancelDialog confirmAction={subscriptionCancel} />

					<SubscriptionSkipDialog confirmAction={subscriptionSkipDialog} />
				</SummaryProduct>
			</div>
		</div>
	);
}
