export default interface ICardModel {
	display_brand: string;
	exp_month?: number;
	exp_year?: number;
	last4?: string;
	first4?: string;
	dateUpdated?: string;
	default?: boolean;
}
