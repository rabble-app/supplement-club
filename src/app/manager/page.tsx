import Image from "next/image";

import ManagerCard from "@/components/cards/ManagerOptionCard";

import type IManagerOptionCardModel from "@/utils/models/IManagerOptionCardModel";

export default function ManagerPage() {
	const yourAccount = [
		{
			id: 1,
			image: "/images/icons/calendar-icon.svg",
			imageAlt: "Calendar icon",
			link: "/about",
			title: "Manage Subscriptions",
		},
		{
			id: 2,
			image: "/images/icons/clock-icon.svg",
			imageAlt: "Clock icon",
			link: "/about",
			title: "View Past Orders",
		},
		{
			id: 3,
			image: "/images/icons/user-profile-icon.svg",
			imageAlt: "User profile icon",
			link: "/about",
			title: "Manage Subscriptions",
		},
	] as IManagerOptionCardModel[];

	const otherActions = [
		{
			id: 1,
			image: "/images/icons/discount-icon.svg",
			imageAlt: "Discount icon",
			link: "/about",
			title: "Refer a Friend & You BOTH Save",
		},
		{
			id: 2,
			image: "/images/icons/cart-icon.svg",
			imageAlt: "Cart icon",
			link: "/about",
			title: "Shop Supplement Products",
		},
	] as IManagerOptionCardModel[];

	return (
		<div className="grid gap-[32px] black max-w-[600px] mx-auto my-[46px]">
			<h1 className="text-[24px] leading-[28px] font-bold font">
				Welcome Back Maxwell. 👋🏻
			</h1>
			<div className="grid gap-[16px]">
				<p className="text-[18px] leading-[21px] font-bold font-inconsolata">
					Upcoming Deliveries
				</p>
				<div className="bg-[#fff] py-[16px] grid gap-[16px] rounded-[12px] shadow-card">
					<div className="h-[50px] px-[12px] grid grid-cols-[50px_1fr] gap-[8px] text-[20px] leading-[23px] font-bold text-blue items-center">
						<div className="p-[13px] bg-blue6 rounded-[50px]">
							<Image
								src="/images/icons/delivery-blue-icon.svg"
								alt="Delivery icon"
								width={24}
								height={24}
							/>
						</div>
						January 1st 2025
					</div>
					<div className="px-[12px] grid md:grid-cols-[1fr_185px] md:justify-between md:items-center gap-[8px]">
						<div className="grid gap-[4px]">
							<p className="text-[12px] leading-[13px] text-grey4 uppercase font-inconsolata font-[600]">
								KANEKA CORPRATION
							</p>
							<p className="text-[20px] leading-[24px] font-bold font-hagerman">
								Coenzyme Q10 Ubiquinol Kaneka TM
							</p>
							<p className="text-[12px] leading-[13px] text-grey4 font-inconsolata font-[600]">
								180 Capsules
							</p>
						</div>
						<p className="text-[12px] leading-[13px] flex text-end">
							Penthouse 4, Rotherfield Street, London, N1 3BU
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-[16px]">
				<p className="text-[18px] leading-[21px] font-bold font-inconsolata">
					Your Account
				</p>

				{yourAccount.map((item) => (
					<ManagerCard key={item.id} {...item} />
				))}
			</div>

			<div className="grid gap-[16px]">
				<p className="text-[18px] leading-[21px] font-bold font-inconsolata">
					Other Actions
				</p>

				{otherActions.map((item) => (
					<ManagerCard key={item.id} {...item} />
				))}
			</div>
		</div>
	);
}
