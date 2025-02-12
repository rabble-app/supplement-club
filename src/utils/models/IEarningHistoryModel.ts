export default interface IEarningHistoryModel {
	amount: number;
	referral: IReferralModel;
	type: string;
	createdAt: string;
}

interface IReferralModel {
	id: string;
	firstName?: string;
	lastName?: string;
}
