import Image from "next/image";

export default function Steps({
	activeStep,
}: Readonly<{ activeStep: number }>) {
	const steps = ["Create an Account", "Delivery Address", "Payment Details"];
	return (
		<div>
			{activeStep < 4 && (
				<div className="flex justify-between items-center">
					{steps.map((value, idx) => (
						<div
							key={value}
							className="grid gap-[8px] text-[12px] md:text-[14px] leading-[12px] md:leading-[15px] font-bold font-inconsolata"
						>
							<div
								className={`w-[40px] h-[40px] rounded-[50%] flex items-center justify-center mx-auto md:mx-[42px] ${activeStep === idx + 1 || activeStep > idx + 1 ? "bg-blue text-white" : "bg-grey12 text-grey17"}`}
							>
								{activeStep === idx + 1 || activeStep < idx + 1 ? (
									idx + 1
								) : (
									<Image
										src="/images/icons/check-white-icon.svg"
										alt="Check icon"
										width={16}
										height={16}
									/>
								)}
							</div>
							{value}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
