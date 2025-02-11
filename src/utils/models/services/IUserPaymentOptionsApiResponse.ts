import type IUserPaymentOptionResponse from "../api/response/IUserPaymentOptionResponse";

export default interface IUserPaymentOptionsApiResponse {
	statusCode: number;
	data: IUserPaymentOptionResponse[];
}
