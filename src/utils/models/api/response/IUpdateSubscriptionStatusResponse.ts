import type { IBaseTimestamps } from "../IBaseTimestamps";

export interface IUpdateSubscriptionStatusResponse extends IBaseTimestamps {
	id?: string;
	teamId?: string;
	userId?: string;
	status?: string;
	role?: string;
	skipNextDelivery?: boolean;
	subscriptionStatus?: string;
}
