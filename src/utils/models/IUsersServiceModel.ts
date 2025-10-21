export default interface ILaunchPromotion {
    isEarly: boolean;
    availableSlots: number;
}

export interface ILaunchPromotionResponse {
    statusCode: number;
    message: string;
    data: ILaunchPromotion;
}