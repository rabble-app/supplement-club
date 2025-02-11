export default interface IAddDeliveryAddressRequest {
	userId: string;
	channel: string;
	firstName: string;
	lastName: string;
	address: string;
	address2: string;
	city: string;
	postalCode: string;
	country: string;
	phone: string;
}
