import IOrderSummaryModel from "../../IOrderSummaryModel";
import ISubscriptionSummaryModel from "../../ISubscriptionSummaryModel";
import type { IBaseTimestamps } from "../IBaseTimestamps";
import type IShippingResponse from "./IShippingResponse";

export interface IUserResponse extends IBaseTimestamps {
	id?: string;
	phone?: string;
	email: string;
	password?: string;
	firstName: string;
	lastName: string;
	postalCode?: string;
	isVerified?: boolean;
	stripeCustomerId?: string;
	stripeDefaultPaymentMethodId?: string;
	cardLastFourDigits?: string;
	imageUrl?: string;
	imageKey?: string;
	refCode?: string;
	teamId?: string;
	referrerId?: string;
	role?: string;
	notificationToken?: string;
	onboardingStage?: number;
	producer?: string;
	partner?: string;
	employee?: [];
	basketsC: IBasketsC[];
	token?: string;
	shipping?: IShippingResponse;
	metadata?: IMetadata;
}

export interface IMetadata {
	productId?: string;
	pouchSize?: number;
	orders?: IOrderSummaryModel[] | ISubscriptionSummaryModel[];
	price?: number;
	pricePerPoche?: number;
	capsuleCount?: number;
	deliveryDate?: string;
	alignmentPoucheSize?: number;
	daysUntilNextDrop?: number;
	unitsOfMeasurePerSubUnit?: string;
	quantityOfSubUnitPerOrder?: number;
	gramsPerCount?: number;
	isComming?: boolean;
	rrp?: number;
	rrpPerCount?: number;
	pricePerCount?: number;
	teamName?: string;
	teamId?: string;
	name?: string;
	discount?: number;
	topUpQuantity?: number;
	quantity?: number;
	founderSpots?: number;
	founderMembersNeeded?: number;
	founderDiscount?: number;
	earlyMemberDiscount?: number;
	leadTime?: number;
	firstDelivery?: boolean;
	pochesRequired?: number;
}

interface IBasketsC {
	productId: string;
}
