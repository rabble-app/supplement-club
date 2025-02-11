import type IUserPlanReponse from "../api/response/IUserPlanResponse";

export default interface ISubscriptionPlansApiResponse {
	statusCode: number;
	data: IUserPlanReponse[];
}
