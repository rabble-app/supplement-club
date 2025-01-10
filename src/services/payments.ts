import { apiRequest } from "@/utils/helpers";
import type { IBasketRequest } from "@/utils/models/api/request/IBasketRequest";

export const addCard = async (
	cardNumber: string,
	expiringMonth: string,
	expiringYear: string,
	cvc: string,
	stripeCustomerId: string,
) =>
	await apiRequest("payments/add-card", "POST", {
		cardNumber,
		expiringMonth,
		expiringYear,
		cvc,
		stripeCustomerId,
	});

export const addBulkBasket = async (
	baskets: IBasketRequest[],
	quateamIdtity: string,
	deadlineReached: boolean,
) =>
	await apiRequest("payments/basket-bulk", "POST", {
		baskets,
		quateamIdtity,
		deadlineReached,
	});

export const addPreorderBulkBasket = async (
	teamId: string,
	userId: string,
	productId: string,
	quantity: number,
	price: number,
	capsulePerDay: number,
) =>
	await apiRequest("payments/basket", "POST", {
		teamId,
		userId,
		productId,
		quantity,
		price,
		capsulePerDay,
	});

export const chargeUser = async (
	amount: string,
	currency: string,
	customerId: string,
	paymentMethodId: string,
) =>
	await apiRequest("payments/charge-host", "POST", {
		amount,
		currency,
		customerId,
		paymentMethodId,
	});
