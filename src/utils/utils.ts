import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function dropNextDelivery() {
	let quater = "";
	const month = new Date().getMonth();
	if (month > 9) {
		quater = "January";
	}
	if (month >= 6 && month < 9) {
		quater = "October";
	}
	if (month >= 3 && month < 6) {
		quater = "July";
	}
	quater = "April";

	return `${quater} 1st ${new Date().getFullYear()}`;
}
