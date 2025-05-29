export const TEAM_ENDPOINTS = {
	GET_ORDERS: "team/orders",
	UPDATE_SUBSCRIPTION_STATUS: (id: string) =>
		`teams/members/${id}/subscription`,
	ADD_TEAM_MEMBER: "teams/add-member",
	CREATE_TEAM: "teams/create",
	CANCEL_SUBSCRIPTION_PLAN: (id: string | undefined) =>
		`teams/members/${id}/subscription`,
	SKIP_NEXT_DELIVERY: (id: string | undefined) =>
		`teams/members/skip-delivery/${id}?status=true`,
	REACTIVATE_SUBSCRIPTION_PLAN: (id: string) =>
		`teams/members/${id}/subscription`,
	OPT_BACK_IN_FOR_NEXT_DELIVERY: (id: string) =>
		`teams/members/skip-delivery/${id}?status=false`,
};

export const PAYMENT_ENDPOINTS = {
	ADD_CARD: "payments/add-card?isSupplementApp=true",
	BULK_BASKET: "payments/basket-bulk",
	JOIN_TEAM: "payments/supplement/join-team",
	JOIN_PREORDER_TEAM: "payments/supplement/join-team",
	SUBSCRIPTION_STATUS: (id: string) => `payments/subscription/status/${id}`,
	SETUP_INTENT: "payments/setup-intent/",
	PAYMENT_INTENT: "payments/intent",
	SUBSCRIPTION_TOPUP: "payments/supplement/topup",
	UPDATE_SUBSCRIPTION: (id: string) => `payments/basketC/${id}`,
	CHARGE_USER: "payments/charge",
	MAKE_CARD_DEFAULT: "payments/default-card",
	REMOVE_CARD: "payments/remove-card?isSupplementApp=true",
	GET_PAYMENT_OPTIONS: (id: string) =>
		`payments/options/${id}?isSupplementApp=true`,
};

export const USER_ENDPOINTS = {
	UPCOMING_DELIVERIES: (userId: string) =>
		`users/${userId}/supplement/upcoming-deliveries`,
	DELIVERY_ADDRESS: "users/delivery-address",
	SUBSCRIPTION_PLANS: (userId: string) => `users/${userId}/supplement/plans`,
	SUBSCRIPTION_PLAN: (userId: string) => `users/supplement/plans/${userId}`,
	UPDATE_INFO: "users/update",
	UPDATE_SHIPPING: (userId: string) => `users/delivery-address/${userId}`,
	PAST_ORDERS: (userId: string) => `users/order-history/${userId}`,
	INFO: (userId: string) => `users/${userId}`,
};

export const AUTH_ENDPOINTS = {
	LOGIN: "auth/login",
	REGISTER: "auth/register",
	RESET_PASSWORD: "auth/send-reset-password-link",
	EMAIL_VERIFY: "auth/email-verification",
	RESEND_EMAIL_VERIFY: "auth/resend-email-verification",
	CHANGE_PASSWORD: "auth/change-password",
};

export const REFERAL_ENDPOINTS = {
	REWARDS: "referrals/reward-categories",
	REFERAL_INFO: "referrals/info",
	REFERAL_HISTORY: "referrals/tracking",
	CLAIM_REWARD: "referrals/claim-rewards",
};

export const PRODUCT_ENDPOINTS = {
	PRODUCT: (id: string) => `products/${id}`,
	PRODUCTS: (userId?: string) => `products/supplement/list?userId=${userId}`,
	PRODUCTS_LIMIT: (limit?: number) => `products/supplement/list?limit=${limit}`,
	PRODUCTTAGS: () => "products/supplement/tags",
};
