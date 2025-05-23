import { z } from "zod";

export const deliveryAddressSchema = z.object({
	firstName: z.string({ required_error: "Field is required." }),
	lastName: z.string({ required_error: "Field is required." }),
	address: z.string({ required_error: "Field is required." }),
	address2: z.string({ required_error: "Field is required." }).optional(),
	city: z.string({ required_error: "Field is required." }),
	postalCode: z.string({ required_error: "Field is required." }),
	country: z.string({ required_error: "Field is required." }),
	mobileNumber: z.string({ required_error: "Field is required." }),
});

export const shippingDetailsShema = z.object({
	address: z.string({ required_error: "Field is required." }),
	address2: z.string({ required_error: "Field is required." }),
	buildingNo: z.string().optional(),
	city: z.string({ required_error: "Field is required." }),
	postalCode: z.string({ required_error: "Field is required." }),
	country: z.string({ required_error: "Field is required." }),
	userId: z.string({ required_error: "Field is required." }).optional(),
});

export const emailChangeDialogSchema = z.object({
	email: z
		.string({ required_error: "Field is required." })
		.email({ message: "Invalid email address." })
		.optional(),
	firstName: z.string({ required_error: "Field is required." }),
	lastName: z.string({ required_error: "Field is required." }),
});

export const createAccountSchema = z.object({
	email: z
		.string({ required_error: "Field is required." })
		.email({ message: "Invalid email address." }),
	password: z.string({ required_error: "Field is required." }),
	role: z.string({ required_error: "Field is required." }).default("USER"),
});
