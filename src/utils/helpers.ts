import Cookies from "js-cookie";
import type IProductCardModel from "./models/IProductCardModel";
import type ISingleProductModel from "./models/ISingleProductModel";
import type { IProductModel } from "./models/api/IProductModel";
import type IProductResponse from "./models/api/response/IProductResponse";

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const mapProductModel = (model: IProductResponse): IProductCardModel => {
	return {
		id: model.product?.id,
		isComming: model.status === "PREORDER",
		status: model.status,
		name: model.product?.name,
		teamName: model.team?.name,
		subscribers: model.team?._count.members,
		description: model.product?.description,
		wholesalePrice: model.product?.wholesalePrice,
		imageUrl: model.product?.imageUrl,
		price: model.product?.price,
		imageKey: model.product.imageKey,
		rrp: model.product?.rrp,
		tags: model.product?.tags,
		producer: model.product?.producer,
		formulationSummary: model.product?.formulationSummary,
	};
};

export const mapSingleProductModel = (
	model: IProductModel,
): ISingleProductModel => {
	return {
		id: model.id,
		isComming: model.supplementTeamProducts.status === "PREORDER",
		status: model.status,
		imageKey: model.imageKey,
		name: model.name,
		teamName: model.producer?.businessName,
		description: model.description,
		wholesalePrice: model.wholesalePrice,
		capsuleInfo: model.capsuleInfo,
		imageUrl: model.imageUrl,
		price: model.price,
		rrp: model.rrp,
		tags: model.tags,
		producer: model.producer,
		formulationSummary: model.formulationSummary,
		gallery: [model.imageUrl, model.producer.imageUrl],
	};
};

export const apiRequest = async <T>(
	endpoint: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	data?: Record<string, string | unknown[] | boolean | number>,
): Promise<T | { error: string }> => {
	const headers: { "Content-Type": string; Authorization?: string } = {
		"Content-Type": "application/json",
	};

	const session = Cookies.get("session") || null;
	if (session) {
		const obj = JSON.parse(session);
		headers.Authorization = `Bearer ${obj.state.user.token}`;
	}
	try {
		const res = await fetch(`${API_ENDPOINT}/${endpoint}`, {
			method,
			headers,
			body: method !== "GET" ? JSON.stringify(data) : undefined,
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(JSON.stringify(errorData));
		}

		return await res.json();
	} catch (e) {
		return {
			error: e instanceof Error ? e.message : "An unknown error occurred",
		};
	}
};

export function mapTagsToValues(tags: string[]) {
	const tagValueMap: { [key: string]: string } = {
		"Improve Cellular Health": "/images/icons/water-drop-icon.svg",
		"Cognitive function": "/images/icons/brain-icon.svg",
		Longevity: "/images/icons/tree-icon.svg",
		"Women’s Health": "/images/icons/hourglass-icon.svg",
		"Weight Training": "/images/icons/dumbell-icon.svg",
		"Most Popular": "/images/icons/shield-icon.svg",
		"Heart Health": "/images/icons/heart-pulse-icon.svg",

		Athletics: "/images/icons/athletes-icon.svg",
		Fertility: "/images/icons/baby-icon.svg",
		Sleep: "/images/icons/bed-icon.svg",
	};

	type TagKeys = keyof typeof tagValueMap;

	return tags.reduce<string[]>((acc, tag: TagKeys) => {
		acc.push(tagValueMap[tag]);
		return acc;
	}, []);
}
