export default interface IPaymentIntentResponse {
	paymentIntentId: string;
	clientSecret: string;
	orderId?: string;
	status: string;
	payment_method?: string;
}
