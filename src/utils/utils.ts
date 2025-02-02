import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type IManagePlanModel from "./models/IManagePlanModel";
import type IProductCardModel from "./models/IProductCardModel";
import type ISingleProductModel from "./models/ISingleProductModel";
import type IUserPastOrderModel from "./models/IUserPastOrderModel";
import type { IProductModel } from "./models/api/IProductModel";
import type IUpcomingDeliveryModel from "./models/api/IUpcomingDeliveryModel";
import type IUserModel from "./models/api/IUserModel";
import type IUserPaymentOptionModel from "./models/api/IUserPaymentOptionModel";
import type IProductResponse from "./models/api/response/IProductResponse";
import type { IUpcomingDeliveryResponse } from "./models/api/response/IUpcomingDeliveryResponse";
import type IUserPastOrderReponse from "./models/api/response/IUserPastOrderReponse";
import type IUserPaymentOptionResponse from "./models/api/response/IUserPaymentOptionResponse";
import type IUserPlanReponse from "./models/api/response/IUserPlanResponse";
import type { IUserResponse } from "./models/api/response/IUserResponse";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getQuarterInfo() {
	const date = new Date();
	const month = date.getMonth();
	const currentQuarter = Math.floor(month / 3) + 1;

	// Determine the start of the next quarter
	const nextQuarterMonth = (Math.floor(month / 3) + 1) * 3;
	const year =
		nextQuarterMonth < 12 ? date.getFullYear() : date.getFullYear() + 1;
	const nextQuarterStart = new Date(year, nextQuarterMonth % 12, 1);

	// Calculate days remaining
	const diffTime = nextQuarterStart - date;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	const { startDate, endDate } = getQuarterDates(year, currentQuarter);

	const remainsDaysToNextQuater = getDifferenceInDays(
		new Date(year, endDate.getMonth(), 1),
		new Date(),
	);

	return {
		currentQuarter,
		daysToNextQuarter: diffDays,
		year,
		nextQuarterMonth,
		startDate,
		endDate,
		remainsDaysToNextQuater,
	};
}

export function getQuarterDates(year: number, quarterNumber: number) {
	// Define the start month for each quarter (0-based for JavaScript Date)
	const startMonth = (quarterNumber - 1) * 3;

	// Create the start date of the quarter
	const startDate = new Date(year, startMonth, 1);

	// Create the end date of the quarter (last day of the last month in the quarter)
	const endDate = new Date(year, startMonth + 3, 0);

	return { startDate, endDate };
}

export function getDifferenceInDays(date1, date2) {
	// Ensure the input is converted to Date objects
	const d1 = new Date(date1);
	const d2 = new Date(date2);

	// Calculate the difference in time (milliseconds)
	const timeDiff = Math.abs(d2.getTime() - d1.getTime());

	// Convert milliseconds to days
	const diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

	return diffInDays;
}

export function dropNextDelivery() {
	let quater = "";
	const month = new Date().getMonth();
	if (month > 9) {
		quater = "January";
	}
	if (month >= 6 && month < 9) {
		quater = "October";
	}
	if (month >= 3 && month < 6) {
		quater = "July";
	}
	quater = "April";

	return `${quater} 1st ${new Date().getFullYear()}`;
}

export function getCardImage(brand: string) {
	const value = brand.toLowerCase();
	if (value === "visa") {
		return "/images/payment-cards/visa.svg";
	}

	if (value === "mastercard") {
		return "/images/payment-cards/mastercard.svg";
	}

	if (value === "jbc") {
		return "/images/payment-cards/jbc.svg";
	}

	if (value === "american express" || value === "american-express") {
		return "/images/payment-cards/american-express.svg";
	}

	if (value === "unionpay") {
		return "/images/payment-cards/unionpay.svg";
	}

	if (value === "discover") {
		return "/images/payment-cards/discover.svg";
	}
}

export function formatDate(value: string) {
	const date = new Date(value);
	const options = { month: "long", year: "numeric" };
	const monthYear = date.toLocaleDateString("en-US", options);
	const day = date.getDate();

	// Determine the correct ordinal suffix
	const suffix =
		day % 10 === 1 && day !== 11
			? "st"
			: day % 10 === 2 && day !== 12
				? "nd"
				: day % 10 === 3 && day !== 13
					? "rd"
					: "th";

	return `${monthYear.split(" ")[0]} ${day}${suffix} ${monthYear.split(" ")[1]}`;
}
export const mapProductModel = (model: IProductResponse): IProductCardModel => {
	return {
		id: model.productId || "",
		isComming: model.status === "PREORDER",
		status: model.status,
		name: model.product.name,
		teamName: model.product.producer?.businessName,
		imageUrl: model.product.imageUrl || "",
		imageKey: model.product.imageKey || "",
		price: model.product.price,
		rrp: model.product.rrp,
		wholesalePrice: model.product.wholesalePrice,
		subscribers: model.team._count.members,
		producer: model.team.producer,
		formulationSummary: model.product.formulationSummary,
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
		members: model.supplementTeamProducts.team._count.members,
		tags: model.tags,
		priceInfo: model.priceInfo,
		producer: model.producer,
		formulationSummary: model.formulationSummary,
		gallery: [model.imageUrl, model.producer.imageUrl],
	};
};

export const mapUpcomingDelivery = (
	model: IUpcomingDeliveryResponse,
): IUpcomingDeliveryModel => {
	return {
		id: model.id,
		deliveryDate: model.deliveryDate,
		businessName: model.team.producer.businessName,
		name: model.team.name,
		quantity: model.basket[0]?.quantity || 0,
		address: model.team.members[0].user.shipping.address,
		city: model.team.members[0].user.shipping.city,
		country: model.team.members[0].user.shipping.country,
		postalCode: model.team.members[0].user.postalCode,
		buildingNo: model.team.members[0].user.shipping.buildingNo,
	};
};

export const mapSubscriptionModel = (
	model: IUserPlanReponse,
): IManagePlanModel => {
	return {
		id: model.id,
		name: model.team.basket[0].product.producer.businessName,
		subscriptionStatus: model.subscriptionStatus,
		price: model.team.basket[0].product.price,
		percent:
			Number(model.team.basket[0].product.price) /
			Number(model.team.basket[0].product.rrp),
		capsulePerDay: +model.team.basket[0].capsulePerDay,
		isSkipped: model.skipNextDelivery,
		quantity: model.team.basket[0].quantity,
	};
};

export const mapUserInfoModel = (model: IUserResponse): IUserModel => {
	return {
		id: model.id,
		email: model.email,
		cardLastFourDigits: model.cardLastFourDigits,
		firstName: model.firstName,
		lastName: model.lastName,
		isVerified: model.isVerified,
		phone: model.phone,
		postalCode: model.postalCode,
		refCode: model.refCode,
		referrerId: model.referrerId,
		shipping: model.shipping,
	};
};

export const mapUserPaymentOptionModel = (
	model: IUserPaymentOptionResponse,
): IUserPaymentOptionModel => {
	return {
		id: model.id,
		card: model.card,
		billingDetails: model.billing_details,
		livemode: model.livemode,
		type: model.type,
		created: model.created,
	};
};

export const mapUserPastOrder = (
	model: IUserPastOrderReponse,
): IUserPastOrderModel => {
	return {
		id: model.id,
		amount: model.amount,
		order: model.order,
		status: model.status,
		createdAt: model.createdAt,
	};
};
