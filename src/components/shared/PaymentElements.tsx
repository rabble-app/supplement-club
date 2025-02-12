import { useUser } from "@/contexts/UserContext";
import { useUserStore } from "@/stores/userStore";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import type { PaymentMethod } from "@stripe/stripe-js";
import { ShowErrorToast } from "./ShowErrorToast";

export default function PaymentElements({
	clientSecret,
	cardAction,
	children,
}: Readonly<{
	clientSecret: string;
	children?: React.ReactNode;
	cardAction: (val: string | PaymentMethod | null) => void;
}>) {
	const stripe = useStripe();
	const elements = useElements();

	const context = useUser();
	const { setUser } = useUserStore((state) => state);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements || !clientSecret) return;

		const submitResult = await elements.submit();
		if (submitResult.error) {
			ShowErrorToast(submitResult?.error?.message, "Elements Submit Failed");
			return;
		}

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: { return_url: "" },
			redirect: "if_required",
		});

		if (error) {
			ShowErrorToast(`ConfirmPayment striple component:" ${error.message}`);
		} else {
			// set payment card by default
			if (context?.user) {
				context.user.stripeDefaultPaymentMethodId =
					paymentIntent.payment_method as string;
				setUser(context.user);
			}
			cardAction(paymentIntent.payment_method);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />

			{children}
		</form>
	);
}
