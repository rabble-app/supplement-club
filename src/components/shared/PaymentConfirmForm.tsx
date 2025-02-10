import { useUser } from "@/contexts/UserContext";
import { paymentService } from "@/services/paymentService";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import PaymentElements from "./PaymentElements";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export default function PaymentConfirmForm({
	totalPrice,
	children,
	successAction,
}: Readonly<{
	totalPrice: number;
	children?: React.ReactNode;
	successAction: () => void;
}>) {
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

	return (
		<div className="mx-auto w-full">
			{clientSecret ? (
				<Elements options={{ clientSecret }} stripe={stripePromise}>
					<PaymentElements
						clientSecret={clientSecret}
						cardAction={successAction}
					>
						{children}
					</PaymentElements>
				</Elements>
			) : (
				<p>Loading payment...</p>
			)}
		</div>
	);
}
