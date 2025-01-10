import type { IProductModel } from "../IProductModel";

export interface ISingleProductResponse {
	statusCode?: number;
	message?: string;
	data?: IProductModel;
}
