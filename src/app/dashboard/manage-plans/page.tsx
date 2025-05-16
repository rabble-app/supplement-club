"use client";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";

import ManagePlanCard from "@/components/dashboard/manage-plans/ManagePlanCard";
import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import { useEffect, useState } from "react";
import Spinner from "@/components/shared/Spinner";

export default function Plans() {
	const context = useUser();
	const [loading, setLoading] = useState(true);

	const [subscriptions, setSubscriptions] = useState<IManagePlanModel[]>([]);

	useEffect(() => {
		(async () => {
			const response = await usersService.getSubscriptionPlans(
				context?.user?.id ?? "",
			);
			setSubscriptions(response);
			setLoading(false);
		})();
	}, [context?.user]);

	if (loading) return <Spinner />;

	return (
		<div className="mx-auto max-w-[600px] py-[16px] md:py-[50px] grid gap-[20px]">
			{subscriptions.map((item) => (
				<ManagePlanCard model={item} key={item.id} />
			))}
		</div>
	);
}
