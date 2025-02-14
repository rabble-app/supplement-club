import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type IEarningHistoryModel from "./models/IEarningHistoryModel";
import type IManagePlanModel from "./models/IManagePlanModel";
import type IProductCardModel from "./models/IProductCardModel";
import type IReferralHistoryModel from "./models/IReferralHistoryModel";
import type ISingleProductModel from "./models/ISingleProductModel";
import type { IProductModel } from "./models/api/IProductModel";
import type IReferalInfoModel from "./models/api/IReferalInfoModel";
import type IReferalModel from "./models/api/IReferalModel";
import type IUpcomingDeliveryModel from "./models/api/IUpcomingDeliveryModel";
import type IUserModel from "./models/api/IUserModel";
import type IUserPaymentOptionModel from "./models/api/IUserPaymentOptionModel";
import type IProductResponse from "./models/api/response/IProductResponse";
import type IReferalInfoResponse from "./models/api/response/IReferalInfoResponse";
import type IReferalResponse from "./models/api/response/IReferalResponse";
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
	const nextYear =
		nextQuarterMonth < 12 ? date.getFullYear() : date.getFullYear() + 1;
	const nextQuarterStart = new Date(nextYear, nextQuarterMonth % 12, 1);
	// Calculate days remaining for the next quarter
	const diffTime = nextQuarterStart.getTime() - date.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	// Previous quarter calculations
	const prevQuarterMonth = (Math.floor(month / 3) - 1) * 3;
	const prevYear =
		prevQuarterMonth >= 0 ? date.getFullYear() : date.getFullYear() - 1;
	const prevQuarterStart = new Date(prevYear, (prevQuarterMonth + 12) % 12, 1);

	// Previous month calculations
	const prevMonth = month === 0 ? 11 : month - 1;
	const prevMonthYear =
		month === 0 ? date.getFullYear() - 1 : date.getFullYear();
	const prevMonthStart = new Date(prevMonthYear, prevMonth, 1);

	// Get quarter dates
	const { startDate, endDate } = getQuarterDates(
		date.getFullYear(),
		currentQuarter,
	);
	const { startDate: prevStartDate, endDate: prevEndDate } = getQuarterDates(
		prevYear,
		Math.floor(prevQuarterMonth / 3) + 1,
	);
	const remainsDaysToNextQuater = getDifferenceInDays(
		new Date(nextYear, endDate.getMonth(), 1).toISOString(),
		new Date().toISOString(),
	);

	const nextDeliveryText = `${endDate.toLocaleString("en", { month: "long" })} 1st ${date.getFullYear()}`;

	return {
		currentQuarter,
		daysToNextQuarter: diffDays,
		year: date.getFullYear(),
		nextQuarterMonth,
		startDate,
		endDate,
		remainsDaysToNextQuater,
		prevQuarterMonth,
		prevQuarterYear: prevYear,
		prevQuarterStart,
		prevMonth,
		quarterly: getDifferenceInDays(endDate.toString(), startDate.toString()),
		prevMonthYear,
		prevMonthStart,
		prevStartDate,
		prevEndDate,
		nextDeliveryText,
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

export function getDifferenceInDays(date1: string, date2: string) {
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

	if (value === "diners_club") {
		return "/images/payment-cards/diners_club.svg";
	}

	if (value === "discover") {
		return "/images/payment-cards/discover.svg";
	}
	return "/images/payment-cards/visa.svg";
}

export function formatDate(value: string) {
	const date = new Date(value);
	const options: Intl.DateTimeFormatOptions = {
		month: "long",
		year: "numeric",
	};
	const monthYear = date.toLocaleDateString("en-US", options);
	const day = date.getDate();

	// Determine the correct ordinal suffix
	let suffix: string;

	if (day % 10 === 1 && day !== 11) {
		suffix = "st";
	} else if (day % 10 === 2 && day !== 12) {
		suffix = "nd";
	} else if (day % 10 === 3 && day !== 13) {
		suffix = "rd";
	} else {
		suffix = "th";
	}

	return `${monthYear.split(" ")[0]} ${day}${suffix} ${monthYear.split(" ")[1]}`;
}
export const mapProductModel = (model: IProductResponse): IProductCardModel => {
	return {
		id: model.productId || "",
		isComming:
			model?.supplementTeamProducts?.status === "PREORDER" ||
			model?.status === "PREORDER",
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
		teamId: model.teamId,
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
		quantityOfSubUnitPerOrder: model.quantityOfSubUnitPerOrder,
		unitsOfMeasurePerSubUnit: model.unitsOfMeasurePerSubUnit,
		members: model.supplementTeamProducts.team._count.members,
		tags: model.tags,
		priceInfo: model.priceInfo,
		producer: model.producer,
		formulationSummary: model.formulationSummary,
		gallery: [model.imageUrl, model.producer.imageUrl],
		supplementTeamProducts: model.supplementTeamProducts,
		orderId: model.orderId,
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
		name: model.team?.basket[0]?.product?.producer?.businessName,
		subscriptionStatus: model.subscriptionStatus,
		isSkipped: model.skipNextDelivery,
		quantity: model.team?.basket[0]?.quantity,
		team: model.team,
		price: model.team?.basket[0]?.product?.price,
		capsulePerDay: model.team?.basket[0]?.product?.capsulePerDay,
		percent: model.team?.basket[0]?.product?.percent,
	};
};

export const mapUserInfoModel = (model: IUserResponse): IUserModel => {
	return {
		id: model?.id,
		email: model?.email,
		cardLastFourDigits: model?.cardLastFourDigits,
		firstName: model?.firstName,
		lastName: model?.lastName,
		isVerified: model?.isVerified,
		phone: model?.phone,
		postalCode: model?.postalCode,
		refCode: model?.refCode,
		referrerId: model?.referrerId,
		shipping: model?.shipping,
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
		customer: model.customer,
	};
};

export const mapUserPastOrder = (
	model: IUserPastOrderReponse,
): IUserPastOrderReponse => {
	return {
		id: model.id,
		amount: model.amount,
		order: model.order,
		status: model.status,
		createdAt: model.createdAt,
		discount: model.discount,
	};
};

export const mapReferalModel = (model: IReferalResponse): IReferalModel => {
	return {
		amount: model.amount,
		id: model.id,
		createdAt: model.createdAt,
		rate: model.rate,
		updatedAt: model.updatedAt,
	};
};

export const mapReferalInfoModel = (
	model: IReferalInfoResponse,
): IReferalInfoModel => {
	return {
		balance: model?.wallet?.balance ? Number(model.wallet.balance) : 0,
		claimed: model?.wallet?.claimed ? Number(model.wallet.claimed) : 0,
		bonuses: model?.bonuses || [],
		referralCode: model?.referralCode,
		teams: model?.teams,
		totalSaved: model?.totalSaved,
		referrer: model?.referrer,
	};
};

export const mapReferalHistoryModel = (
	model: IReferralHistoryModel,
): IEarningHistoryModel[] => {
	return model.earnings;
};
