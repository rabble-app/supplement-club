import { USER_ENDPOINTS } from "@/utils/endpoints";

import { apiRequest } from "@/utils/helpers";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type IUserPastOrderModel from "@/utils/models/IUserPastOrderModel";
import type IUpcomingDeliveryModel from "@/utils/models/api/IUpcomingDeliveryModel";
import type { IResponseModel } from "@/utils/models/api/response/IResponseModel";
import type { IUpcomingDeliveryResponse } from "@/utils/models/api/response/IUpcomingDeliveryResponse";
import type IUserPastOrderReponse from "@/utils/models/api/response/IUserPastOrderReponse";
import type IUserPlanReponse from "@/utils/models/api/response/IUserPlanResponse";
import {
	mapSubscriptionModel,
	mapUpcomingDelivery,
	mapUserInfoModel,
	mapUserPastOrder,
} from "@/utils/utils";

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

	addDeliveryAddress: async (
		userId: string,
		channel: string,
		firstName: string,
		lastName: string,
		address: string,
		address2: string,
		city: string,
		postalCode: string,
		country: string,
		phone: string,
	): Promise<IResponseModel> => {
		const response = await apiRequest(USER_ENDPOINTS.DELIVERY_ADDRESS, "POST", {
			userId,
			channel,
			firstName,
			lastName,
			address,
			address2,
			city,
			postalCode,
			country,
			phone,
		});
		return response; // Assuming additional mapping may not be necessary
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

	async getSubscriptionPlan(userId: string) {
		const { data } = await apiRequest(
			USER_ENDPOINTS.SUBSCRIPTION_PLAN(userId),
			"GET",
		);
		return mapSubscriptionModel(data);
	},

	async getUserInfo(userId: string) {
		const { data } = await apiRequest(USER_ENDPOINTS.INFO(userId), "GET");
		return mapUserInfoModel(data);
	},

	async getPastOrders(userId: string) {
		const { data } = await apiRequest(
			USER_ENDPOINTS.PAST_ORDERS(userId),
			"GET",
		);
		return data?.map<IUserPastOrderModel>((r: IUserPastOrderReponse) =>
			mapUserPastOrder(r),
		);
	},

	updateUserInfo: async (firstName: string, lastName: string) =>
		apiRequest(USER_ENDPOINTS.UPDATE_INFO, "PATCH", {
			firstName,
			lastName,
		}),

	updateShippingInfo: async (
		userId: string,
		address: string,
		address2: string,
		buildingNo: string,
		city: string,
		country: string,
		postalCode: string,
	) =>
		apiRequest(USER_ENDPOINTS.UPDATE_SHIPPING(userId), "PATCH", {
			address,
			address2,
			buildingNo,
			city,
			country,
			postalCode,
		}),
};
