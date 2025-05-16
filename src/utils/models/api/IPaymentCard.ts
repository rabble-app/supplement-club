export interface IPaymentCard {
	brand: string;
	country: string;
	display_brand: string;
	exp_month: number;
	exp_year: number;
	fingerprint: string;
	funding: string;
	generated_from: string;
	last4: string;
	regulated_status: string;
	wallet: string;
}
