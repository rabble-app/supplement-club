import type { IBaseTimestamps } from "./IBaseTimestamps";
import type { ICountModel } from "./ICountModel";
import type { IHostModel } from "./IHostModel";
import type { IProducerModel } from "./IProducerModel";
import type { ITeamBasketModel } from "./ITeamBasketModel";
import type { ITeamMemberModel } from "./ITeamMemberModel";
import type { ITeamOrderModel } from "./ITeamOrderModel";

export interface ITeamModel extends IBaseTimestamps {
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
	orders?: ITeamOrderModel[];
	host?: IHostModel;
	members?: ITeamMemberModel[];
	requests?: [];
	producer?: IProducerModel;
	basket?: ITeamBasketModel[];
	_count: ICountModel;
}
