import type { IBaseTimestamps } from "./IBaseTimestamps";

export interface ITeamBasketModel extends IBaseTimestamps {
	id?: string;
	teamId?: string;
	userId?: string;
	productId?: string;
	capsulePerDay?: string;
	quantity?: number;
	price?: string;
}
