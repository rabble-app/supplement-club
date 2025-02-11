import type { IBaseTimestamps } from "../IBaseTimestamps";

export interface ISkipNextDeliveryResponse extends IBaseTimestamps {
	id?: string;
	teamId?: string;
	userId?: string;
	status?: string;
	role?: string;
	skipNextDelivery?: boolean;
}
