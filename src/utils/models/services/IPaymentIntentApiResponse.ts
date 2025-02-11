import type IPaymentIntentResponse from "../api/response/IPaymentIntentResponse";

export default interface IPaymentIntentApiResponse {
	statusCode: number;
	data: IPaymentIntentResponse;
}
