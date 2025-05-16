export interface IUpcomingDeliveryResponse {
	id: string;
	deliveryDate: string;
	team: Team;
	basket: Basket[];
}

export interface Team {
	name: string;
	producer: Producer;
	members: Member[];
}

export interface Basket {
	quantity: number;
	product: Product;
}

export interface Producer {
	businessName: string;
}

export interface Member {
	user: User;
}

export interface User {
	postalCode: string;
	shipping: Shipping;
}

export interface Shipping {
	id: string;
	userId: string;
	buildingNo: string;
	address: string;
	city: string;
	country: string;
	createdAt: string;
	updatedAt: string;
}

export interface Product {
	id: string;
	name: string;
	price: string;
	unitsOfMeasurePerSubUnit: string;
}
