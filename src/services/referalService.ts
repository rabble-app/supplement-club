import { REFERAL_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "@/utils/helpers";
import type IReferalModel from "@/utils/models/api/IReferalModel";
import type IReferalResponse from "@/utils/models/api/response/IReferalResponse";
import type { default as IReferalInfoApiResponse } from "@/utils/models/services/IReferalInfoApiResponse";
import type IReferralHistoryApiResponse from "@/utils/models/services/IReferralHistoryApiResponse";
import type IRewardsApiResponse from "@/utils/models/services/IRewardsApiResponse";
import {
	mapReferalHistoryModel,
	mapReferalInfoModel,
	mapReferalModel,
} from "@/utils/mapping";
import orderBy from "lodash/orderBy";

export const referalService = {
	async getRewars() {
		const response = (await apiRequest(
			REFERAL_ENDPOINTS.REWARDS,
			"GET",
		)) as IRewardsApiResponse;
		const mapResponse = response?.data.map<IReferalModel>(
			(r: IReferalResponse) => mapReferalModel(r),
		);
		return orderBy(mapResponse, ["amount"], ["asc"]);
	},
	async getReferalInfo() {
		const response = (await apiRequest(
			REFERAL_ENDPOINTS.REFERAL_INFO,
			"GET",
		)) as IReferalInfoApiResponse;

		return mapReferalInfoModel(response.data);
	},

	async getReferralHistories() {
		const response = (await apiRequest(
			REFERAL_ENDPOINTS.REFERAL_HISTORY,
			"GET",
		)) as IReferralHistoryApiResponse;

		return mapReferalHistoryModel(response.data);
	},
	updateClaimReward: async (userId: string, amount: number) =>
		await apiRequest(REFERAL_ENDPOINTS.CLAIM_REWARD, "POST", {
			userId,
			amount,
		}),
};
