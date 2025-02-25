import { AUTH_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "@/utils/helpers";

export const authService = {
	login: async (email: string, password: string) =>
		await apiRequest(AUTH_ENDPOINTS.LOGIN, "POST", {
			email,
			password,
			role: "USER",
		}),

	register: async (email: string, password: string) =>
		await apiRequest(AUTH_ENDPOINTS.REGISTER, "POST", {
			email,
			password,
			role: "USER",
			referralCode: "1233444",
		}),

	resetPassword: async (email: string) =>
		await apiRequest(AUTH_ENDPOINTS.RESET_PASSWORD, "POST", {
			email,
			role: "USER",
		}),

	emailVerify: async (token: string) =>
		await apiRequest(AUTH_ENDPOINTS.EMAIL_VERIFY, "POST", {
			token,
			role: "USER",
		}),

	resendEmailVerify: async (email: string) =>
		await apiRequest(AUTH_ENDPOINTS.RESEND_EMAIL_VERIFY, "POST", {
			email,
			role: "USER",
		}),

	changePassword: async (newPassword: string, token: string) =>
		await apiRequest(AUTH_ENDPOINTS.CHANGE_PASSWORD, "POST", {
			newPassword,
			token,
			channel: "PASSWORD_RESET",
		}),
};
