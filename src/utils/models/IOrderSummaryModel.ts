export default interface IOrderSummaryModel {
	id: string;
	price?: number;
	quantity?: number;
	capsules: number;
	src?: string;
	alt?: string;
	name?: string;
	description?: string;
	delivery?: string;
	pricePerCapsule?: number;
	rrp?: number;
	isFree?: boolean;
	imageBorder?: boolean;
	isFoundingMember?: boolean;
	pricePerCount?: number;
	rrpPerCount?: number;
	capsulePerDay?: number;
	gramsPerCount?: number;
	isMembership?: boolean;
}
