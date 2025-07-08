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
		tags: model.product.tags,
	};
};

export const mapSingleProductModel = (
	model: IProductModel,
): ISingleProductModel => {
	return model
		? {
				id: model.id,
				isComming: model.supplementTeamProducts?.status === "PREORDER",
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
				members: model.supplementTeamProducts?.team._count?.members,
				tags: model.tags,
				approvalStatus: model.approvalStatus,
				priceInfo: model.priceInfo,
				pricePerCount: model.pricePerCount,
				producer: model.producer,
				formulationSummary: model.formulationSummary,
				gallery: [model.imageUrl, model.producer.imageUrl],
				supplementTeamProducts: model.supplementTeamProducts,
				orderId: model.orderId,
				productBenefits: model.productBenefits,
				healthCategories: model.healthCategories,
				nextPriceDiscountLevel: model.nextPriceDiscountLevel,
				deliveryDate: model.deliveryDate,
				daysUntilNextDrop: model.daysUntilNextDrop,
				poucheSize: model.poucheSize,
				alignmentPoucheSize: model.alignmentPoucheSize,
				rrpPerCount: model.rrpPerCount,
				discount: model.discount,
				activePercentageDiscount: model.activePercentageDiscount,
				gramsPerCount: model.gramsPerCount,
				pricePerPoche: model.pricePerPoche,
				leadTime: model.leadTime,
				firstDelivery: model.firstDelivery,
			}
		: ({} as ISingleProductModel);
};



export const mapSubscriptionModel = (
	model: IUserPlanReponse,
): IManagePlanModel => {
	return model
		? {
				id: model.id,
				name: model.team?.basket[0]?.product?.name,
				subscriptionStatus: model.subscriptionStatus,
				isSkipped: model.skipNextDelivery,
				quantity: model.team?.basket[0]?.quantity,
				team: model.team,
				price: model.team?.basket[0]?.product?.price,
				capsulePerDay:
					+model.team?.basket[0]?.product?.capsulePerDay ||
					+model.team?.basket[0]?.capsulePerDay,
				percent: model.team?.basket[0]?.product?.percent,
				role: model.role,
			}
		: ({} as IManagePlanModel);
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
		userCode: model?.userCode,
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
