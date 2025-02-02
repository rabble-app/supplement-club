import type IShippingResponse from "./response/IShippingResponse";

export default interface IUserModel {
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
	referrerId?: string;
	role?: string;
	notificationToken?: string;
	onboardingStage?: number;
	producer?: string;
	partner?: string;
	employee?: [];
	token?: string;
	shipping?: IShippingResponse;
}
