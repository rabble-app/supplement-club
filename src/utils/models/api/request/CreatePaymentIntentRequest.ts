import type { NextApiRequest } from "next";

export interface CreatePaymentIntentRequest extends NextApiRequest {
	body: {
		amount: number;
		currency: string;
	};
}
