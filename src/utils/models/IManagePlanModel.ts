export default interface IManagePlanModel {
    id: number;
    name: string;
    price: number;
    pricePerCapsule: number;
    percent: number;
    description: string;
    isActive?: boolean;
    isSkipped?: boolean;
}