import type { ICapsuleInfoModel } from "./api/ICapsuleInfoModel";
import type IPriceInfoModel from "./api/IPriceInfoModel";
import type { IProducerModel } from "./api/IProducerModel";

export default interface ISingleProductModel {
	id: string;
	name?: string;
	imageUrl: string;
	imageKey: string;
	description?: string;
	price: number;
	teamName?: string;
	wholesalePrice: number;
	retailPrice?: string;
	vat?: string;
	rabbleMarkUp?: string;
	rrp: number;
	status?: string;
	orderUnit?: string;
	subUnit?: string;
	quantityOfSubUnitPerOrder?: number;
	unitsOfMeasurePerSubUnit?: string;
	measuresPerSubUnit?: number;
	approvalStatus?: string;
	stock?: number;
	tags?: string[];
	priceInfo?: IPriceInfoModel[];
	capsuleInfo?: ICapsuleInfoModel[];
	formulationSummary?: string[];
	createdAt?: string;
	updatedAt?: string;
	type?: string;
	producer?: IProducerModel;
	partionedProducts?: [];
	members: number;
	isComming: boolean;
	gallery: string[];
}
