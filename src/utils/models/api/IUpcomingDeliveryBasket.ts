import type { Product } from "./IUserPlanResponse";

export interface IUpcomingDeliveryBasket {
	id: string;
	quantity: number;
	product: Product;
	capsulePerDay: string;
}
