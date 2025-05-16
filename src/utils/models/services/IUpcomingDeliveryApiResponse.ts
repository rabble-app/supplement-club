import type { IUpcomingDeliveryResponse } from "../api/response/IUpcomingDeliveryResponse";

export default interface IUpcomingDeliveryApiResponse {
	statusCode: number;
	data: IUpcomingDeliveryResponse[];
}
