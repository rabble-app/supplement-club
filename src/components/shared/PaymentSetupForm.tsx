import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import type { PaymentMethod } from "@stripe/stripe-js";
import { useState } from "react";
import { Button } from "../ui/button";
import { CustomToast, StatusToast } from "./Toast";

export default function PaymentSetupForm({
	clientSecret,
	cardAction,
}: Readonly<{
	clientSecret: string;
	cardAction: (val: string | PaymentMethod | null) => void;
}>) {
	const [futurePurchase, setFuturePurchase] = useState(true);
	const [defaultCard, setDefaultCard] = useState(true);

	const stripe = useStripe();
	const elements = useElements();
	const context = useUser();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements || !clientSecret) return;

		const submitResult = await elements.submit();
		if (submitResult.error) {
			CustomToast({
				title: `Payment Failed:" ${submitResult?.error?.message}`,
				status: StatusToast.ERROR,
			});
			return;
		}

		// ✅ Now confirm the SetupIntent
		const { error, setupIntent } = await stripe.confirmSetup({
			elements,
			clientSecret,
			confirmParams: {},
			redirect: "if_required",
		});

		if (error) {
			CustomToast({
				title: `Payment Failed:" ${error.message}`,
				status: StatusToast.ERROR,
			});
		} else if (setupIntent?.status === "succeeded") {
			await paymentService.addCard(
				(setupIntent.payment_method as string) ?? "",
				context?.user?.stripeCustomerId ?? "",
			);
			cardAction(setupIntent.payment_method);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<div className="grid gap-[16px] py-[16px]">
				<div className="flex items-center gap-[8px]">
					<Checkbox
						id="futurePurchase"
						checked={futurePurchase}
						onCheckedChange={(checked) => setFuturePurchase(checked === true)}
					/>
					<label
						htmlFor="futurePurchase"
						className="text-[16px] leading-[19px] text-black5 cursor-pointer"
					>
						Save card for future purchase
					</label>
				</div>

				<div className="flex items-center gap-[8px]">
					<Checkbox
						id="defaultCard"
						checked={defaultCard}
						onCheckedChange={(checked) => setDefaultCard(checked === true)}
					/>
					<label
						htmlFor="defaultCard"
						className="text-[16px] leading-[19px] text-black5 cursor-pointer"
					>
						Use this card as default payment method
					</label>
				</div>
			</div>

			<div className="h-[1px] bg-grey w-full" />

			<Button
				type="submit"
				className="bg-blue text-[16px] flex ml-auto text-white font-bold font-inconsolata h-[48px] w-[179px] mt-[20px]"
			>
				Add Card Details
			</Button>
		</form>
	);
}
