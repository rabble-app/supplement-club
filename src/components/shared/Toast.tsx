import Image from "next/image";
import { toast as sonnerToast } from "sonner";

export enum StatusToast {
	SUCCESS = "bg-[#424448] text-[#F5F6F6] font-helvetica text-[12px] rounded-[100px]",
	ERROR = "bg-[#FEE4E2] text-[#B42318] font-helvetica text-[12px] rounded-lg",
}

type Position =
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right"
	| "top-center"
	| "bottom-center";

interface ToastProps {
	title: string;
	status: StatusToast;
	position?: Position;
}

export function CustomToast(toast: Omit<ToastProps, "id">) {
	return sonnerToast.custom(
		() => <Toast status={toast.status} title={toast.title} />,
		{
			position: toast.position ?? "top-right",
			className: "flex justify-center items-center w-full",
		},
	);
}

function Toast(props: Readonly<ToastProps>) {
	const { title, status } = props;

	return (
		<div className={`flex items-center justify-center p-4 ${status}`}>
			<div className="flex gap-[5px] items-center">
				{status === StatusToast.ERROR && (
					<Image
						src="/images/icons/error-icon.svg"
						alt="error icon"
						width={16}
						height={16}
					/>
				)}
				<div className="w-full">
					<p className={`text-sm font-medium ${status}`}>{title}</p>
				</div>
			</div>
		</div>
	);
}
