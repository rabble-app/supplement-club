import type ISetupIntent from "../api/response/ISetupIntent";

export default interface ISetupIntentApiResponse {
	statusCode: number;
	data: ISetupIntent;
}
