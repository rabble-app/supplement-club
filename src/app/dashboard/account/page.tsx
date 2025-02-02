"use client";
import EmailChangeDialog from "@/components/dashboard/account/EmailChangeDialog";
import ManageAccountCard from "@/components/dashboard/account/ManageAccountCard";
import ShippingDetailsDialog from "@/components/dashboard/account/ShippingDetailsDialog";
import { useUser } from "@/contexts/UserContext";
import { usersService } from "@/services/usersService";
import type IUserModel from "@/utils/models/api/IUserModel";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Account() {
	const [userInfo, setUserInfo] = useState<IUserModel>();
	const context = useUser();

	useEffect(() => {
		const fetchUserInfo = async () => {
			console.log(context?.user?.id);
			const model = await usersService.getUserInfo(
				"03efdd19-9e61-468d-ad89-66ce7ff6dc02",
			);
			setUserInfo(model);
		};
		fetchUserInfo();
	}, [context?.user?.id]);

	return (
		<div className="mx-auto max-w-[600px] py-[16px] md:py-[46px] flex flex-col gap-[32px] min-h-screen justify-start">
			<div className="grid gap-[16px]">
				<p className="text-[22px] leading-[28px] font-bold font-inconsolata">
					Your Account
				</p>

				{userInfo && (
					<EmailChangeDialog user={userInfo} updateUserAction={setUserInfo} />
				)}
			</div>

			<div className="grid gap-[16px]">
				<p className="text-[22px] leading-[28px] font-bold font-inconsolata">
					Shipping Details
				</p>

				{userInfo && (
					<ShippingDetailsDialog
						user={userInfo}
						updateUserAction={setUserInfo}
					/>
				)}
			</div>

			<div className="grid gap-[16px]">
				<p className="text-[22px] leading-[28px] font-bold font-inconsolata">
					Payment Details
				</p>

				<Link href="/dashboard/account/payment-details/">
					<ManageAccountCard
						title="Payment card"
						value="9084 **** **** ****  11/2026"
						imageAlt="Card icon"
						imageSrc="/images/icons/card-blue-icon.svg"
					/>
				</Link>

				<ManageAccountCard
					title="Billing address"
					value="Penthouse 4, Rotherfield Street, London, N1 3BU"
					imageAlt="Home icon"
					imageSrc="/images/icons/home-blue-icon.svg"
				/>
			</div>
		</div>
	);
}
