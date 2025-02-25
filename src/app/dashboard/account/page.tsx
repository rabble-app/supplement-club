"use client";
import EmailChangeDialog from "@/components/dashboard/account/EmailChangeDialog";
import ManageAccountCard from "@/components/dashboard/account/ManageAccountCard";
import ShippingDetailsDialog from "@/components/dashboard/account/ShippingDetailsDialog";
import Spinner from "@/components/shared/Spinner";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { usersService } from "@/services/usersService";
import type IUserModel from "@/utils/models/api/IUserModel";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Account() {
	const [loading, setLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<IUserModel>();
	const context = useUser();

	const [defaultCard, setDefaultCard] = useState<IUserPaymentOptionModel>();

	useEffect(() => {
		const fetchData = async () => {
			if (!context?.user?.id || !context?.user?.stripeCustomerId) {
				setLoading(false);
				return;
			}

			try {
				const [userInfoResponse, paymentOptionsResponse] = await Promise.all([
					usersService.getUserInfo(context.user.id),
					paymentService.getUserPaymentOptions(context.user.stripeCustomerId),
				]);

				setUserInfo(userInfoResponse);

				const defaultCard = paymentOptionsResponse.find(
					(c: IUserPaymentOptionModel) =>
						c.id === context?.user?.stripeDefaultPaymentMethodId,
				);

				setDefaultCard(defaultCard ?? paymentOptionsResponse[0]);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false); // Ensure loading is false once both requests are done
			}
		};

		fetchData();
	}, [
		context?.user?.id,
		context?.user?.stripeCustomerId,
		context?.user?.stripeDefaultPaymentMethodId,
	]);

	if (loading) return <Spinner />;

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
