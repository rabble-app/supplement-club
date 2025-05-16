import { useUser } from "@/contexts/UserContext";
import { useUserStore } from "@/stores/userStore";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import type { PaymentMethod } from "@stripe/stripe-js";
import { CustomToast, StatusToast } from "./Toast";

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
			CustomToast({
				title: submitResult?.error?.message ?? "Elements Submit Failed",
				status: StatusToast.ERROR,
			});
			return;
		}

		const { error, setupIntent } = await stripe.confirmSetup({
			elements,
			clientSecret,
			confirmParams: { return_url: "" },
			redirect: "if_required",
		});

		if (error) {
			CustomToast({
				title: `SetupIntent striple component:" ${error.message}`,
				status: StatusToast.ERROR,
			});
		} else {
			// set payment card by default
			if (context?.user) {
				context.user.stripeDefaultPaymentMethodId =
					setupIntent.payment_method as string;
				setUser(context.user);
			}
			cardAction(setupIntent.payment_method);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />

			{children}
		</form>
	);
}
