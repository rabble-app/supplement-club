export default interface IOrderSummaryModel {
	id: string;
	price?: number;
	capsules: number;
	src?: string;
	alt?: string;
	name?: string;
	description?: string;
	delivery?: string;
	pricePerCapsule?: number;
	rrp?: number;
	isFree?: boolean;
}
