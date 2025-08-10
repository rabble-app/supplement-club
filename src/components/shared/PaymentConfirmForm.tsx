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

	const fetchPaymentIntent = async () => {
		const model = await paymentService.setupIntent();
		setClientSecret(model.clientSecret);
	};

	useEffect(() => {
		fetchPaymentIntent();
	}, []);

	async function onCardAction(paymentMethod: string | PaymentMethod | null) {
		try {
			await successAction(paymentMethod); // your `addCreditCard`
		  } catch (error) {
			console.error("Card submission failed:", error);
			// 💡 Re-fetch intent so retry uses a fresh one
			await fetchPaymentIntent();
		  }
	}

	return (
		<div className="mx-auto w-full">
			<p className="text-[24px] leading-[27px] font-hagerman uppercase">
				CARD DETAILS
			</p>
			{clientSecret ? (
				<Elements options={{ clientSecret }} stripe={stripePromise} key={clientSecret}>
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
