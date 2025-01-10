import type { IBaseTimestamps } from "../IBaseTimestamps";

export interface ICreateBuyingTeamResponse extends IBaseTimestamps {
	id?: string;
	name?: string;
	postalCode?: string;
	producerId?: string;
	hostId?: string;
	frequency?: number;
	description?: string;
	isPublic?: boolean;
	imageUrl?: string;
	imageKey?: string;
	nextDeliveryDate?: string;
	productLimit?: string;
	deliveryDay?: string;
	partnerId?: string;
}
