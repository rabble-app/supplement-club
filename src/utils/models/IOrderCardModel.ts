export default interface IOrderCardModel {
    src: string;
    alt: string;
    name: string;
    description: string;
    delivery?: string;
    id: number;
    children: React.ReactNode;
}