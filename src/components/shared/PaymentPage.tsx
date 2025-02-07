import CheckoutForm from "@/components/shared/CheckoutForm";
import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { Elements } from "@stripe/react-stripe-js";
import { type PaymentIntent, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentPage = ({
	children,
	paymentIntentAction,
	totalPrice,
}: Readonly<{
	children?: React.ReactNode;
	paymentIntentAction: (val: PaymentIntent) => void;
	totalPrice: number;
}>) => {
	const [clientSecret, setClientSecret] = useState("");
	const context = useUser();

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

	async function onSubmit(val: PaymentIntent) {
		await paymentService.addCard(
			context?.user?.stripeDefaultPaymentMethodId || "",
			val.id,
		);
		paymentIntentAction(val);
	}

	return (
		<div className="mx-auto w-full">
			{clientSecret ? (
				<Elements options={{ clientSecret }} stripe={stripePromise}>
					<CheckoutForm paymentIntentAction={onSubmit}>{children}</CheckoutForm>
				</Elements>
			) : (
				<p>Loading payment...</p>
			)}
		</div>
	);
};

export default PaymentPage;
