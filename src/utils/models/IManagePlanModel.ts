export default interface IManagePlanModel {
	id: string;
	name: string;
	price: string;
	capsulePerDay: number;
	percent: number;
	isSkipped?: boolean;
	subscriptionStatus?: string;
	quantity: number;
	team: Team;
}

export interface Team {
	id: string;
	name: string;
	basket: Basket[];
}

export interface Basket {
	id: string;
	quantity: number;
	product: Product;
	capsulePerDay: string;
}

export interface Product {
	id: string;
	name: string;
	price: string;
	unitsOfMeasurePerSubUnit: string;
	rrp: string;
	imageUrl: string;
	producer: Producer;
}
export interface Producer {
	businessName: string;
}
