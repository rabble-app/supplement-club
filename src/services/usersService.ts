import { USER_ENDPOINTS } from "@/utils/endpoints";

import { apiRequest } from "@/utils/helpers";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type IUpcomingDeliveryModel from "@/utils/models/api/IUpcomingDeliveryModel";
import type { IUpcomingDeliveryResponse } from "@/utils/models/api/response/IUpcomingDeliveryResponse";
import type IUserPlanReponse from "@/utils/models/api/response/IUserPlanResponse";
import { mapSubscriptionModel, mapUpcomingDelivery } from "@/utils/utils";

export const usersService = {
	getUpcomingDeliveries: async (
		userId: string,
	): Promise<IUpcomingDeliveryModel[]> => {
		const { data } = await apiRequest(
			USER_ENDPOINTS.UPCOMING_DELIVERIES(userId),
			"GET",
		);
		return data?.map<IUpcomingDeliveryModel>(
			(item: IUpcomingDeliveryResponse) => mapUpcomingDelivery(item),
		);
	},

	updateDeliveryAddress: async (
		userId: string,
		channel: string,
		firstName: string,
		lastName: string,
		address: string,
		city: string,
		postalCode: string,
		country: string,
		phone: string,
	): Promise<IUpcomingDeliveryModel[]> => {
		const { data } = await apiRequest(USER_ENDPOINTS.DELIVERY_ADDRESS, "POST", {
			userId,
			channel,
			firstName,
			lastName,
			address,
			city,
			postalCode,
			country,
			phone,
		});
		return data; // Assuming additional mapping may not be necessary
	},

	async getSubscriptionPlans(userId: string) {
		const { data } = await apiRequest(
			USER_ENDPOINTS.SUBSCRIPTION_PLANS(userId),
			"GET",
		);
		return data?.map<IManagePlanModel>((r: IUserPlanReponse) =>
			mapSubscriptionModel(r),
		);
	},
};
