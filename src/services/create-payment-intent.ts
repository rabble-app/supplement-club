// /pages/api/create-payment-intent.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
	apiVersion: "2022-11-15", // Specify the Stripe API version you're using
});

interface CreatePaymentIntentRequest extends NextApiRequest {
	body: {
		amount: number;
		currency: string;
	};
}

export default async function handler(
	req: CreatePaymentIntentRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).end("Method Not Allowed");
	}

	try {
		const { amount, currency } = req.body;

		// Validate the input
		if (!amount || !currency) {
			return res.status(400).json({ error: "Missing amount or currency" });
		}

		// Create a PaymentIntent with the specified amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount, // in smallest currency unit, e.g., cents for USD
			currency,
			automatic_payment_methods: { enabled: true },
		});

		res.status(200).json({ clientSecret: paymentIntent.client_secret });
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
}
