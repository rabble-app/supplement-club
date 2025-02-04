export default interface IUserPastOrderModel {
	id: string;
	amount: string;
	status: string;
	createdAt?: string;
	updatedAt?: string;
	order: Order;
	discount: number;
}

export interface Order {
	id: string;
	teamId: string;
	status: string;
	minimumTreshold: string;
	accumulatedAmount: string;
	deadline: string;
	lastNudge: string;
	deliveryDate: string;
	confirmationStatus: string;
	type: string;
	createdAt: string;
	updatedAt: string;
	basket: any[];
	team: Team;
}

export interface Team {
	id: string;
	name: string;
	postalCode: string;
	producerId: string;
	hostId: string;
	frequency: number;
	description: string;
	isPublic: boolean;
	imageUrl: string;
	imageKey: string;
	nextDeliveryDate: string;
	productLimit: string;
	deliveryDay: string;
	createdAt: string;
	updatedAt: string;
	partnerId: string;
	producer: Producer;
	_count: Count;
}

export interface Producer {
	businessName: string;
	businessAddress: string;
	imageUrl: string;
}

export interface Count {
	members: number;
}
