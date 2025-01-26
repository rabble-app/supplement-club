"use client";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";

import ManagePlanCard from "@/components/dashboard/manage-plans/ManagePlanCard";
import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import { useEffect, useState } from "react";

export default function Plans() {
	const context = useUser();
	const [subscriptions, setSubscriptions] = useState<IManagePlanModel[]>([]);

	function reactivateSubscription(id: string): void {
		setSubscriptions((prev) => {
			const updated = [...prev];
			const idx = subscriptions.findIndex((s) => s.id === id);
			updated[idx].subscriptionStatus = "ACTIVE";
			return updated;
		});
	}

	function optBackInForNextDelivery(id: string): void {
		setSubscriptions((prev) => {
			const updated = [...prev];
			const idx = subscriptions.findIndex((s) => s.id === id);
			updated[idx].isSkipped = false;
			return updated;
		});
	}

	useEffect(() => {
		(async () => {
			const userId = "07ef1100-01eb-4938-be0f-afb431ec679f"; // context?.user?.id ||
			const response = await usersService.getSubscriptionPlans(userId);
			setSubscriptions(response);
			console.log(context?.user);
		})();
	}, [context?.user]);

	return (
		<div className="mx-auto max-w-[600px] py-[16px] md:py-[50px] grid gap-[20px]">
			{subscriptions.map((item) => (
				<ManagePlanCard
					model={item}
					reactivateSubscriptionAction={reactivateSubscription}
					optBackInForNextDeliveryAction={optBackInForNextDelivery}
					key={item.id}
				/>
			))}
		</div>
	);
}
