import Image from "next/image";
import { useMemo, useState } from "react";

import { Separator } from "@radix-ui/react-separator";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { ICapsuleInfoModel } from "@/utils/models/api/ICapsuleInfoModel";

const generateImage = (count: number) => (
	<div
		className="flex justify-center mx-auto relative h-[24px]"
		style={{ width: `${20 * count}px` }}
	>
		{Array.from({ length: count }).map((_, index) => (
			<Image
				key={`pill-${index + 1 * count}`}
				className="absolute"
				style={{
					left: `${index * 20}px`,
				}}
				src="/images/icons/pillow-icon.svg"
				alt={`pillow icon ${index + 1}`}
				width={24}
				height={24}
			/>
		))}
	</div>
);

export default function CapsuleBox({
	capsuleInfo,
	rrp,
	selectCapsulePerDayAction,
}: Readonly<{
	capsuleInfo?: ICapsuleInfoModel[];
	rrp?: number;
	selectCapsulePerDayAction: (val: number) => void;
}>) {
	const days = 90;
	const [selectedState, setSelectedState] = useState(2);

	const capsules = useMemo(() => selectedState * days, [selectedState]);

	function selectCapsulte(value: number) {
		setSelectedState(value);
		selectCapsulePerDayAction(value);
	}

	return (
		<div className="grid gap-[5px]">
			<RadioGroup
				value={selectedState.toString()}
				onValueChange={(value) => selectCapsulte(Number(value))}
				className="md:grid-cols-4"
			>
				{capsuleInfo?.map((option) => (
					<label
						key={option.capsuleCount}
						className={`grid gap-[8px] p-[8px] relative cursor-pointer ${
							selectedState === option.capsuleCount
								? "outline outline-[2px] outline-blue border-b-transparent pb-[7px] mb-[-2px]"
								: "border-[1px] border-grey18"
						}`}
					>
						<input
							type="radio"
							value={option.capsuleCount}
							checked={selectedState === option.capsuleCount}
							onChange={() => selectCapsulte(option.capsuleCount)}
							className="sr-only" // Hide the input but keep it accessible
						/>
						<div className="grid gap-[8px] justify-center">
							<RadioGroupItem
								value={option.capsuleCount.toString()}
								className="mx-auto"
							/>
							{generateImage(option.capsuleCount)}
						</div>
						<p className="text-[12px] leading-[13px] font-bold font-helvetica text-center">
							{option.title1}
						</p>
						<Separator className="bg-grey3 h-[1px]" />
						<div className="grid gap-[4px]">
							<p className="text-grey6 text-[14px] leading-[16px]">
								{option.title1}
							</p>
							<p className="text-grey7 text-[12px] leading-[14px]">
								{option.description1}
							</p>
						</div>
						<Separator className="bg-grey3 h-[1px]" />
						<div className="grid gap-[4px]">
							<p className="text-grey6 text-[14px] leading-[16px]">
								{option.title2}
							</p>
							<p className="text-grey7 text-[12px] leading-[14px]">
								{option.description2}
							</p>
						</div>
						{selectedState === option.capsuleCount && (
							<div className="hidden md:flex absolute bottom-[-10px] w-full h-[20px] bg-white" />
						)}
						{selectedState === option.capsuleCount && (
							<div
								key={option.capsuleCount}
								className="grid md:hidden gap-[8px]"
							>
								<div className="flex justify-between gap-[7px]">
									<p className="text-grey7 text-[12px] leading-[14px] max-w-[132px]">
										3 Month Subscription <br />({capsules} Capsules)
									</p>
									<div className="max-w-[164px] grid grid-cols-2 gap-[7px]">
										<div className="flex flex-col gap-[7px] text-[16px] leading-[18px] font-bold">
											£{(capsules * 0.25)?.toFixed(2)}
											<span className="text-[10px] leading-[11.5px] font-bold text-grey1">
												(£0.25/capsule)
											</span>
										</div>
										<div>
											<div className="text-[16px] leading-[18px] text-grey4">
												RRP{" "}
												<span className="text-[16px] leading-[18px] font-bold">
													£{rrp}{" "}
												</span>
											</div>
											<div className="text-[16px] leading-[18px] font-bold text-blue">
												{((capsules * 0.25) / Number(rrp)).toFixed(2)}% OFF
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-[2px]">
									<p className="text-[12px] leading-[13px]">off</p>
								</div>
							</div>
						)}
					</label>
				))}
			</RadioGroup>
			<div className="hidden md:grid grid-cols-[132px_1fr] gap-[16px] outline outline-[2px] outline-blue p-[16px]">
				<div className="grid gap-[7px]">
					<p className="text-grey7 text-[12px] leading-[14px]">
						3 Month Subscription <br />({capsules} Capsules)
					</p>
					<div className="flex items-center gap-[2px] text-[16px] leading-[18px] font-bold">
						£{(capsules * 0.25).toFixed(2)}{" "}
						<span className="text-[10px] leading-[11.5px] font-bold text-grey1">
							(£0.25/capsule)
						</span>
					</div>
					<div>
						<div className="text-[16px] leading-[18px] text-grey4">
							RRP{" "}
							<span className="text-[16px] leading-[18px] font-bold">
								£{rrp}{" "}
							</span>
						</div>
						<div className="text-[16px] leading-[18px] font-bold text-blue">
							{((capsules * 0.25) / Number(rrp)).toFixed(2)}% OFF
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-[2px]">
					<p className="text-grey7 text-[12px] leading-[13px]">
						{capsuleInfo?.find((c) => c.capsuleCount === selectedState)?.title3}
					</p>
					<p className="text-[12px] leading-[13px]">
						{
							capsuleInfo?.find((c) => c.capsuleCount === selectedState)
								?.description3
						}
					</p>
				</div>
			</div>
		</div>
	);
}
