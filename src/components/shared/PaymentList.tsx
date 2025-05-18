import { startTransition, useEffect, useState } from "react";

import { Separator } from "@radix-ui/react-separator";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import type IPaymentIntentApiResponse from "@/utils/models/services/IPaymentIntentApiResponse";
import type { PaymentMethod } from "@stripe/stripe-js";
import Link from "next/link";
import PaymentCard from "../dashboard/account/payment-details/PaymentCard";
import AddPaymentDialog from "./AddPaymentDialog";
import EmailReminders from "./EmailReminders";
import PaymentConfirmForm from "./PaymentConfirmForm";
import { CustomToast, StatusToast } from "./Toast";

export default function PaymentList({
	totalPrice,
	isComming,
	capsulePerDay,
	teamId,
	topupQuantity,
	productId,
	successAction,
}: Readonly<{
	totalPrice: number;
	capsulePerDay: number;
	teamId: string;
	topupQuantity: number;
	productId: string;
	isComming?: boolean;
	successAction: () => void;
}>) {
	const [policyTerms, setPolicyTerms] = useState(true);
	const [address, setAddress] = useState(true);

	const context = useUser();

	const [defaultCard, setDefaultCard] = useState(
		context?.user?.stripeDefaultPaymentMethodId ?? "",
	);
	const [userCards, setUserCards] = useState<IUserPaymentOptionModel[]>([]);

	useEffect(() => {
		const fetchUserPaymentOptions = async () => {
			await retrivePaymentOptions(context?.user?.stripeCustomerId);
		};
		fetchUserPaymentOptions();
	}, [context?.user?.stripeCustomerId]);

	async function processPayment(cards: IUserPaymentOptionModel[]) {
		if (!policyTerms) {
			CustomToast({
				title:
					"To continue, please agree to our Terms and Conditions and Privacy Policy.",
				status: StatusToast.ERROR,
				position: "top-center",
			});
			return;
		}
		let currectCard = cards.find((u) => u.id === defaultCard);
		if (!currectCard) {
			currectCard = cards[0];
		}
		if (isComming) {
			await paymentService.joinPreorderTeam(
				teamId ?? "",
				context?.user?.id ?? "",
				productId ?? "",
				90 * capsulePerDay,
				totalPrice,
				capsulePerDay,
			);
		} else {
			const response = (await paymentService.joinTeam({
				teamId: teamId ?? "",
				userId: context?.user?.id ?? "",
				productId: productId ?? "",
				quantity: 90 * capsulePerDay,
				price: totalPrice,
				capsulePerDay,
				amount: totalPrice,
				paymentMethodId: currectCard?.id,
				topupQuantity: topupQuantity,
			})) as IPaymentIntentApiResponse;

			if (response.statusCode !== 200) {
				CustomToast({
					title: response?.error
						? JSON.parse(response?.error).message
						: "Cannot join the team for some reason",
					status: StatusToast.ERROR,
				});
				return;
			}
		}

		successAction();
	}

	async function retrivePaymentOptions(
		stripeCustomerId?: string | PaymentMethod | null,
	) {
		const model = await paymentService.getUserPaymentOptions(
			(stripeCustomerId as string) ?? "",
		);
		setUserCards(model);
	}

	async function addCreditCard(paymentMethod: string | PaymentMethod | null) {
		await paymentService.addCard(
			(paymentMethod as string) ?? "",
			context?.user?.stripeCustomerId ?? "",
		);
		const cards = await paymentService.getUserPaymentOptions(
			context?.user?.stripeCustomerId ?? "",
		);
		await processPayment(cards);
	}

	const ButtonSection = (
		<div className="grid gap-[24px]">
			<Separator className="bg-grey3 h-[1px] w-full" />

			<div className="flex items-start gap-[10px]">
				<Checkbox
					id="policyTerms"
					checked={policyTerms}
					onCheckedChange={(checked) => setPolicyTerms(checked === true)}
				/>
				<label
					htmlFor="policyTerms"
					className="text-[16px] leading-[19px] text-black5 cursor-pointer"
				>
					By joining Supplement Club, you agree to our{" "}
					<Link
						target="_blank"
						href="https://swift-thorium-bdb.notion.site/Supplement-Club-Terms-Conditions-1cfa72b529ea80bf941dd08f4db13fd2?pvs=4"
						className="underline text-bold text-blue"
					>
						Terms & Conditions
					</Link>{" "}
					and{" "}
					<Link
						target="_blank"
						href="https://swift-thorium-bdb.notion.site/Supplement-Club-Privacy-Policy-1cfa72b529ea805b8588d7bca35beff1?pvs=4"
						className="underline text-bold text-blue"
					>
						Privacy Policy
					</Link>
				</label>
			</div>

			<p className="text-[14px] leading-[16px]">
				By making this purchase your supplement club will automatically renew
				and your card will be charged the supplement plan price. You can cancel
				or modify at any time using your customer login.
			</p>
		</div>
	);

	return (
		<div className="border-[1px] border-grey12 flex flex-col items-start p-[32px] gap-[24px] mx-[-30px] md:mx-[0]">
			<div className="grid gap-[24px]">
				<p className="text-[24px] leading-[27px] font-hagerman uppercase">
					Billing Address
				</p>
				<div className="flex items-center gap-[8px]">
					<Checkbox
						id="delivery"
						checked={address}
						onCheckedChange={(checked) => setAddress(checked === true)}
					/>
					<label
						htmlFor="delivery"
						className="text-[16px] leading-[19px] text-black5 cursor-pointer"
					>
						Same as delivery address
					</label>
				</div>
			</div>

			<Separator className="bg-grey3 h-[1px] w-full" />

			{userCards && userCards?.length > 0 && (
				<>
					<div className="grid gap-[16px] w-full px-[16px] py-[32px] rounded-[12px] shadow-3">
						<div className="text-[40px] leading-[120%] uppercase font-hagerman">
							Your cards
						</div>

						<div className=" bg-white flex flex-col gap-[16px] justify-start w-full">
							<div className="border-grey37 border-[1px] rounded-[4px]">
								{userCards?.map((item, idx) => (
									<div key={item.id}>
										<RadioGroup
											key={item.id}
											value={defaultCard.toString()}
											onValueChange={(value) => setDefaultCard(value)}
										>
											<PaymentCard
												model={item.card}
												isDefault={
													(context?.user?.stripeDefaultPaymentMethodId ??
														"") === item.id
												}
												topContent={
													<RadioGroupItem
														value={item.id.toString()}
														className="mx-auto"
													/>
												}
											/>
										</RadioGroup>
										{idx !== userCards?.length - 1 && (
											<Separator
												key={`${item.card.last4}-separator `}
												className="bg-grey37 h-[1px]"
											/>
										)}
									</div>
								))}
							</div>
						</div>

						<AddPaymentDialog
							successAction={(val) =>
								retrivePaymentOptions(val || context?.user?.stripeCustomerId)
							}
						/>
					</div>
					{ButtonSection}

					<Button
						onClick={() => startTransition(() => processPayment(userCards))}
						className={` text-white font-bold w-full h-[51px] ${policyTerms ? "bg-blue" : "pointer-events-none bg-grey25"}`}
					>
						{`Place Order - £ ${totalPrice.toFixed(2)}`}{" "}
						{/* Use a regular string */}
					</Button>
				</>
			)}

			{!userCards ||
				(userCards?.length === 0 && (
					<PaymentConfirmForm successAction={addCreditCard}>
						{ButtonSection}

						<Button
							type="submit"
							className={` text-white font-bold w-full h-[51px] mt-[20px] ${policyTerms ? "bg-blue" : "pointer-events-none bg-grey25"}`}
						>
							{`Place Order - £ ${totalPrice.toFixed(2)}`}{" "}
							{/* Use a regular string */}
						</Button>
					</PaymentConfirmForm>
				))}

			<EmailReminders />
		</div>
	);
}
