import { useEffect, useState } from "react";

import { Separator } from "@radix-ui/react-separator";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { teamsService } from "@/services/teamService";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import { toast } from "sonner";
import PaymentCard from "../dashboard/account/payment-details/PaymentCard";
import AddPaymentDialog from "./AddPaymentDialog";
import EmailReminders from "./EmailReminders";
import Notify from "./Notify";

export default function PaymentList({
	totalPrice,
	isComming,
	successAction,
}: Readonly<{
	totalPrice: number;
	isComming?: boolean;
	successAction: () => void;
}>) {
	const [policyTerms, setPolicyTerms] = useState(true);
	const [saveAddress, setSameAddress] = useState(true);

	const context = useUser();

	const [defaultCard, setDefaultCard] = useState(
		context?.user?.stripeDefaultPaymentMethodId || "",
	);
	const [userCards, setUserCards] = useState<IUserPaymentOptionModel[]>([]);

	useEffect(() => {
		const fetchUserPaymentOptions = async () => {
			const model = await paymentService.getUserPaymentOptions(
				context?.user?.stripeCustomerId || "",
			);
			setUserCards(model);
		};
		fetchUserPaymentOptions();
	}, [context?.user?.stripeCustomerId]);

	async function onSubmit() {
		const currectCard = userCards.find((u) => u.id === defaultCard);

		if (!isComming) {
			const { data } = await paymentService.addPaymentIntent(
				totalPrice,
				"gbp",
				currectCard?.customer || "",
				defaultCard,
			);

			if (!data?.paymentIntentId) {
				toast.custom(
					() => (
						<Notify
							message={
								"Cannot charge money from this card.Please chose another one"
							}
						/>
					),
					{
						position: "top-right",
					},
				);
				return;
			}

			const captureResponse = await paymentService.addCapturePayment(
				totalPrice,
				context?.user?.teamId || "",
				data.paymentIntentId,
				context?.user?.id || "",
			);

			if (captureResponse.error) {
				toast.custom(() => <Notify message={"Cannot add capture payment"} />, {
					position: "top-right",
				});
				return;
			}
		}

		const addTeamMemberResponse = await teamsService.addTeamMember(
			context?.user?.id || "",
			context?.user?.teamId || "",
		);

		if (addTeamMemberResponse.error) {
			toast.custom(() => <Notify message={"Cannot add team member"} />, {
				position: "top-right",
			});
			return;
		}

		successAction();
	}

	async function addCardMethod() {
		const model = await paymentService.getUserPaymentOptions(
			context?.user?.stripeCustomerId || "",
		);
		setUserCards(model);
	}

	return (
		<form
			onSubmit={onSubmit}
			className="border-[1px] border-grey12 flex flex-col items-start p-[32px] gap-[24px]"
		>
			<div className="grid gap-[24px]">
				<p className="text-[24px] leading-[27px] font-hagerman uppercase">
					Billing Address
				</p>
				<div className="flex items-center gap-[8px]">
					<Checkbox
						id="delivery"
						checked={saveAddress}
						onCheckedChange={(checked) => setSameAddress(checked === true)}
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
											isDefault={defaultCard === item.id}
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

					<AddPaymentDialog successAction={addCardMethod} />
				</div>
			)}

			{!userCards && userCards.length === 0 && <div>Form HERE</div>}

			<Separator className="bg-grey3 h-[1px] w-full" />

			<div className="flex items-center gap-[8px]">
				<Checkbox
					id="policyTerms"
					checked={policyTerms}
					onCheckedChange={(checked) => setPolicyTerms(checked === true)}
				/>
				<label
					htmlFor="policyTerms"
					className="text-[16px] leading-[19px] text-black5 cursor-pointer"
				>
					I accept the Terms of Service and Privacy Policy
				</label>
			</div>

			<p className="text-[14px] leading-[16px]">
				By making this purchase your supplement club will automatically renew
				and your card will be charged the supplement plan price. You can cancel
				or modify at any time using your customer login.
			</p>

			<Button type="submit" className="bg-blue text-white w-full font-bold">
				{`Place Order - £ ${totalPrice.toFixed(2)}`}{" "}
				{/* Use a regular string */}
			</Button>
			<EmailReminders />
		</form>
	);
}
