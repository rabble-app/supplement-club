import type { Team } from "../models/api/response/IUserPlanResponse";

export default interface IManagePlanModel {
	id: string;
	name: string;
	price: string;
	capsulePerDay: number;
	percent: number;
	isSkipped?: boolean;
	subscriptionStatus?: string;
	quantity: number;
	team: Team;
	role: string;
}
