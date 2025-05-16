import type { IProductModel } from "../api/IProductModel";

export default interface ISingleManagePlanApiResponse {
	statusCode: number;
	data: IProductModel;
}
