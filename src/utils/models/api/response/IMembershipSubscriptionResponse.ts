export default interface IMembershipSubscriptionResponse {
	subscriptionId: string;
	subscriptionName: string;
	subscriptionPrice: number;
	subscriptionStatus: string;
	subscriptionStartDate: string;
	subscriptionEndDate: string;
	subscriptionDiscount: number;
	subscriptionRRP: number;
	expiryDate: string;
	subscriptionAmount: number;
	status: "ACTIVE" | "CANCELED";
}