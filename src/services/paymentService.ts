import { PAYMENT_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "@/utils/helpers";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import type IJoinTeamRequest from "@/utils/models/api/request/IJoinTeamRequest";
import type ITopUpSubscriptionRequest from "@/utils/models/api/request/ITopUpSubscriptionRequest";
import type IPaymentIntentResponse from "@/utils/models/api/response/IPaymentIntentResponse";
import type ISetupIntentResponse from "@/utils/models/api/response/ISetupIntentResponse";
import type IUserPaymentOptionResponse from "@/utils/models/api/response/IUserPaymentOptionResponse";
import type IPaymentIntentApiResponse from "@/utils/models/services/IPaymentIntentApiResponse";
import type ISetupIntentApiResponse from "@/utils/models/services/ISetupIntentApiResponse";
import type IUserPaymentOptionsApiResponse from "@/utils/models/services/IUserPaymentOptionsApiResponse";
import { mapUserPaymentOptionModel } from "@/utils/mapping";
import IMembershipSubscriptionApiResponse from "@/utils/models/services/IMembershipSubscriptionApiResponse";

export const paymentService = {
	addCard: async (paymentMethodId: string, stripeCustomerId: string) =>
		apiRequest(PAYMENT_ENDPOINTS.ADD_CARD, "POST", {
			paymentMethodId,
			stripeCustomerId,
		}),

	topUpSubscription: async (model: ITopUpSubscriptionRequest) =>
		apiRequest(PAYMENT_ENDPOINTS.SUBSCRIPTION_TOPUP, "POST", {
			amount: model.amount,
			teamId: model.teamId,
			paymentIntentId: model.paymentIntentId,
			userId: model.userId,
			productId: model.productId,
			quantity: model.quantity,
			capsulePerDay: model.capsulePerDay,
			price: model.price,
		}),

	updateSubscription: async (
		subscriptionId: string,
		quantity: number,
		capsulePerDay: number,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.UPDATE_SUBSCRIPTION(subscriptionId), "PATCH", {
			quantity,
			capsulePerDay,
		}),

	chargeUser: async (
		amount: number,
		currency: string,
		customerId: string,
		paymentMethodId: string,
		userId: string,
		teamId: string,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.CHARGE_USER, "POST", {
			amount,
			currency,
			customerId,
			paymentMethodId,
			userId,
			teamId,
		}),

	makeCardDefault: async (
		lastFourDigits: string,
		paymentMethodId: string,
		stripeCustomerId: string,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.MAKE_CARD_DEFAULT, "POST", {
			lastFourDigits,
			paymentMethodId,
			stripeCustomerId,
		}),

	deleteCard: async (paymentMethodId: string) =>
		apiRequest(PAYMENT_ENDPOINTS.REMOVE_CARD, "DELETE", {
			paymentMethodId,
		}),
	async setupIntent() {
		const response = (await apiRequest(
			PAYMENT_ENDPOINTS.SETUP_INTENT,
			"POST",
		)) as ISetupIntentApiResponse;
		return {
			clientSecret: response.data.client_secret,
		} as ISetupIntentResponse;
	},

	async joinTeam(model: IJoinTeamRequest) {
		const resonse = await apiRequest(PAYMENT_ENDPOINTS.JOIN_TEAM, "POST", {
			teamStatus: "ACTIVE",
			currency: "gbp",
			teamId: model.teamId,
			userId: model.userId,
			productId: model.productId,
			quantity: model.quantity,
			price: model.price,
			capsulePerDay: model.capsulePerDay,
			amount: model.amount,
			paymentMethodId: model.paymentMethodId,
			topupQuantity: model.topupQuantity,
		});

		return resonse;
	},

	async joinPreorderTeam(
		teamId: string,
		userId: string,
		productId: string,
		quantity: number,
		price: number,
		capsulePerDay: number,
	) {
		const resonse = await apiRequest(
			PAYMENT_ENDPOINTS.JOIN_PREORDER_TEAM,
			"POST",
			{
				teamStatus: "PREORDER",
				teamId,
				userId,
				productId,
				quantity,
				price,
				capsulePerDay,
			},
		);

		return resonse;
	},

	async createPaymentIntent(
		amount: number,
		currency: string,
		customerId: string,
	) {
		const { data } = (await apiRequest(
			PAYMENT_ENDPOINTS.PAYMENT_INTENT,
			"POST",
			{
				amount,
				currency,
				customerId,
			},
		)) as IPaymentIntentApiResponse;

		return {
			paymentIntentId: data.paymentIntentId,
			clientSecret: data.clientSecret,
		} as IPaymentIntentResponse;
	},

	async getUserPaymentOptions(id: string) {
		const { data } = (await apiRequest(
			PAYMENT_ENDPOINTS.GET_PAYMENT_OPTIONS(id),
			"GET",
		)) as IUserPaymentOptionsApiResponse;
		return data?.map<IUserPaymentOptionModel>((r: IUserPaymentOptionResponse) =>
			mapUserPaymentOptionModel(r),
		);
	},

	async getMembershipSubscription(id: string) {
		const { data } = (await apiRequest(
			PAYMENT_ENDPOINTS.MEMBERSHIP_SUBSCRIPTION(id),
			"GET",
		)) as IMembershipSubscriptionApiResponse;
		return data;
	},

	async updateMembershipStatus(
		userId: string,
		status: "ACTIVE" | "CANCELED",
	) {
		const { data } = (await apiRequest(
			PAYMENT_ENDPOINTS.UPDATE_MEMBERSHIP_STATUS(userId),
			"PATCH",
			{
				status,
			},
		)) as IMembershipSubscriptionApiResponse;

		return {
			status: data.status,
			expiryDate: data.expiryDate,
		} as {
			status: "ACTIVE" | "CANCELED";
			expiryDate: string;
		};
	},
};
