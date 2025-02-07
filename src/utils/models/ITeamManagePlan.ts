export interface ITeamManagePlan {
	id: string;
	name: string;
	basket: IBasketManagePlan[];
}

export interface IBasketManagePlan {
	id: string;
	quantity: number;
	product: IProductManagePlan;
	capsulePerDay: string;
}

export interface IProductManagePlan {
	id: string;
	name: string;
	price: string;
	quantityOfSubUnitPerOrder: string;
	unitsOfMeasurePerSubUnit: string;
	rrp: string;
	imageUrl: string;
	producer: IProducerManagePlan;
}
export interface IProducerManagePlan {
	businessName: string;
}
