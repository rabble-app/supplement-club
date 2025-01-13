export interface IReferalCardModel {
    name: string;
	steps: number;
	currentStep: number;
	price: number;
	description?: string;
	isActive?: boolean;
	rootClass?: string
}