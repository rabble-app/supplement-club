export default interface IPaymentBasketActiveRequest {
	orderId: string;
	teamId: string;
	topupQuantity: number;
	userId: string;
	productId: string;
	quantity: number;
	capsulePerDay: number;
	price: number;
}
