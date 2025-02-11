import { USER_ENDPOINTS } from "@/utils/endpoints";

import { apiRequest } from "@/utils/helpers";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type IUserPastOrderModel from "@/utils/models/IUserPastOrderModel";
import type IUpcomingDeliveryModel from "@/utils/models/api/IUpcomingDeliveryModel";
import type { IResponseModel } from "@/utils/models/api/response/IResponseModel";
import type { IUpcomingDeliveryResponse } from "@/utils/models/api/response/IUpcomingDeliveryResponse";
import type IUserPastOrderReponse from "@/utils/models/api/response/IUserPastOrderReponse";
import type IDeliveryAddressApiResponse from "@/utils/models/services/IDeliveryAddressApiResponse";
import type IPastOrdersApiResponse from "@/utils/models/services/IPastOrdersApiResponse";
import type ISubscriptionPlanApiResponse from "@/utils/models/services/ISubscriptionPlanApiResponse";
import type ISubscriptionPlansApiResponse from "@/utils/models/services/ISubscriptionPlansApiResponse";
import type IUserInfoApiResponse from "@/utils/models/services/IUserInfoApiResponse";
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
		const response = await apiRequest(
			USER_ENDPOINTS.UPCOMING_DELIVERIES(userId),
			"GET",
		);
		const data = response as IUpcomingDeliveryResponse[];
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
		const response = (await apiRequest(
			USER_ENDPOINTS.DELIVERY_ADDRESS,
			"POST",
			{
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
			},
		)) as IDeliveryAddressApiResponse;
		return response;
	},

	async getSubscriptionPlans(userId: string) {
		const { data } = (await apiRequest(
			USER_ENDPOINTS.SUBSCRIPTION_PLANS(userId),
			"GET",
		)) as ISubscriptionPlansApiResponse;
		return data.map<IManagePlanModel>((r) => mapSubscriptionModel(r));
	},

	async getSubscriptionPlan(userId: string) {
		const { data } = (await apiRequest(
			USER_ENDPOINTS.SUBSCRIPTION_PLAN(userId),
			"GET",
		)) as ISubscriptionPlanApiResponse;
		return mapSubscriptionModel(data);
	},

	async getUserInfo(userId: string) {
		const { data } = (await apiRequest(
			USER_ENDPOINTS.INFO(userId),
			"GET",
		)) as IUserInfoApiResponse;
		return mapUserInfoModel(data);
	},

	async getPastOrders(userId: string) {
		const { data } = (await apiRequest(
			USER_ENDPOINTS.PAST_ORDERS(userId),
			"GET",
		)) as IPastOrdersApiResponse;
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
