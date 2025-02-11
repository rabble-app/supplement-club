import { TEAM_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "@/utils/helpers";

export const teamsService = {
	getOrders: async () => await apiRequest(TEAM_ENDPOINTS.GET_ORDERS, "GET"),
	skipNextDelivery: async (id: string | undefined) =>
		await apiRequest(TEAM_ENDPOINTS.SKIP_NEXT_DELIVERY(id), "GET"),

	updateSubscriptionStatus: async (subscriptionId: string, status: string) =>
		await apiRequest(
			TEAM_ENDPOINTS.UPDATE_SUBSCRIPTION_STATUS(subscriptionId),
			"POST",
			{ status },
		),

	addTeamMember: async (userId: string, teamId: string) =>
		await apiRequest(TEAM_ENDPOINTS.ADD_TEAM_MEMBER, "POST", {
			userId,
			teamId,
			status: "APPROVED",
		}),

	createTeam: async (
		name: string,
		postalCode: string,
		frequency: string,
		description: string,
		producerId: string,
		hostId: string,
		productId: string,
	) =>
		await apiRequest(TEAM_ENDPOINTS.CREATE_TEAM, "POST", {
			name,
			postalCode,
			frequency,
			description,
			producerId,
			hostId,
			productId,
		}),

	cancelSubscriptionPlan: async (planId: string | undefined) =>
		await apiRequest(TEAM_ENDPOINTS.CANCEL_SUBSCRIPTION_PLAN(planId), "PATCH", {
			status: "CANCELED",
		}),

	reactivateSubscriptionPlan: async (planId: string) =>
		await apiRequest(
			TEAM_ENDPOINTS.REACTIVATE_SUBSCRIPTION_PLAN(planId),
			"PATCH",
			{ status: "ACTIVE" },
		),
	optBackInForNextDelivery: async (planId: string) =>
		await apiRequest(
			TEAM_ENDPOINTS.OPT_BACK_IN_FOR_NEXT_DELIVERY(planId),
			"GET",
		),
};
