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
	supplementTeamProducts: SupplementTeamProducts;
	_count: Count;
	producer: Producer;
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
}

export interface Producer {
	businessName: string;
}

export interface SupplementTeamProducts {
	foundingMembersDiscount: string;
	status: string;
}

export interface Count {
	members: number;
}
