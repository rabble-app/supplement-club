"use client";
import React, { useEffect, useState } from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import ManagerCard from "@/components/dashboard/ManagerOptionCard";

import { useUser } from "@/contexts/UserContext";
import type IManagerOptionCardModel from "@/utils/models/IManagerOptionCardModel";
import type IUpcomingDeliveryModel from "@/utils/models/api/IUpcomingDeliveryModel";
import { formatDate } from "@/utils/utils";
import Image from "next/image";

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

import Spinner from "@/components/shared/Spinner";
import { usersService } from "@/services/usersService";
import type { IUpcomingDeliveryBasket } from "@/utils/models/api/IUpcomingDeliveryBasket";
export default function ManagerPage() {
	const [loading, setLoading] = useState(true);
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
			setLoading(false);
		};
		fetchUpcomingDeliveries();
	}, [context?.user]);

	const [currentSlide, setCurrentSlide] = React.useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(s) {
			setCurrentSlide(s.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
		slides: {
			perView: 1,
		},
	});

	if (loading) return <Spinner />;
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
						<div className="relative">
							<div className="w-full max-w-[600px] mx-auto space-y-4">
								<div ref={sliderRef} className="keen-slider rounded-[12px]">
									{upcomingDeliveries?.map((model: IUpcomingDeliveryModel) => (
										<div
											key={model.id}
											className="keen-slider__slide bg-[#FFFFF01] py-[16px] px-[12px] grid gap-[16px] shadow-card"
										>
											<div className="flex justify-between items-center">
												<div className="h-[50px] px-[12px] grid grid-cols-[50px_1fr] gap-[8px] text-[20px] leading-[23px] font-bold text-blue items-center">
													<div className="p-[13px] bg-blue6 rounded-[50px]">
														<Image
															src="/images/icons/delivery-blue-icon.svg"
															alt="Delivery icon"
															width={24}
															height={24}
														/>
													</div>
													{formatDate(model.deliveryDate)}
												</div>
												<p className="text-[12px] leading-[13px] flex text-end">
													{model.address}, {model.city}, {model.country}
												</p>
											</div>
											<div className="grid grid-cols-2 gap-[16px]">
												{model.basket?.map((item: IUpcomingDeliveryBasket) => (
													<div
														key={item.id}
														className="grid grid-cols-[69px_1fr] gap-[8px]"
													>
														<Image
															src="/images/supplement-mockup.svg"
															alt="supplement icon"
															width={61}
															height={61}
														/>

														<div className="flex flex-col items-start justify-center gap-[8px]">
															<p className="text-[14px] font-inconsolata">
																{item.quantity} Capsules pouch
															</p>
															<p className="text-[20px] font-hagerman">
																{item.product.name}
															</p>
														</div>
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Dots */}
							{loaded && instanceRef.current && (
								<div className="flex justify-center items-center mt-4 gap-2 relative">
									<div
										className="text-blue cursor-pointer pr-[30px]"
										onClick={() => instanceRef.current?.prev()}
										onKeyUp={(e) =>
											e.key === "ArrowLeft" && instanceRef.current?.prev()
										}
										onKeyDown={(e) =>
											e.key === "ArrowLeft" && instanceRef.current?.prev()
										}
										onKeyPress={(e) =>
											e.key === "ArrowLeft" && instanceRef.current?.prev()
										}
									>
										←
									</div>
									{[
										...Array(
											instanceRef.current.track.details.slides.length,
										).keys(),
									].map((idx) => (
										<span
											key={idx}
											onClick={() => instanceRef.current?.moveToIdx(idx)}
											onKeyUp={(e) =>
												e.key === "Enter" && instanceRef.current?.moveToIdx(idx)
											}
											onKeyDown={(e) =>
												e.key === "Enter" && instanceRef.current?.moveToIdx(idx)
											}
											onKeyPress={(e) =>
												e.key === "Enter" && instanceRef.current?.moveToIdx(idx)
											}
											className={`w-[8px] h-[8px] rounded-full cursor-pointer ${
												currentSlide === idx ? "bg-black" : "bg-gray-300"
											}`}
										/>
									))}

									<div
										className="text-blue cursor-pointer pl-[30px]"
										onClick={() => instanceRef.current?.next()}
										onKeyUp={(e) =>
											e.key === "ArrowRight" && instanceRef.current?.next()
										}
										onKeyDown={(e) =>
											e.key === "ArrowRight" && instanceRef.current?.next()
										}
										onKeyPress={(e) =>
											e.key === "ArrowRight" && instanceRef.current?.next()
										}
									>
										→
									</div>
								</div>
							)}
						</div>
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
