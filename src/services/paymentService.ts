import { PAYMENT_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "@/utils/helpers";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import type IPaymentIntentResponse from "@/utils/models/api/response/IPaymentIntentResponse";
import type IUserPaymentOptionResponse from "@/utils/models/api/response/IUserPaymentOptionResponse";
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

	topUpSubscription: async (
		amount: number,
		teamId: string,
		paymentIntentId: string,
		userId: string,
		productId: string,
		quantity: number,
		capsulePerDay: number,
		price: number,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.SUBSCRIPTION_TOPUP, "POST", {
			amount,
			teamId,
			paymentIntentId,
			userId,
			productId,
			quantity,
			capsulePerDay,
			price,
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

	paymentBasketActive: async (
		orderId: string,
		teamId: string,
		topupQuantity: string,
		userId: string,
		productId: string,
		quantity: string,
		capsulePerDay: string,
		price: string,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.PAYMENT_BASKET_ACTIVE, "POST", {
			orderId,
			teamId,
			topupQuantity,
			userId,
			productId,
			quantity,
			capsulePerDay,
			price,
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

	async createPaymentIntent(
		amount: number,
		currency: string,
		customerId: string,
		paymentMethodId: string,
	) {
		const { data } = await apiRequest(
			PAYMENT_ENDPOINTS.PAYMENT_INTENT,
			"POST",
			{
				amount,
				currency,
				customerId,
				paymentMethodId,
			},
		);
		return {
			paymentIntentId: data.paymentIntentId,
			clientSecret:
				data.clientSecret ||
				"pi_3Qo2PaLOm4z6Mbsx02aFD8X5_secret_KXf1CadD3fuhfkA13wGRtdskv",
		} as IPaymentIntentResponse;
	},

	async getUserPaymentOptions(id: string) {
		const { data } = await apiRequest(
			PAYMENT_ENDPOINTS.GET_PAYMENT_OPTIONS(id),
			"GET",
		);
		return data?.map<IUserPaymentOptionModel>((r: IUserPaymentOptionResponse) =>
			mapUserPaymentOptionModel(r),
		);
	},
};
