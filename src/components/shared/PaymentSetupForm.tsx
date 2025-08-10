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
import { Loader2 } from "lucide-react";

export default function PaymentSetupForm({
	clientSecret,
	cardAction,
	fetchSetupIntent,
}: Readonly<{
	clientSecret: string;
	cardAction: (val: string | PaymentMethod | null) => void;
	fetchSetupIntent: () => void;
}>) {
	const [futurePurchase, setFuturePurchase] = useState(true);
	const [defaultCard, setDefaultCard] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const stripe = useStripe();
	const elements = useElements();
	const context = useUser();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
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
				title: error.message ?? "Payment failed",
				status: StatusToast.ERROR,
			});
		} else if (setupIntent?.status === "succeeded") {
			const addCardResponse = (await paymentService.addCard(
				(setupIntent.payment_method as string) ?? "",
				context?.user?.stripeCustomerId ?? "",
			)) as { error?: string } | null;
			if (addCardResponse?.error) {
				fetchSetupIntent();
				CustomToast({
					title: JSON.parse(addCardResponse.error)?.message,
					status: StatusToast.ERROR,
				});
			} else {
				cardAction(setupIntent.payment_method);
			}
		}
		setIsLoading(false);
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
				className="bg-blue text-[16px] flex ml-auto text-white font-bold font-inconsolata h-[48px] mt-[20px] w-fit"
			>
				{isLoading && <Loader2 className="w-4 h-4 mr-2" />}
				Add Card Details
			</Button>
		</form>
	);
}
