import { REFERAL_ENDPOINTS } from "@/utils/endpoints";
import { apiRequest } from "@/utils/helpers";
import type IReferalModel from "@/utils/models/api/IReferalModel";
import type IReferalResponse from "@/utils/models/api/response/IReferalResponse";
import { mapReferalInfoModel, mapReferalModel } from "@/utils/utils";
import orderBy from "lodash/orderBy";

export const referalService = {
	async getRewars() {
		const { data } = await apiRequest(REFERAL_ENDPOINTS.REWARDS, "GET");
		const response = data?.map<IReferalModel>((r: IReferalResponse) =>
			mapReferalModel(r),
		);
		return orderBy(response, ["amount"], ["asc"]);
	},
	async getReferalInfo() {
		const { data } = await apiRequest(REFERAL_ENDPOINTS.REFERAL_INFO, "GET");

		return mapReferalInfoModel(data);
	},
	updateClaimReward: async (userId: string, amount: number) =>
		await apiRequest(REFERAL_ENDPOINTS.CLAIM_REWARD, "POST", {
			userId,
			amount,
		}),
};
