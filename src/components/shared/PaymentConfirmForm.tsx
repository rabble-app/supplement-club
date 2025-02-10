import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PaymentConfirmForm({
	totalPrice,
}: Readonly<{
	totalPrice: number;
}>) {
	const [clientSecret, setClientSecret] = useState("");
	const [futurePurchase, setFuturePurchase] = useState(true);
	const [defaultCard, setDefaultCard] = useState(true);

	const stripe = useStripe();
	const elements = useElements();
	const context = useUser();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements || !clientSecret) return;

		debugger;

		// ✅ Call elements.submit() first
		const submitResult = await elements.submit();
		if (submitResult.error) {
			console.error("Submit Error:", submitResult.error.message);
			return;
		}

		// ✅ Now confirm the SetupIntent
		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {},
			redirect: "if_required",
		});

		if (error) {
			console.error("Setup Failed:", error.message);
		} else if (paymentIntent?.status === "succeeded") {
			console.log("Payment method saved:", paymentIntent.payment_method);
			await paymentService.addCard(
				(paymentIntent.payment_method as string) || "",
				context?.user?.stripeCustomerId || "",
			);
		}
	};

	useEffect(() => {
		const fetchPaymentIntent = async () => {
			const model = await paymentService.createPaymentIntent(
				totalPrice,
				"gbp",
				context?.user?.stripeCustomerId || "",
				context?.user?.stripeDefaultPaymentMethodId || "",
			);
			setClientSecret(model.clientSecret);
		};

		fetchPaymentIntent();
	}, [
		context?.user?.stripeCustomerId,
		context?.user?.stripeDefaultPaymentMethodId,
		totalPrice,
	]);

	return (
		<div className="mx-auto w-full">
			{clientSecret ? (
				<Elements options={{ clientSecret }} stripe={stripePromise}>
					<form onSubmit={handleSubmit}>
						<PaymentElement />
						<div className="grid gap-[16px] py-[16px]">
							<div className="flex items-center gap-[8px]">
								<Checkbox
									id="futurePurchase"
									checked={futurePurchase}
									onCheckedChange={(checked) =>
										setFuturePurchase(checked === true)
									}
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
									onCheckedChange={(checked) =>
										setDefaultCard(checked === true)
									}
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
				</Elements>
			) : (
				<p>Loading payment...</p>
			)}
		</div>
	);
}
