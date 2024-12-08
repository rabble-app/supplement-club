export interface IReferalDiscountModel {
    name: string;
	steps: number;
	price: number;
	priceOff: number;
	isActive?: boolean;
}