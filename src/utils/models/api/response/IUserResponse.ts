import type { IBaseTimestamps } from "../IBaseTimestamps";

export interface IUserResponse extends IBaseTimestamps {
	id?: string;
	phone?: string;
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	postalCode?: string;
	isVerified?: boolean;
	stripeCustomerId?: string;
	stripeDefaultPaymentMethodId?: string;
	cardLastFourDigits?: string;
	imageUrl?: string;
	imageKey?: string;
	role?: string;
	notificationToken?: string;
	onboardingStage?: number;
	producer?: string;
	partner?: string;
	employee?: [];
	token?: string;
}
