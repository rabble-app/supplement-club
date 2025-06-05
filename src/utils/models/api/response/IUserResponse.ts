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

interface IMetadata {
	productId?: string;
}

interface IBasketsC {
	productId: string;
}
