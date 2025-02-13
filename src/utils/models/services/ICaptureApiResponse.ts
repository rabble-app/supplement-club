import type IPaymentIntentResponse from "../api/response/IPaymentIntentResponse";

export default interface ICaptureApiResponse {
	statusCode: number;
	error?: string;
	data: IPaymentIntentResponse;
}
