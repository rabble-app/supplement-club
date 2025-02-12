import { toast } from "sonner";
import Notify from "./Notify"; // Adjust import based on your project

export function ShowErrorToast(error?: string, defaultMsg?: string) {
	let message = defaultMsg ?? "An error occurred";

	if (error) {
		try {
			message = JSON.parse(error).message;
		} catch {
			message = error; // Fallback if parsing fails
		}
	}

	toast.custom(() => <Notify message={message} />, {
		position: "top-right",
	});
}
