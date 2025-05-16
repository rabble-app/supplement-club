import type { Shipping } from "../api/response/IUpcomingDeliveryResponse";

export default interface IDeliveryAddressApiResponse {
	statusCode: number;
	error: string;
	data: Shipping;
}
