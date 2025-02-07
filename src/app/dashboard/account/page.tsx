"use client";
import EmailChangeDialog from "@/components/dashboard/account/EmailChangeDialog";
import ManageAccountCard from "@/components/dashboard/account/ManageAccountCard";
import ShippingDetailsDialog from "@/components/dashboard/account/ShippingDetailsDialog";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { usersService } from "@/services/usersService";
import type IUserModel from "@/utils/models/api/IUserModel";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Account() {
	const [userInfo, setUserInfo] = useState<IUserModel>();
	const context = useUser();

	const [defaultCard, setDefaultCard] = useState<IUserPaymentOptionModel>();

	useEffect(() => {
		const fetchUserInfo = async () => {
			const model = await usersService.getUserInfo(context?.user?.id || "");
			setUserInfo(model);
		};
		fetchUserInfo();
	}, [context?.user?.id]);

	useEffect(() => {
		const fetchUserPaymentOptions = async () => {
			const model = await paymentService.getUserPaymentOptions(
				context?.user?.stripeCustomerId || "",
			);
			const card = model.find(
				(c: IUserPaymentOptionModel) =>
					c.id === context?.user?.stripeDefaultPaymentMethodId,
			);
			setDefaultCard(card || model[0]);
		};
		fetchUserPaymentOptions();
	}, [
		context?.user?.stripeDefaultPaymentMethodId,
		context?.user?.stripeCustomerId,
	]);

	return (
		<div className="mx-auto max-w-[600px] py-[16px] md:py-[46px] flex flex-col gap-[32px] min-h-screen justify-start">
			{userInfo && (
				<>
					<div className="grid gap-[16px]">
						<p className="text-[22px] leading-[28px] font-bold font-inconsolata">
							Your Account
						</p>

						<EmailChangeDialog user={userInfo} updateUserAction={setUserInfo} />
					</div>

					<div className="grid gap-[16px]">
						<p className="text-[22px] leading-[28px] font-bold font-inconsolata">
							Shipping Details
						</p>

						<ShippingDetailsDialog
							user={userInfo}
							updateUserAction={setUserInfo}
						/>
					</div>
				</>
			)}

			{defaultCard && (
				<div className="grid gap-[16px]">
					<p className="text-[22px] leading-[28px] font-bold font-inconsolata">
						Payment Details
					</p>

					<Link href="/dashboard/account/payment-details/">
						<ManageAccountCard
							title="Payment card"
							value={`${defaultCard?.card.last4} **** **** ****  ${defaultCard?.card.exp_month}/${defaultCard?.card.exp_year}`}
							imageAlt="Card icon"
							imageSrc="/images/icons/card-blue-icon.svg"
						/>
					</Link>
				</div>
			)}
		</div>
	);
}
