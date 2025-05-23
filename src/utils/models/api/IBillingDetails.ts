export interface IBillingDetails {
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
