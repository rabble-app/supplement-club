"use client";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import PaymentList from "@/components/shared/PaymentList";
import SummaryProduct from "@/components/shared/SummaryProduct";
import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type ISummaryProductModel from "@/utils/models/ISummaryProductModel";
import type { SubscriptionProps } from "@/utils/props/SubscriptionProps";
import { getQuarterInfo } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReactivatePlan({
	params,
}: Readonly<{ params: Promise<SubscriptionProps> }>) {
	const context = useUser();
	const router = useRouter();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
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
					rrp: item.product.rrp,
					price: capsules * 0.25,
					pricePerCapsule: 0.25,
					id: item.id,
				});
			}

			const model = {
				title: "Order Summary",
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

	function onOpenChange(val: boolean) {
		setIsDialogOpen(val);
		router.push(`/dashboard/manage-plans/${subscriptionId}`);
	}
	return (
		<div className="grid gap-[16px] py-[24px] md:grid-cols-[600px_600px] md:justify-center">
			<div>
				<ConfirmDialog
					isDialogOpen={isDialogOpen}
					onOpenChange={onOpenChange}
					title="Your plan has be re-activated"
					description={`A confirmation email has been sent to ${context?.user?.email}`}
				/>
				<PaymentList totalPrice={totalPrice} />
			</div>
			<SummaryProduct model={summary} />
		</div>
	);
}
