import type ICardModel from "@/utils/models/ICardModel";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import NewPayment from "../NewPayment";
import YourCards from "../YourCards";

export default function CreditCards() {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);

	const yourcards = [
		{
			display_brand: "visa",
			exp_month: 12,
			exp_year: 2025,
			last4: "4242",
		},
		{
			display_brand: "MasterCard",
			exp_month: 12,
			exp_year: 2025,
			last4: "8846",
		},
	] as ICardModel[];

	return (
		<>
			{yourcards.length > 4 && <YourCards cards={yourcards} />}
			{yourcards.length < 4 && <NewPayment />}
		</>
	);
}
