export default interface ISubscriptionSummaryModel {
	id: number;
	src?: string;
	quantity?: number;
	alt?: string;
	name?: string;
	description?: string;
	delivery?: string;
	price?: number;
	pricePerCapsule?: number;
	rrp?: number;
	capsules: number;
	isFree?: boolean;
	imageBorder?: boolean;
}
