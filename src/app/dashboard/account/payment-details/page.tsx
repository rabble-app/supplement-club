"use client";
import AddPaymentDialog from "@/components/shared/AddPaymentDialog";
import PaymentCards from "@/components/shared/PaymentCards";

export default function AccountPaymentDetails() {
	function successAction() {
		// fetch cards
	}
	return (
		<>
			<div className="mx-auto max-w-[600px]">
				<PaymentCards editable={true} />
				<AddPaymentDialog totalPrice={0} successAction={successAction} />
			</div>
		</>
	);
}
