import Cookies from "js-cookie";
import type { IResponseModel } from "./models/api/response/IResponseModel";

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const apiRequest = async <T>(
	endpoint: string,
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
	data?: Record<string, string | boolean | number | object>,
): Promise<T | { error: string }> => {
	const headers: { "Content-Type": string; Authorization?: string } = {
		"Content-Type": "application/json",
	};

	const session = Cookies.get("session") || null;
	if (session) {
		const obj = JSON.parse(session);
		if (obj.state?.user?.token) {
			headers.Authorization = `Bearer ${obj.state.user.token}`;
		}
	}
	try {
		const res = await fetch(`${API_ENDPOINT}/${endpoint}`, {
			method,
			headers,
			body: method !== "GET" ? JSON.stringify(data) : undefined,
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(JSON.stringify(errorData));
		}

		return (await res.json()) as IResponseModel;
	} catch (e) {
		return {
			error: e instanceof Error ? e.message : "An unknown error occurred",
		} as IResponseModel;
	}
};

export function mapTagToValue(tag: string) {
	const tagValueMap: { [key: string]: string } = {
		"Heart Health": "/images/icons/heart-pulse-icon.svg",
		"Aging (40+)": "/images/icons/aging.svg",
		Fertility: "/images/icons/baby-icon.svg",
		Sleep: "/images/icons/bed-icon.svg",
		Energy: "/images/icons/energy-icon.svg",
		"Anti-Aging": "/images/icons/hourglass-icon.svg",
		"Healthy Aging": "/images/icons/hourglass-icon.svg",
		Longevity: "/images/icons/tree-icon.svg",
		"Training/Athletics": "/images/icons/dumbell-icon.svg",
		"Weight Training": "/images/icons/dumbell-icon.svg",
		Athletes: "/images/icons/athletes-icon.svg",
		Immunity: "/images/icons/shield-icon.svg",
		"Cognitive Function": "/images/icons/brain-icon.svg",
		"Joint Health": "/images/icons/bones-icon.svg",
		"Gut Health": "/images/icons/intensine-icon.svg",
		"Skin Health": "/images/icons/water-drop-icon.svg",
		"Mood & Anxiety": "/images/icons/flower-icon.svg",
		"Brain Health": "/images/icons/brain-icon.svg",
		"Energy and Fatigue": "/images/icons/energy-icon.svg",
		"Energy & Fatigue": "/images/icons/energy-icon.svg",
		"Muscle Recovery": "/images/icons/dumbell-icon.svg",
		Athletics: "/images/icons/athletes-icon.svg",
	};

	return tagValueMap[tag] ?? null;
}

export const mapFormDataToDeliveryRequest = (formData: FormData) => ({
	userId: formData.get("userId")?.toString() ?? "",
	channel: "SUPPLEMENT",
	firstName: formData.get("firstName")?.toString() ?? "",
	lastName: formData.get("lastName")?.toString() ?? "",
	address: `${formData.get("address1")?.toString() ?? ""} ${
		formData.get("address2")?.toString() ?? ""
	}`.trim(),
	city: formData.get("city")?.toString() ?? "",
	postalCode: formData.get("postcode")?.toString() ?? "",
	country: formData.get("country")?.toString() ?? "",
	phone: formData.get("mobileNumber")?.toString() ?? "",
});
