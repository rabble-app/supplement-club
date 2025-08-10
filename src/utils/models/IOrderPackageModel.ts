export default interface IOrderPackageModel {
    memberType: MemberType;
    capsuleCount: number;
    days: number;
    units: string;
    pricePerCount?: number;
    price: number;
    rrp: number;
    rrpPerCount: number;
    hasAlignmentPackage: boolean;
    deliveryDate: string;
    discount?: number;
    extraDiscount: number;
    remainingSpots: number;
    imageSrc: string;
    storageCapsuleCount: number;
    stockStatus?: string;
    pochesRequired?: number;
    alignmentPoucheSize?: number;
    producer?: string;
    pricePerPoche?: number;
    productId?: string;
    teamId?: string;
    gPerCount?: number;
}

export enum MemberType {
    MEMBER = 'MEMBER',
    FOUNDING_MEMBER = 'FOUNDING_MEMBER',
    EARLY_MEMBER = 'EARLY_MEMBER'
}