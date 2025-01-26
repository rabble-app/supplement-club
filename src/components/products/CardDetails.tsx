import { CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "../ui/button";
import stripe from "stripe";

export default function CardDetails() {
	const elements = stripe.elements();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setLoading(true);
		setError("");

		const cardElement = elements.getElement(CardElement);

		try {
			const { paymentMethod, error: stripeError } =
				await stripe.createPaymentMethod({
					type: "card",
					card: cardElement,
				});

			if (stripeError) {
				setError(stripeError.message);
				setLoading(false);
				return;
			}

			const response = await fetch("/api/payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
			});

			const data = await response.json();

			if (data.error) {
				setError(data.error);
			} else {
				setSuccess(true);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
			<CardElement
				options={{
					style: {
						base: {
							fontSize: "16px",
							color: "#424770",
							"::placeholder": { color: "#aab7c4" },
						},
						invalid: { color: "#9e2146" },
					},
				}}
			/>
			<Button
				type="submit"
				disabled={!stripe || loading}
				className="bg-blue-500 text-white py-2 px-4 rounded"
			>
				{loading ? "Processing..." : "Pay Now"}
			</Button>
		</form>
	);
}
