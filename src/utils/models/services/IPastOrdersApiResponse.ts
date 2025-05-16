import type IUserPastOrderReponse from "../api/response/IUserPastOrderReponse";

export default interface IPastOrdersApiResponse {
	statusCode: number;
	data: IUserPastOrderReponse[];
}
