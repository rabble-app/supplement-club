import { useUser } from "@/contexts/UserContext";
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
	totalPrice,
	children,
	successAction,
}: Readonly<{
	totalPrice: number;
	children?: React.ReactNode;
	successAction: (paymentMethod: string | PaymentMethod | null) => void;
}>) {
	const [clientSecret, setClientSecret] = useState("");
	const context = useUser();

	useEffect(() => {
		const fetchPaymentIntent = async () => {
			const model = await paymentService.createPaymentIntent(
				totalPrice,
				process.env.NEXT_PUBLIC_PRODUCT_CURRENCY as string,
				context?.user?.stripeCustomerId ?? "",
			);
			setClientSecret(model.clientSecret);
		};

		fetchPaymentIntent();
	}, [context?.user?.stripeCustomerId, totalPrice]);

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
