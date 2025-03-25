import { PRODUCT_ENDPOINTS } from "@/utils/endpoints";

import { apiRequest } from "@/utils/helpers";
import type IProductCardModel from "@/utils/models/IProductCardModel";
import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import type IProductResponse from "@/utils/models/api/response/IProductResponse";
import type { IProductTagResponse } from "@/utils/models/api/response/IProductTagResponse";
import type IManagePlanApiResponse from "@/utils/models/services/IManagePlanApiResponse";
import type IProductTagsApiResponse from "@/utils/models/services/IProductTagsApiResponse";
import type ISingleManagePlanApiResponse from "@/utils/models/services/ISingleManagePlanApiResponse";
import { mapProductModel, mapSingleProductModel } from "@/utils/utils";

export const productService = {
	product: async (id: string): Promise<ISingleProductModel> => {
		const { data } = (await apiRequest(
			PRODUCT_ENDPOINTS.PRODUCT(id),
			"GET",
		)) as ISingleManagePlanApiResponse;
		return data && mapSingleProductModel(data);
	},
	products: async (userId?: string): Promise<IProductCardModel[]> => {
		const { data } = (await apiRequest(
			PRODUCT_ENDPOINTS.PRODUCTS(userId),
			"GET",
		)) as IManagePlanApiResponse;
		return data?.map<IProductCardModel>((r: IProductResponse) =>
			mapProductModel(r),
		);
	},
	productsLimit: async (limit: number): Promise<IProductCardModel[]> => {
		const { data } = (await apiRequest(
			PRODUCT_ENDPOINTS.PRODUCTS_LIMIT(limit),
			"GET",
		)) as IManagePlanApiResponse;
		return data?.map<IProductCardModel>((r: IProductResponse) =>
			mapProductModel(r),
		);
	},

	productTags: async (): Promise<IProductTagResponse[]> => {
		const { data } = (await apiRequest(
			PRODUCT_ENDPOINTS.PRODUCTTAGS(),
			"GET",
		)) as IProductTagsApiResponse;
		return data;
	},
};
