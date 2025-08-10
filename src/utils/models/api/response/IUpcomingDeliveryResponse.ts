export interface IUpcomingDeliveryResponse {
	deliveryDate: string;
	user: {
		postalCode: string;
		buildingNo: string;
		address: string;
		address2: string;
		city: string;
		country: string;
	},
	deliveries: Delivery[];
}

export interface Delivery {
	orderId: string;
	type: string;
	product: {
		name: string;
		quantity: number;
		price: string;
		unitsOfMeasurePerSubUnit: string;
		imageUrl: string;
		poucheSize: string;
	}
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
