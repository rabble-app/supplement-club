import { Button } from "@/components/ui/button";
import { CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import stripe from "stripe";

export default function CardDetails() {
	const [loading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
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
