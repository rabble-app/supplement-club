import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import type { PaymentIntent } from "@stripe/stripe-js";
import { useState } from "react";

const CheckoutForm = ({
	children,
	paymentIntentAction,
}: Readonly<{
	children?: React.ReactNode;
	paymentIntentAction: (val: PaymentIntent) => void;
}>) => {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setLoading(true);
		setMessage(null);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			confirmParams: { return_url: window.location.origin },
			redirect: "if_required",
		});

		if (error) {
			setMessage(error.message || "Payment failed");
		} else if (paymentIntent?.status === "succeeded") {
			setMessage("Payment successful! 🎉");
			paymentIntentAction(paymentIntent);
		}

		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<PaymentElement />
			{children}
			{message && <p className="text-red-500">{message}</p>}
		</form>
	);
};

export default CheckoutForm;
