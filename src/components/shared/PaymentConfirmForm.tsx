import { paymentService } from "@/services/paymentService";
import { Elements } from "@stripe/react-stripe-js";
import { type PaymentMethod, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import PaymentElements from "./PaymentElements";
import Spinner from "./Spinner";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export default function PaymentConfirmForm({
	children,
	successAction,
}: Readonly<{
	children?: React.ReactNode;
	successAction: (paymentMethod: string | PaymentMethod | null) => void;
}>) {
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		const fetchPaymentIntent = async () => {
			const model = await paymentService.setupIntent();
			setClientSecret(model.clientSecret);
		};

		fetchPaymentIntent();
	}, []);

	function onCardAction(paymentMethod: string | PaymentMethod | null) {
		successAction(paymentMethod);
	}

	return (
		<div className="mx-auto w-full">
			{clientSecret ? (
				<Elements options={{ clientSecret }} stripe={stripePromise}>
					<PaymentElements
						clientSecret={clientSecret}
						cardAction={onCardAction}
					>
						{children}
					</PaymentElements>
				</Elements>
			) : (
				<Spinner />
			)}
		</div>
	);
}
