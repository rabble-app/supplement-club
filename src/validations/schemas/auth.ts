import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string({ required_error: "Field is required." })
		.email({ message: "Invalid email address." }),
	password: z.string({ required_error: "Field is required." }),
	role: z.string().default("USER"),
});

export const forgotPasswordSchema = z.object({
	email: z
		.string({ required_error: "Field is required." })
		.email({ message: "Invalid email address." }),
});

export const changePasswordSchema = z
	.object({
		password: z.string({ required_error: "Field is required." }),
		confirmPassword: z.string({ required_error: "Field is required." }),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				path: ["confirmPassword"],
			});
		}
	});
