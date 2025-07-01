export default interface IJoinTeamRequest {
	teamId: string;
	userId: string;
	productId: string;
	quantity: number;
	price: number;
	capsulePerDay: number;
	amount: number;
	paymentMethodId: string;
	topupQuantity: number;
	// pricePerCount: number;
	// discount: number;
}
