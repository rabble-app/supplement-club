import type { IBaseTimestamps } from "../IBaseTimestamps";
import type { ITeamModel } from "../ITeamModel";

export interface ISubscriptionResponse extends IBaseTimestamps {
	id?: string;
	teamId?: string;
	userId?: string;
	status?: string;
	role?: string;
	skipNextDelivery?: boolean;
	team?: ITeamModel;
}
