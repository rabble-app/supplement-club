import { PAYMENT_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "@/utils/helpers";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import type IPaymentBasketActiveRequest from "@/utils/models/api/request/IPaymentBasketActiveRequest";
import type ITopUpSubscriptionRequest from "@/utils/models/api/request/ITopUpSubscriptionRequest";
import type IPaymentIntentResponse from "@/utils/models/api/response/IPaymentIntentResponse";
import type ISetupIntent from "@/utils/models/api/response/ISetupIntent";
import type ISetupIntentResponse from "@/utils/models/api/response/ISetupIntentResponse";
import type IUserPaymentOptionResponse from "@/utils/models/api/response/IUserPaymentOptionResponse";
import type IPaymentIntentApiResponse from "@/utils/models/services/IPaymentIntentApiResponse";
import type IUserPaymentOptionsApiResponse from "@/utils/models/services/IUserPaymentOptionsApiResponse";
import { mapUserPaymentOptionModel } from "@/utils/utils";

export const paymentService = {
	addCard: async (paymentMethodId: string, stripeCustomerId: string) =>
		apiRequest(PAYMENT_ENDPOINTS.ADD_CARD, "POST", {
			paymentMethodId,
			stripeCustomerId,
		}),

	addCapturePayment: async (
		amount: number,
		teamId: string,
		paymentIntentId: string,
		userId: string,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.CAPTURE_PAYMENT, "POST", {
			amount,
			teamId,
			paymentIntentId,
			userId,
		}),

	addPaymentIntent: async (
		amount: number,
		currency: string,
		customerId: string,
		paymentMethodId: string,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.PAYMENT_INTENT, "POST", {
			amount,
			currency,
			customerId,
			paymentMethodId,
		}),

	addPreorderBulkBasket: async (
		teamId: string,
		userId: string,
		productId: string,
		quantity: number,
		price: number,
		capsulePerDay: number,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.PREORDER_BASKET, "POST", {
			teamId,
			userId,
			productId,
			quantity,
			price,
			capsulePerDay,
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

	paymentBasketActive: async (model: IPaymentBasketActiveRequest) =>
		apiRequest(PAYMENT_ENDPOINTS.PAYMENT_BASKET_ACTIVE, "POST", {
			orderId: model.orderId,
			teamId: model.teamId,
			topupQuantity: model.topupQuantity,
			userId: model.userId,
			productId: model.productId,
			quantity: model.quantity,
			capsulePerDay: model.capsulePerDay,
			price: model.price,
		}),

	paymentBasketPreOrder: async (
		teamId: string,
		userId: string,
		productId: string,
		quantity: string,
		capsulePerDay: string,
		price: string,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.PAYMENT_BASKET_PREORDER, "POST", {
			teamId,
			userId,
			productId,
			quantity,
			capsulePerDay,
			price,
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

	capturePayment: async (
		amount: string,
		paymentMethodId: string,
		userId: string,
		teamId: string,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.CAPTURE_PAYMENT, "POST", {
			amount,
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
		const response = await apiRequest(PAYMENT_ENDPOINTS.SETUP_INTENT, "POST");
		const data = response as ISetupIntent;
		return {
			clientSecret: data.client_secret,
		} as ISetupIntentResponse;
	},

	async createPaymentIntent(
		amount: number,
		currency: string,
		customerId: string,
		paymentMethodId: string,
	) {
		const { data } = (await apiRequest(
			PAYMENT_ENDPOINTS.PAYMENT_INTENT,
			"POST",
			{
				amount,
				currency,
				customerId,
				paymentMethodId,
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
};
