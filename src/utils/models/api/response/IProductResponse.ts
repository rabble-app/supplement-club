import type { ISupplementTeamProductsModel } from "../../ISupplementTeamProductsModel";
import type { IProductModel } from "../IProductModel";
import type { ITeamModel } from "../ITeamModel";

export default interface IProductResponse {
	team: ITeamModel;
	product: IProductModel;
	supplementTeamProducts: ISupplementTeamProductsModel;
	status: string;
	productId: string;
	teamId: string;
	firstDelivery: boolean;
}
