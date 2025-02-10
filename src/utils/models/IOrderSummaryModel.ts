export default interface IOrderSummaryModel {
	id: string;
	src?: string;
	alt?: string;
	name?: string;
	description?: string;
	delivery?: string;
	price: number;
	pricePerCapsule?: number;
	rrp?: number;
	capsules: number;
	isFree?: boolean;
}
