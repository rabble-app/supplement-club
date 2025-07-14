import type IMembershipSummaryModel from "./IMembershipSummaryModel";
import type IOrderSummaryModel from "./IOrderSummaryModel";
import type IReferalSummaryModel from "./IReferalSummaryModel";
import type ISubscriptionSummaryModel from "./ISubscriptionSummaryModel";

export default interface ISummaryProductModel {
	id: number;
	title?: string;
	corporation?: string;
	name?: string;
	rrp?: number;
	deliveryText?: string;
	percentage?: number;
	quantityOfSubUnitPerOrder?: string;
	unitsOfMeasurePerSubUnit?: string;
	orders: IOrderSummaryModel[];
	referals: IReferalSummaryModel[];
	subscriptions: ISubscriptionSummaryModel[];
	membership: IMembershipSummaryModel[];
	pricePerCount?: number;
	capsulePerDay?: number;
	gramsPerCount?: number;
	orderDate?: string;
	leadTime?: number;
}
