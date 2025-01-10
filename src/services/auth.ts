"use server";
import { apiRequest } from "@/utils/helpers";
import type { IResponseModel } from "@/utils/models/api/response/IResponseModel";

const handleAuth = async (endpoint: string, e: FormData) => {
	const response = (await apiRequest(endpoint, "POST", {
		email: e.get("email")?.toString() ?? "",
		password: e.get("password")?.toString() ?? "",
		role: e.get("role")?.toString() ?? "USER",
	})) as IResponseModel;

	return response;
};

export const login = async (e: FormData) => await handleAuth("auth/login", e);

export const register = async (e: FormData) =>
	await handleAuth("auth/register", e);
export const resetPassword = async (emailOrFormData: string | FormData) => {
	const email =
		typeof emailOrFormData === "string"
			? emailOrFormData
			: (emailOrFormData.get("email")?.toString() ?? "");
	return await apiRequest("auth/send-reset-password-link", "POST", { email });
};

export const verifyEmail = async (token: string) =>
	await apiRequest("auth/email-verification", "POST", { token });

export const resendEmailVerification = async (email: string) =>
	await apiRequest("auth/resend-email-verification", "POST", { email });

// missed
export const changePassword = async (e: FormData) =>
	await apiRequest("auth/change-password", "POST", {
		channel: "PASSWORD_RESET",
		password: e.get("password")?.toString() ?? "",
	});
