import type { IBaseTimestamps } from "./IBaseTimestamps";

export interface ITeamOrderModel extends IBaseTimestamps {
	id?: string;
	teamId?: string;
	status?: string;
	minimumTreshold?: string;
	accumulatedAmount?: string;
	deadline?: string;
	lastNudge?: string;
	deliveryDate?: string;
	confirmationStatus?: string;
	basket?: [];
}
