import type { ITeamModel } from "./ITeamModel";

export interface ISupplementTeamProducts {
	orderTreashold?: number;
	status: string;
	team: ITeamModel;
}
