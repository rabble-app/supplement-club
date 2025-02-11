import type IReferalResponse from "../api/response/IReferalResponse";

export default interface IRewardsApiResponse {
	statusCode: number;
	data: IReferalResponse[];
}
