import { z } from "zod";

export const paymentCardSchema = z.object({
	cardNumber: z
		.string()
		.regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
	terms: z.boolean(),
});
