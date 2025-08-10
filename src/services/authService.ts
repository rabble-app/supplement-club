import { AUTH_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "@/utils/helpers";
import { IMetadata } from "@/utils/models/api/response/IUserResponse";

export const authService = {
	login: async (email: string, password: string) =>
		await apiRequest(AUTH_ENDPOINTS.LOGIN, "POST", {
			email,
			password,
			role: "USER",
		}),

	register: async (
		email: string,
		password: string,
		productId: string,
		teamId: string,
		summary: IMetadata,
		referralCode: string,
	) =>
		await apiRequest(AUTH_ENDPOINTS.REGISTER, "POST", {
			email,
			password,
			role: "USER",
			referralCode: referralCode,
			metadata: { ...summary, productId: productId, teamId: teamId },
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
