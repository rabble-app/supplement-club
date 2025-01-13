export interface IMemberCardModel {
	id: number;
    name: string;
	doseTitle: string;
	discountTitle?: string;
	doseValue?: string;
	capsulePrice?: number;
	spotsRemainds?: number;
	price: number;
	forever?: boolean;
	isActive?: boolean;
}