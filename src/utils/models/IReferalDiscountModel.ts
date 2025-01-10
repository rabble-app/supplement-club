export interface IReferalDiscountModel {
	id: number;
    name: string;
	steps: number;
	initStep?: number;
	price: number;
	priceOff?: number;
	isActive?: boolean;
	activeIndex: number;
	activeImage: string;
}