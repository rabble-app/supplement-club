import { PAYMENT_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "@/utils/helpers";
import type IUserPaymentOptionModel from "@/utils/models/api/IUserPaymentOptionModel";
import type { IBasketRequest } from "@/utils/models/api/request/IBasketRequest";
import type IUserPaymentOptionResponse from "@/utils/models/api/response/IUserPaymentOptionResponse";
import { mapUserPaymentOptionModel } from "@/utils/utils";

export const paymentService = {
	addCard: async (paymentMethodId: string, stripeCustomerId: string) =>
		apiRequest(PAYMENT_ENDPOINTS.ADD_CARD, "POST", {
			paymentMethodId,
			stripeCustomerId,
		}),

	addBulkBasket: async (
		baskets: IBasketRequest[],
		quateamIdtity: string,
		deadlineReached: boolean,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.BULK_BASKET, "POST", {
			baskets,
			quateamIdtity,
			deadlineReached,
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

	chargeUser: async (
		amount: string,
		currency: string,
		customerId: string,
		paymentMethodId: string,
	) =>
		apiRequest(PAYMENT_ENDPOINTS.CHARGE_HOST, "POST", {
			amount,
			currency,
			customerId,
			paymentMethodId,
		}),

	topUpSubscription: async (
		amount: string,
		teamId: string,
		paymentIntentId: string,
		userId: string,
		productId: string,
		quantity: string,
		capsulePerDay: number,
		price: string,
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

	chargeUsers: async (
		amount: string,
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
