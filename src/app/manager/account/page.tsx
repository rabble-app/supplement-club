import EmailChangeDialog from "../components/EmailChangeDialog";
import ManageAccountCard from "../components/ManageAccountCard";
import PaymentCardDialog from "../components/PaymentCardDialog";
import ShippingDetailsDialog from "../components/ShippingDetailsDialog";

export default function Account() {
	return (
		<div className="mx-auto max-w-[600px] py-[16px] md:py-[46px] flex flex-col gap-[32px] min-h-screen justify-start">
			<div className="grid gap-[16px]">
				<p className="text-[22px] leading-[28px] font-bold font-inconsolata">
					Your Account
				</p>

				<EmailChangeDialog />
			</div>

			<div className="grid gap-[16px]">
				<p className="text-[22px] leading-[28px] font-bold font-inconsolata">
					Shipping Details
				</p>

				<ShippingDetailsDialog />
			</div>

			<div className="grid gap-[16px]">
				<p className="text-[22px] leading-[28px] font-bold font-inconsolata">
					Payment Details
				</p>

				<PaymentCardDialog />

				<ManageAccountCard
					title="Billing address"
					value="Penthouse 4, Rotherfield Street, London, N1 3BU"
					imageAlt="Home icon"
					imageSrc="/images/icons/home-blue-icon.svg"
				/>
			</div>
		</div>
	);
}
