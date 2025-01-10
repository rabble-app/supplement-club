import { apiRequest } from "@/utils/helpers";

export const getProductsLimit = async (limit: number) =>
	await apiRequest(`products/supplement/list?limit=${limit}`, "GET");

export const getProduct = async (id: string) =>
	await apiRequest(`products/${id}`, "GET");

export const getProducts = async () =>
	await apiRequest("products/supplement/list", "GET");

export const getProductsTags = async () =>
	await apiRequest("products/supplement/tags", "GET");
