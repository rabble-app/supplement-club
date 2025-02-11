import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function Notify({ message }: Readonly<{ message: string }>) {
	const toastId = toast(message);
	return (
		<div className="grid grid-cols-[16px_228px_16px] gap-[10px] items-center text-red bg-red2 px-[16px] h-[32px]">
			<Image
				src="/images/icons/error-icon.svg"
				alt="error icon"
				width={16}
				height={16}
			/>
			<div className="text-[12px] leading-[14px] font-[500] font-poppins">
				{message}
			</div>
			<Button
				className="text-red p-[0] h-[32px]"
				onClick={() => toast.dismiss(toastId)}
			>
				<Image
					src="/images/icons/close-red-icon.svg"
					alt="Close icon"
					width={24}
					height={24}
				/>
			</Button>
		</div>
	);
}
