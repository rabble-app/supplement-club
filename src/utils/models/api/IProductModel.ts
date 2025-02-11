import type { IBaseTimestamps } from "./IBaseTimestamps";
import type { ICapsuleInfoModel } from "./ICapsuleInfoModel";
import type IPriceInfoModel from "./IPriceInfoModel";
import type { IProducerModel } from "./IProducerModel";
import type { ISupplementTeamProducts } from "./ISupplementTeamProducts";

export interface IProductModel extends IBaseTimestamps {
	id: string;
	name?: string;
	imageUrl: string;
	imageKey: string;
	description?: string;
	producerId?: string;
	categoryId?: string;
	price: number;
	wholesalePrice: number;
	retailPrice?: string;
	vat?: string;
	rabbleMarkUp?: string;
	rrp: number;
	status?: string;
	orderUnit?: string;
	subUnit?: string;
	quantityOfSubUnitPerOrder?: string;
	unitsOfMeasurePerSubUnit?: string;
	measuresPerSubUnit?: number;
	approvalStatus?: string;
	stock?: number;
	tags?: string[];
	priceInfo?: IPriceInfoModel[];
	capsuleInfo?: ICapsuleInfoModel[];
	type?: string;
	producer: IProducerModel;
	partionedProducts?: [];
	formulationSummary?: string[];
	supplementTeamProducts: ISupplementTeamProducts;
}
