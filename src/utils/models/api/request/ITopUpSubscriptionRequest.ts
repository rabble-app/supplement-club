export default interface ITopUpSubscriptionRequest {
	amount: number;
	teamId: string;
	paymentIntentId: string;
	userId: string;
	productId: string;
	quantity: number;
	capsulePerDay: number;
	price: number;
}
