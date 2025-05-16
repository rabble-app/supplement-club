export default interface IUserPaymentOptionResponse {
	id: string;
	object: string;
	allow_redisplay: string;
	billing_details: BillingDetails;
	card: Card;
	created: number;
	customer: string;
	livemode: boolean;
	type: string;
}
export interface BillingDetails {
	address: Address;
	email: string;
	name: string;
	phone: string;
}

export interface Address {
	city: string;
	country: string;
	line1: string;
	line2: string;
	postal_code: string;
	state: string;
}

export interface Card {
	brand: string;
	checks: Checks;
	country: string;
	display_brand: string;
	exp_month: number;
	exp_year: number;
	fingerprint: string;
	funding: string;
	generated_from: string;
	last4: string;
	networks: Networks;
	regulated_status: string;
	wallet: string;
}

export interface Checks {
	address_line1_check: string;
	address_postal_code_check: string;
	cvc_check: string;
}

export interface Networks {
	available: string[];
	preferred: string;
}
