"use client";

import ManagerCard from "@/components/dashboard/ManagerOptionCard";

import type IManagerOptionCardModel from "@/utils/models/IManagerOptionCardModel";

const yourAccount = [
	{
		id: 1,
		image: "/images/icons/calendar-icon.svg",
		imageAlt: "Calendar icon",
		link: "/dashboard/manage-plans/",
		title: "Manage Subscriptions",
	},
	{
		id: 2,
		image: "/images/icons/clock-icon.svg",
		imageAlt: "Clock icon",
		link: "/dashboard/view-past-orders/",
		title: "View Past Orders",
	},
	{
		id: 3,
		image: "/images/icons/user-profile-icon.svg",
		imageAlt: "User profile icon",
		link: "/dashboard/account",
		title: "Manage Account",
	},
] as IManagerOptionCardModel[];

const otherActions = [
	{
		id: 1,
		image: "/images/icons/discount-icon.svg",
		imageAlt: "Discount icon",
		link: "/dashboard/referral/",
		title: "Refer a Friend & You BOTH Save",
	},
	{
		id: 2,
		image: "/images/icons/cart-icon.svg",
		imageAlt: "Cart icon",
		link: "/dashboard/shop-supplement-products/",
		title: "Shop Supplement Products",
	},
] as IManagerOptionCardModel[];

import UpcomingDeliveryCard from "@/components/dashboard/UpcomingDeliveryCard";
import { useUser } from "@/contexts/UserContext";
import type IUpcomingDeliveryModel from "@/utils/models/api/IUpcomingDeliveryModel";
import { useEffect, useState } from "react";

import { usersService } from "@/services/usersService";
export default function ManagerPage() {
	const context = useUser();
	const [welcomeMessage, setWelcomeMessage] = useState("Welcome");
	const [upcomingDeliveries, setUpcomingDeliveries] = useState<
		IUpcomingDeliveryModel[]
	>([]);

	useEffect(() => {
		const fetchUpcomingDeliveries = async () => {
			const response = await usersService.getUpcomingDeliveries(
				context?.user?.id ?? "",
			);
			setUpcomingDeliveries(response);

			if (context?.user?.firstName && context?.user?.lastName) {
				setWelcomeMessage(
					`Welcome Back ${context?.user?.firstName} ${context?.user?.lastName?.slice(0, 1)}.`,
				);
			}
		};
		fetchUpcomingDeliveries();
	}, [context?.user]);
	return (
		<div>
			<div className="grid gap-[32px] black max-w-[600px] mx-auto py-[46px]">
				<h1 className="text-[24px] leading-[28px] font-bold font-hagerman">
					{welcomeMessage}
					👋🏻
				</h1>
				{upcomingDeliveries?.length > 0 && (
					<div className="grid gap-[16px]">
						<p className="text-[18px] leading-[21px] font-bold font-inconsolata">
							Upcoming Deliveries
						</p>
						{upcomingDeliveries?.map((model: IUpcomingDeliveryModel) => (
							<UpcomingDeliveryCard key={model.id} model={model} />
						))}
					</div>
				)}

				<div className="grid gap-[16px]">
					<p className="text-[18px] leading-[21px] font-bold font-inconsolata">
						Your Account
					</p>

					{yourAccount?.map((item) => (
						<ManagerCard key={item.id} {...item} />
					))}
				</div>

				<div className="grid gap-[16px]">
					<p className="text-[18px] leading-[21px] font-bold font-inconsolata">
						Other Actions
					</p>

					{otherActions?.map((item) => (
						<ManagerCard key={item.id} {...item} />
					))}
				</div>
			</div>
		</div>
	);
}
