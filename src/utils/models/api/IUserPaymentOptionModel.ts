import type { IBillingDetails } from "./IBillingDetails";
import type { IPaymentCard } from "./IPaymentCard";

export default interface IUserPaymentOptionModel {
	id: string;
	billingDetails: IBillingDetails;
	card: IPaymentCard;
	created: number;
	livemode: boolean;
	type: string;
}
