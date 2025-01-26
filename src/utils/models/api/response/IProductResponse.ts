import type { IProductModel } from "../IProductModel";
import type { ITeamModel } from "../ITeamModel";

export default interface IProductResponse {
	team: ITeamModel;
	product: IProductModel;
	status: string;
	productId: string;
}
