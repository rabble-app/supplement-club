import type { IUserResponse } from "../api/response/IUserResponse";

export default interface IUserInfoApiResponse {
	statusCode: number;
	data: IUserResponse;
}
