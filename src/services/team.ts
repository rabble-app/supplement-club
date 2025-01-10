import { apiRequest } from "@/utils/helpers";

export const getOrders = async () => await apiRequest("team/orders", "GET");

export const updateSubscriptionStatus = async (
	subscriptionId: string,
	status: string,
) =>
	await apiRequest(`teams/members/${subscriptionId}/subscription`, "POST", {
		status,
	});

export const skipNextDelivery = async (subscriptionId: string) =>
	await apiRequest(`teams/members/skip-delivery/${subscriptionId}`, "POST");

export const addTeamMember = async (
	userId: string,
	teamId: string,
	status: string,
) => await apiRequest("teams/add-member", "POST", { userId, teamId, status });

export const createTeam = async (
	name: string,
	postalCode: string,
	frequency: string,
	description: string,
	producerId: string,
	hostId: string,
	productId: string,
) =>
	await apiRequest("teams/create", "POST", {
		name,
		postalCode,
		frequency,
		description,
		producerId,
		hostId,
		productId,
	});
