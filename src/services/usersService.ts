import { USER_ENDPOINTS } from "@/utils/endpoints";

import { apiRequest } from "@/utils/helpers";
import type IManagePlanModel from "@/utils/models/IManagePlanModel";
import type IAddDeliveryAddressRequest from "@/utils/models/api/request/IAddDeliveryAddressRequest";
import type { IResponseModel } from "@/utils/models/api/response/IResponseModel";
import type IUserPastOrderReponse from "@/utils/models/api/response/IUserPastOrderReponse";
import type IDeliveryAddressApiResponse from "@/utils/models/services/IDeliveryAddressApiResponse";
import type IPastOrdersApiResponse from "@/utils/models/services/IPastOrdersApiResponse";
import type ISubscriptionPlanApiResponse from "@/utils/models/services/ISubscriptionPlanApiResponse";
import type ISubscriptionPlansApiResponse from "@/utils/models/services/ISubscriptionPlansApiResponse";
import type IUpcomingDeliveryApiResponse from "@/utils/models/services/IUpcomingDeliveryApiResponse";
import type IUserInfoApiResponse from "@/utils/models/services/IUserInfoApiResponse";
import {
	mapSubscriptionModel,
	mapUserInfoModel,
	mapUserPastOrder,
} from "@/utils/mapping";
import IAddBillingAddressRequest from "@/utils/models/api/request/IAddBillingAddressRequest";
import { IUpcomingDeliveryResponse } from "@/utils/models/api/response/IUpcomingDeliveryResponse";

export const usersService = {
	getUpcomingDeliveries: async (
		userId: string,
	): Promise<IUpcomingDeliveryResponse[]> => {
		const { data } = (await apiRequest(
			USER_ENDPOINTS.UPCOMING_DELIVERIES(userId),
			"GET",
		)) as IUpcomingDeliveryApiResponse;
		return data;
		
	},

	addDeliveryAddress: async (
		model: IAddDeliveryAddressRequest,
	): Promise<IResponseModel> => {
		const response = (await apiRequest(
			USER_ENDPOINTS.DELIVERY_ADDRESS,
			"POST",
			{
				userId: model.userId,
				channel: "SUPPLEMENT",
				firstName: model.firstName,
				lastName: model.lastName,
				address: model.address,
				address2: model.address2,
				city: model.city,
				postalCode: model.postalCode,
				country: model.country,
				phone: model.phone,
			},
		)) as IDeliveryAddressApiResponse;
		return response;
	},

	addBillingAddress: async (
		model: IAddBillingAddressRequest,
	): Promise<IResponseModel> => {
		const response = (await apiRequest(
			USER_ENDPOINTS.BILLING_ADDRESS,
			"PATCH",
			{
				addressLine1: model.addressLine1,
				addressLine2: model.addressLine2,
				city: model.city,
				postCode: model.postCode, 
				country: model.country,
			},
		)) as any;
		return response;
	},

	async getBillingAddress(userId: string) {
		const { data } = (await apiRequest(
			USER_ENDPOINTS.GET_BILLING_ADDRESS(userId),
			"GET",
		)) as any;
		return data;
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
		return data?.map<IUserPastOrderReponse>((r: IUserPastOrderReponse) =>
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
