export interface ITeamManagePlan {
	id: string;
	name: string;
	basket: IBasketManagePlan[];
}

export interface IBasketManagePlan {
	id: string;
	quantity: number;
	product: IProductManagePlan;
	capsulePerDay: number;
	orderId?: string;
	userId?: string;
	productId?: string;
	price?: number;
	type?: string;
}

export interface IProductManagePlan {
	id: string;
	name: string;
	price: number;
	quantityOfSubUnitPerOrder: number;
	unitsOfMeasurePerSubUnit: string;
	rrp: number;
	imageUrl: string;
	producer: IProducerManagePlan;
}
export interface IProducerManagePlan {
	businessName: string;
}
