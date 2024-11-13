export interface IProductModel {
    name: string;
    description: string;
    price: number;
    src: string;
    altSrc: string;
    subscribers: number;
    corporation: string;
    rrpPrice: number;
    rrpDiscount: number;
    isComming?: boolean;
}