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
import UpcomingDeliverySlider from "@/components/dashboard/UpcomingDeliverySlider";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";

import { usersService } from "@/services/usersService";
import Spinner from "@/components/shared/Spinner";
import { IUpcomingDeliveryResponse } from "@/utils/models/api/response/IUpcomingDeliveryResponse";
import { uniqueId } from "lodash";

export default function ManagerPage() {
	const [loading, setLoading] = useState(true);
	const context = useUser();
	const [welcomeMessage, setWelcomeMessage] = useState("Welcome");
	const [upcomingDeliveries, setUpcomingDeliveries] = useState<
		IUpcomingDeliveryResponse[]
	>([]);
	const [isMobile, setIsMobile] = useState(false);

	// Mobile detection
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

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
			setLoading(false);
		};
		fetchUpcomingDeliveries();
	}, [context?.user]);

	if (loading) return <Spinner />;
	return (
		<div>
			<div className="grid gap-[32px] black max-w-[700px] mx-auto py-[46px]">
				<h1 className="text-[24px] leading-[28px] font-bold font-hagerman">
					{welcomeMessage}
					👋🏻
				</h1>
				{upcomingDeliveries?.length > 0 && (
					<div className="grid gap-[16px]">
						<p className="text-[18px] leading-[21px] font-bold font-inconsolata">
							Upcoming Deliveries
						</p>
						{isMobile ? (
							// Mobile: Simple list
							<div className="grid gap-[16px]">
								{upcomingDeliveries?.map((model: IUpcomingDeliveryResponse) => (
									<UpcomingDeliveryCard key={`${model.deliveryDate} ${uniqueId()}`} model={model} />
								))}
							</div>
						) : (
							// Desktop: Slider
							<UpcomingDeliverySlider deliveries={upcomingDeliveries} />
						)}
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
