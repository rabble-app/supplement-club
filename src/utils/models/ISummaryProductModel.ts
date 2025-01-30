import type IOrderSummaryModel from "./IOrderSummaryModel";
import type IReferalSummaryModel from "./IReferalSummaryModel";
import type ISubscriptionSummaryModel from "./ISubscriptionSummaryModel";

export default interface ISummaryProductModel {
	id: number;
	title?: string;
	corporation?: string;
	name?: string;
	deliveryText?: string;
	orders: IOrderSummaryModel[];
	referals: IReferalSummaryModel[];
	subscriptions: ISubscriptionSummaryModel[];
}
