import type { IBaseTimestamps } from "../IBaseTimestamps";

export interface IAddMemberTeamResponse extends IBaseTimestamps {
	id?: string;
	teamId?: string;
	userId?: string;
	status?: string;
	skipNextDelivery?: boolean;
}
