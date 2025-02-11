import type { IProductTagResponse } from "../api/response/IProductTagResponse";

export default interface IProductTagsApiResponse {
	statusCode: number;
	data: IProductTagResponse[];
}
