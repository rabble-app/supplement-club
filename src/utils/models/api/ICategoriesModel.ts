import type { ICategoryModel } from "../ICategoryModel";
import type { IBaseTimestamps } from "./IBaseTimestamps";

export interface ICategoriesModel extends IBaseTimestamps {
	id?: string;
	producerId?: string;
	producerCategoryOptionId?: string;
	category?: ICategoryModel;
}
