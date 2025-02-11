export default interface IReferalInfoResponse {
	referralCode: string;
	teams: number;
	wallet: Wallet;
	bonuses: Bonus[];
	totalSaved: number;
	referrer: Referrer;
}

export interface Bonus {
	id: string;
	userId: string;
	amount: string;
	type: string;
	referralId: null;
	orderId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Referrer {
	id: string;
	name: string;
}

export interface Wallet {
	id: string;
	userId: string;
	balance: string;
	claimed: string;
	createdAt: Date;
	updatedAt: Date;
}
