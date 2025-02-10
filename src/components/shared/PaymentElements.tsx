import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import type { PaymentMethod } from "@stripe/stripe-js";
import { toast } from "sonner";
import Notify from "./Notify";

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements || !clientSecret) return;

		const submitResult = await elements.submit();
		if (submitResult.error) {
			toast.custom(
				() => (
					<Notify
						message={`Payment Failed:" ${submitResult?.error?.message}`}
					/>
				),
				{
					position: "top-right",
				},
			);
			return;
		}

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: { return_url: "" },
			redirect: "if_required",
		});

		if (error) {
			toast.custom(
				() => <Notify message={`Payment Failed:" ${error.message}`} />,
				{
					position: "top-right",
				},
			);
		} else if (paymentIntent?.status === "succeeded") {
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
