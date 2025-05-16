import type IProductResponse from "../api/response/IProductResponse";

export default interface IManagePlanApiResponse {
	statusCode: number;
	data: IProductResponse[];
}
