"use client";
import { Button } from "@/components/ui/button";
import { cardDetailsSchema } from "@/validations/schemas/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export default function NewPayment() {
	const stripe = useStripe();
	const elements = useElements();
	const currentForm = useForm<z.infer<typeof cardDetailsSchema>>({
		resolver: zodResolver(cardDetailsSchema),
		mode: "onChange",
	});

	async function onSubmit() {
		// Create a PaymentIntent with the specified amount and currency

		if (!stripe || !elements) return;
		const cardElement = elements.getElement(CardElement);
		const { error } = await stripe.confirmCardPayment(
			process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
			{
				payment_method: {
					card: cardElement,
					billing_details: { name: "Test User" },
				},
				return_url: `${window.location.origin}/payment-success`, // Redirect on success
			},
		);

		if (error) {
		}
	}
	return (
		<div className="flex flex-col gap-[24px]">
			<CardElement
				options={{
					style: {
						base: {
							fontSize: "16px",
							color: "#424770",
							"::placeholder": {
								color: "#aab7c4",
							},
						},
						invalid: {
							color: "#9e2146",
						},
					},
				}}
			/>

			<div className="md:contents grid gap-[16px]">
				<Separator className=" h-[1px] bg-grey32 mx-[-16px]" />

				<Button
					onClick={() => onSubmit()}
					className={` text-white text[16px] md:text-[18px] md:leading-[27px] font-inconsolata flex ml-auto font-bold ${true ? "bg-blue text-white" : "pointer-events-none bg-blue14 text-grey34"}`}
				>
					Add Card Details
				</Button>
			</div>
		</div>
	);
}
