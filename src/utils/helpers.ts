import Cookies from "js-cookie";

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const apiRequest = async <IResponseModel>(
	endpoint: string,
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
	data?: Record<string, string | unknown[] | boolean | number>,
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
		};
	}
};

export function mapTagsToValues(tags: string[]) {
	const tagValueMap: { [key: string]: string } = {
		"Improve Cellular Health": "/images/icons/water-drop-icon.svg",
		"Cognitive function": "/images/icons/brain-icon.svg",
		"Most Popular": "/images/icons/shield-icon.svg",
		"Strengthen Immunity and Resilience": "/images/icons/heart-pulse-icon.svg",
		"Women’s Health": "/images/icons/hourglass-icon.svg",
		"Reduce Oxidative Stress": "/images/icons/heart-pulse-icon.svg",
		"Improve Digestion": "/images/icons/heart-pulse-icon.svg",
		"Athletes & Weight Trainers": "/images/icons/heart-pulse-icon.svg",
		"Enhance Recovery": "/images/icons/heart-pulse-icon.svg",
		"Build Strength and Endurance": "/images/icons/heart-pulse-icon.svg",
		"North East": "/images/icons/heart-pulse-icon.svg",
		"Age Gracefully and Healthily": "/images/icons/heart-pulse-icon.svg",
		"Strengthen Joints and Skin": "/images/icons/heart-pulse-icon.svg",
		"Improve Physical Performance and Recovery":
			"/images/icons/heart-pulse-icon.svg",
		"Improve Emotional Regulation": "/images/icons/heart-pulse-icon.svg",
		Fetility: "/images/icons/heart-pulse-icon.svg",
		"Boost Focus and Memory": "/images/icons/heart-pulse-icon.svg",
		"Support Daily Wellness": "/images/icons/heart-pulse-icon.svg",
		"Neurodivergent Support": "/images/icons/heart-pulse-icon.svg",
		"Reduce Anxiety and Stress": "/images/icons/heart-pulse-icon.svg",
		"Boost Mitochondrial Function": "/images/icons/heart-pulse-icon.svg",
		"Support Hormonal Health": "/images/icons/heart-pulse-icon.svg",

		Fertility: "/images/icons/baby-icon.svg",
		"Enhance Energy and Vitality": "/images/icons/energy-icon.svg",
		"Healthy Aging": "/images/icons/hourglass-icon.svg",
		Longevity: "/images/icons/tree-icon.svg",
		"Longevity Enthusiasts": "/images/icons/tree-icon.svg",
		"Weight Training": "/images/icons/dumbell-icon.svg",
		Athletics: "/images/icons/athletes-icon.svg",
		Immunity: "/images/icons/shield-icon.svg",
		"Cognitive Function": "/images/icons/brain-icon.svg",
		"Skin Health": "/images/icons/water-drop-icon.svg",
		"Mood and Anxiety": "/images/icons/flower-icon.svg",
		"Gut Health": "/images/icons/intensine-icon.svg",
		"Joint Health": "/images/icons/bones-icon.svg",
		"Promote Relaxation and Sleep": "/images/icons/bed-icon.svg",
		Sleep: "/images/icons/bed-icon.svg",
		"Heart Health": "/images/icons/heart-pulse-icon.svg",
	};

	type TagKeys = keyof typeof tagValueMap;

	return tags.reduce<string[]>((acc, tag: TagKeys) => {
		acc.push(tagValueMap[tag]);
		return acc;
	}, []);
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
