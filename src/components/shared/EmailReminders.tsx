import Image from "next/image";

export default function EmailReminders() {
	return (
		<div className="grid gap-[11px]">
			<div className="flex gap-[5px] items-center font-bold text-[16px] leading-[18px]">
				<Image
					src="/images/icons/email-icon.svg"
					alt="Email icon"
					width={24}
					height={24}
				/>{" "}
				Email Reminders
			</div>
			<p className="text-[12px] leading-[13px] text-grey4">
				We notify you with enough time to make changes before each order
			</p>
		</div>
	);
}
