import type IUserPlanReponse from "../api/response/IUserPlanResponse";

export default interface ISubscriptionPlanApiResponse {
	statusCode: number;
	data: IUserPlanReponse;
}
