import type { ISupplementTeamProductsModel } from "../../ISupplementTeamProductsModel";

export default interface IUserPlanReponse {
	id: string;
	subscriptionStatus: string;
	skipNextDelivery: boolean;
	role: string;
	team: Team;
}

export interface Team {
	id: string;
	name: string;
	basket: Basket[];
	supplementTeamProducts: ISupplementTeamProductsModel;
	_count: Count;
	latestOrder?: ILatestOrder;
}

export interface ILatestOrder {
	id: string;
	deadline: string;
}

export interface Basket {
	id: string;
	quantity: number;
	product: Product;
	capsulePerDay: number;
}

export interface Product {
	id: string;
	name: string;
	price: string;
	capsulePerDay: number;
	percent: number;
	unitsOfMeasurePerSubUnit: string;
	rrp: number;
	priceInfo: PriceInfo[];
	capsuleInfo: CapsuleInfo[];
	imageUrl: string;
	producer: Producer;
}

export interface PriceInfo {
	percentageDiscount: number;
	teamMemberCount: number;
}

export interface CapsuleInfo {
	capsuleCount: number;
	description1: string;
	description2: string;
	description3: string;
	title1: string;
	title2: string;
	title3: string;
	others: string;
}

export interface Producer {
	businessName: string;
}

export interface Count {
	members: number;
}
