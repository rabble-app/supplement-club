import type { IBaseTimestamps } from "./IBaseTimestamps";
import type { ICategoriesModel } from "./ICategoriesModel";
import type { IProducerUserModel } from "./IProducerUserModel";

export interface IProducerModel extends IBaseTimestamps {
	id?: string;
	userId?: string;
	stripeConnectId?: string;
	isVerified?: boolean;
	imageUrl: string;
	imageKey?: string;
	businessName?: string;
	businessAddress?: string;
	accountsEmail?: string[];
	salesEmail?: string;
	minimumTreshold?: string;
	website?: string;
	description?: string;
	vat?: number;
	paymentTerm?: number;
	user?: IProducerUserModel;
	categories?: ICategoriesModel[];
}
