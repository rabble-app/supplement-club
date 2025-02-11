"use client";

import { useEffect, useState } from "react";

import SubscriptionCancelDialog from "@/components/dashboard/subscription-managment/SubscriptionCancelDialog";
import SubscriptionCard from "@/components/dashboard/subscription-managment/SubscriptionCard";
import SubscriptionPlan from "@/components/dashboard/subscription-managment/SubscriptionPlan";
import SubscriptionSkipDialog from "@/components/dashboard/subscription-managment/SubscriptionSkipDialog";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { Button } from "@/components/ui/button";
import { teamsService } from "@/services/teamService";
import { usersService } from "@/services/usersService";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import type { SubscriptionProps } from "@/utils/props/SubscriptionProps";
import { getQuarterInfo } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Subscription({
	params,
}: Readonly<{ params: Promise<SubscriptionProps> }>) {
	const [subscriptionID, setSubscriptionID] = useState<string>();
	const [totalCapsule, setTotalCapsule] = useState<number>(0);
	const [managePlan, setManagePlan] = useState<IManagePlanModel>();
	const [summary, setSummary] = useState<ISummaryProductModel>(
		{} as ISummaryProductModel,
	);
	const router = useRouter();
	const {
		endDate,
		year,
		daysToNextQuarter,
		remainsDaysToNextQuater,
		currentQuarter,
	} = getQuarterInfo();
	const nextQuater = currentQuarter + 1 > 4 ? 1 : currentQuarter + 1;
	const nextDelivery = `1 ${endDate.toLocaleString("en", { month: "short" })} ${year} - ${daysToNextQuarter} Days`;

	useEffect(() => {
		const fetchParams = async () => {
			const { subscriptionID } = await params;
			setSubscriptionID(subscriptionID);
			const response = await usersService.getSubscriptionPlan(subscriptionID);
			setManagePlan(response);

			const orders = [] as IOrderSummaryModel[];
			let caps = 0;
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
					rrp: item.product.rrp,
					pricePerCapsule: 0.25,
					id: item.id,
				});
				caps += capsules;
			}

			setTotalCapsule(caps);

			const model = {
				orders: orders,
			} as ISummaryProductModel;

			setSummary(model);
		};
		fetchParams();
	}, [params, nextDelivery, nextQuater, remainsDaysToNextQuater]);

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
					description={nextDelivery}
					imageSrc="/images/icons/calendar-blue-icon.svg"
					imageAlt="Calendar icon"
				/>

				<SubscriptionPlan managePlan={managePlan} />

				<SubscriptionCard
					title="Your Stock"
					description={`You should have ${totalCapsule} Capsules to tie you over to the ${endDate.toLocaleString("en", { month: "short" })} 1st ${year} drop`}
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

				<SummaryProduct model={summary}>
					<SubscriptionCancelDialog confirmAction={subscriptionCancel} />

					<SubscriptionSkipDialog confirmAction={subscriptionSkipDialog} />
				</SummaryProduct>
			</div>
		</div>
	);
}
