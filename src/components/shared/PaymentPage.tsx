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
}: Readonly<{
	children?: React.ReactNode;
	paymentIntentAction: (val: PaymentIntent) => void;
}>) => {
	const [clientSecret, setClientSecret] = useState("");
	const context = useUser();

	useEffect(() => {
		const fetchPaymentIntent = async () => {
			const model = await paymentService.createPaymentIntent(
				1000,
				"gbp",
				context?.user?.stripeCustomerId || "", // Ensure this is used correctly
				context?.user?.stripeDefaultPaymentMethodId || "",
			);
			setClientSecret(model.clientSecret);
		};

		fetchPaymentIntent();
	}, [
		context?.user?.stripeCustomerId,
		context?.user?.stripeDefaultPaymentMethodId,
	]); // Add dependencies here

	return (
		<div className="mx-auto w-full">
			{clientSecret ? (
				<Elements options={{ clientSecret }} stripe={stripePromise}>
					<CheckoutForm paymentIntentAction={paymentIntentAction}>
						{children}
					</CheckoutForm>
				</Elements>
			) : (
				<p>Loading payment...</p>
			)}
		</div>
	);
};

export default PaymentPage;
