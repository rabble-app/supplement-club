export default interface IProductCardModel {
    id: number;
    name: string;
    description: string;
    ingredient: string;
    price: number;
    src: string;
    altSrc: string;
    subscribers: number;
    corporation: string;
    rrpPrice: number;
    rrpDiscount: number;
    isComming?: boolean;
}
