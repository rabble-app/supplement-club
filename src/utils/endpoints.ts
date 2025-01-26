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
	ADD_CARD: "	payments/add-card",
	BULK_BASKET: "payments/basket-bulk",
	PREORDER_BASKET: "payments/basket",
	CHARGE_HOST: "payments/charge-host",
	SUBSCRIPTION_TOPUP: "payments/supplement/topup",
	UPDATE_SUBSCRIPTION: (id: string) => `payments/basketC/${id}`,
	PAYMENT_BASKET_ACTIVE: "payments/basket",
	PAYMENT_BASKET_PREORDER: "payments/basket",
	CHARGE_USER: "payments/charge",
	CAPTURE_PAYMENT: "payments/intent/capture",
	GET_PAYMENT_OPTIONS: (id: string) => `payments/options/${id}`,
};

export const USER_ENDPOINTS = {
	UPCOMING_DELIVERIES: (userId: string) =>
		`users/${userId}/supplement/upcoming-deliveries`,
	DELIVERY_ADDRESS: "users/delivery-address",
	SUBSCRIPTION_PLANS: (userId: string) => `users/${userId}/supplement/plans`,
};

export const AUTH_ENDPOINTS = {
	LOGIN: "auth/login",
	REGISTER: "auth/register",
	RESET_PASSWORD: "auth/send-reset-password-link",
	EMAIL_VERIFY: "auth/email-verification",
	RESEND_EMAIL_VERIFY: "auth/resend-email-verification",
	CHANGE_PASSWORD: "auth/change-password",
};

export const PRODUCT_ENDPOINTS = {
	PRODUCT: (id: string) =>
		`products/${id}?teamId=a621791d-1064-4fd3-ad11-7db0f9ff7d94`,
	PRODUCTS: () => "products/supplement/list",
	PRODUCTS_LIMIT: (limit?: number) => `products/supplement/list?limit=${limit}`,
	PRODUCTTAGS: () => "products/supplement/tags",
};
