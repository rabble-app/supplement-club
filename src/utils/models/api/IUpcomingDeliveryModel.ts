import type { Basket } from "./IUserPlanResponse";

export default interface IUpcomingDeliveryResponse {
	id: string;
	deliveryDate: string;
	quantity: number;
	name: string;
	businessName: string;
	address: string;
	city: string;
	country: string;
	buildingNo: string;
	postalCode: string;
	basket?: Basket[];
}
