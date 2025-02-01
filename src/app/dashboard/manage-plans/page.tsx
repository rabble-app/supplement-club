"use client";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";

import ManagePlanCard from "@/components/dashboard/manage-plans/ManagePlanCard";
import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import { useEffect, useState } from "react";

export default function Plans() {
	const context = useUser();
	const [subscriptions, setSubscriptions] = useState<IManagePlanModel[]>([]);

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
				<ManagePlanCard model={item} key={item.id} />
			))}
		</div>
	);
}
