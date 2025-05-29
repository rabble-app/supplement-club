export interface ISubsriptionStatusApiResponse {
	statusCode: number;
	data: ISubsriptionStatusApi;
}

export interface ISubsriptionStatusApi {
	subscriptionAmount?: number;
	subscriptionRRP?: number;
	subscriptionDiscount?: number;
}
