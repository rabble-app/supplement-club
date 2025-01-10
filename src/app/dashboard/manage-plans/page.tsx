import type IManagePlanModel from "@/utils/models/IManagePlanModel";

import ManagePlanCard from "@/components/dashboard/manage-plans/ManagePlanCard";

const subscriptions = [
	{
		id: 1,
		name: "CoQ10",
		percent: 65,
		price: 45,
		pricePerCapsule: 0.25,
		description: "2 Capsules per Day - 180 Capsules",
		isActive: true,
	},
	{
		id: 2,
		name: "CoQ10",
		percent: 65,
		price: 45,
		pricePerCapsule: 0.25,
		description: "2 Capsules per Day - 180 Capsules",
		isSkipped: true,
	},
	{
		id: 3,
		name: "CoQ10",
		percent: 65,
		price: 45,
		pricePerCapsule: 0.25,
		description: "2 Capsules per Day - 180 Capsules",
		isActive: false,
	},
] as IManagePlanModel[];

export default function Plans() {
	return (
		<div className="mx-auto max-w-[600px] py-[16px] md:py-[50px] grid gap-[20px]">
			{subscriptions.map((item) => (
				<ManagePlanCard key={item.id} {...item} />
			))}
		</div>
	);
}
