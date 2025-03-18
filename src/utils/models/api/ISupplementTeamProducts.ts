import type { ITeamModel } from "./ITeamModel";

export interface ISupplementTeamProducts {
	orderTreashold?: number;
	foundingMembersDiscount?: number;
	earlyMembersDiscount?: number;
	status: string;
	team: ITeamModel;
}
