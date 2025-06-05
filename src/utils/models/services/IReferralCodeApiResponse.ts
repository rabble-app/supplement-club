import IReferralCodeResponse from "../api/response/IReferralCodeResponse";

export default interface IReferralCodeApiResponse {
	statusCode: number;
	data: IReferralCodeResponse;
}
