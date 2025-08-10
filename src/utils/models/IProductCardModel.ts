import type { IProducerModel } from "./api/IProducerModel";

export default interface IProductCardModel {
	isComming?: boolean;
	formulationSummary?: string[];
	id: string;
	status?: string;
	name?: string;
	description?: string;
	imageUrl: string;
	imageKey: string;
	price: number;
	rrp: number;
	vat?: string;
	tags?: string[];
	wholesalePrice: number;
	producer?: IProducerModel;

	teamName?: string;
	teamId?: string;
	subscribers: number;
	firstDelivery?: boolean;
}
