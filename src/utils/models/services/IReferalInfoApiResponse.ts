import type IReferalInfoResponse from "../api/response/IReferalInfoResponse";

export default interface IReferalInfoApiResponse {
	statusCode: number;
	data: IReferalInfoResponse;
}
