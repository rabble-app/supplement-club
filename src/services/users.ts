import { apiRequest } from "@/utils/helpers";

export async function deliveryAddress(formData: FormData) {
	return await apiRequest("users/delivery-address", "POST", {
		userId: formData.get("userId")?.toString() ?? "",
		channel: "SUPPLEMENT",
		firstName: formData.get("firstName")?.toString() ?? "",
		lastName: formData.get("lastName")?.toString() ?? "",
		address: `${formData.get("address1")?.toString()} ${formData.get("address2")?.toString()}`,
		city: formData.get("city")?.toString() ?? "",
		postalCode: formData.get("postcode")?.toString() ?? "",
		country: formData.get("country")?.toString() ?? "",
		phone: formData.get("mobileNumber")?.toString() ?? "",
	});
}

export const getUserSubscriptionsPlans = async (userId: string) =>
	await apiRequest(`users/subscription/${userId}`, "GET");
