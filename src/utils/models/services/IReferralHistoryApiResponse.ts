import type IReferralHistoryModel from "../IReferralHistoryModel";

export default interface IReferralHistoryApiResponse {
	statusCode: number;
	data: IReferralHistoryModel;
}
