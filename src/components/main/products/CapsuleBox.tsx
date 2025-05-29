import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Separator } from "@radix-ui/react-separator";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import OrderSummaryCard from "@/components/shared/OrderSummaryCard";
import { Button } from "@/components/ui/button";
import type IOrderSummaryModel from "@/utils/models/IOrderSummaryModel";
import type { ICapsuleInfoModel } from "@/utils/models/api/ICapsuleInfoModel";
import Link from "next/link";

const generateImage = (count: number, unitsOfMeasurePerSubUnit?: string) => (
	<div
		className="flex justify-center mx-auto relative h-[24px]"
		style={{ width: `${20 * count}px` }}
	>
		{unitsOfMeasurePerSubUnit === "grams" && (
			<Image
				key={`pill-${1 * count}`}
				className="absolute"
				src="/images/icons/gram-link-icon.svg"
				alt="pillow icon "
				width={24}
				height={24}
			/>
		)}

		{unitsOfMeasurePerSubUnit !== "grams" &&
			Array.from({ length: count }).map((_, index) => (
				<Image
					key={`pill-${index + 1 * count}`}
					className="absolute"
					style={{
						left: `${index * 20}px`,
					}}
					src={`${unitsOfMeasurePerSubUnit !== "grams" ? "/images/icons/pillow-icon.svg" : "/images/icons/gram-link-icon.svg"}`}
					alt={`pillow icon ${index + 1}`}
					width={24}
					height={24}
				/>
			))}
	</div>
);

export default function CapsuleBox({
	unitsOfMeasurePerSubUnit,
	capsuleInfo,
	rrp,
	isComming,
	orders,
	productId,
	price,
	selectCapsulePerDayAction,
}: Readonly<{
	unitsOfMeasurePerSubUnit?: string;
	capsuleInfo?: ICapsuleInfoModel[];
	rrp: number;
	price: number;
	isComming?: boolean;
	productId?: string;
	orders?: IOrderSummaryModel[];
	selectCapsulePerDayAction: (val: number) => void;
}>) {
	const days = 90;
	const [selectedState, setSelectedState] = useState(2);
	const [capsuleCount, setCapsuleCount] = useState(0);
	const [calculatedRrp, setCalculatedRrp] = useState(0);

	const [units] = useState(
		["grams", "gm"].includes(unitsOfMeasurePerSubUnit ?? "")
			? "g"
			: " Capsules",
	);

	const capsules = useMemo(() => selectedState * days, [selectedState]);
	const discount = useMemo(
		() => Math.abs(price / rrp - 1).toFixed(2),
		[price, rrp],
	);

	useEffect(() => {
		if (capsuleInfo) setSelectedState(capsuleInfo[1].capsuleCount);
	}, [capsuleInfo]);

	useEffect(() => {
		setCapsuleCount(
			capsuleInfo?.find((c) => c.capsuleCount === selectedState)
				?.capsuleCount ?? 0,
		);
	}, [capsuleInfo, selectedState]);
	useEffect(() => {
		const response = (capsules * 0.25) / (1 - Number.parseFloat(discount));
		setCalculatedRrp(response);
	}, [discount, capsules]);

	function selectCapsulte(value: number) {
		setSelectedState(value);
		selectCapsulePerDayAction(value);
	}

	const updateQuantityAction = useCallback((val: number) => {
		console.log(val);
	}, []);

	const getCapsuleLabel = (capsuleCount: number) =>
		`${capsuleCount}${units} per Day`;

	return (
		<div className="grid gap-[5px]">
			<RadioGroup
				value={selectedState.toString()}
				onValueChange={(value) => selectCapsulte(Number(value))}
				className={`grid gap-[5px] ${capsuleInfo?.length === 2 ? "md:grid-cols-2" : capsuleInfo?.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}
			>
				{capsuleInfo?.map((option) => (
					<label
						key={option.capsuleCount}
						className={`grid gap-[8px] pt-[6px] pb-[8px] px-[8px] relative cursor-pointer min-h-[239px] ${
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
						<div className="grid gap-[8px] justify-center max-h-[56px]">
							<RadioGroupItem
								value={option.capsuleCount.toString()}
								className="mx-auto"
							/>
							{generateImage(option.capsuleCount, unitsOfMeasurePerSubUnit)}
						</div>
						<p className="text-[12px] h-[14px] font-bold font-helvetica text-center">
							{getCapsuleLabel(option.capsuleCount)}
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
										3 Month Subscription <br />({capsules}
										{units})
									</p>
									<div className="max-w-[164px] grid grid-cols-2 gap-[7px]">
										<div className="flex flex-col gap-[7px] text-[16px] leading-[18px] font-bold">
											£{(capsules * 0.25)?.toFixed(2)}
											<span className="text-[10px] leading-[11.5px] font-bold text-grey1">
												(£0.25/count)
											</span>
										</div>
										<div>
											<div className="text-[16px] leading-[18px] text-grey4">
												RRP{" "}
												<span className="text-[16px] leading-[18px] font-bold">
													£{calculatedRrp.toFixed(2)}{" "}
												</span>
											</div>
											<div className="text-[16px] leading-[18px] font-bold text-blue">
												{(Number.parseFloat(discount) * 100).toFixed(0)}% OFF
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-[2px]">
									<p className="text-grey7 text-[12px] leading-[13px]">
										{getCapsuleLabel(capsuleCount)}
									</p>
									<p className="text-[12px] leading-[14px]">
										{
											capsuleInfo?.find((c) => c.capsuleCount === selectedState)
												?.others
										}
									</p>
								</div>
							</div>
						)}
					</label>
				))}
			</RadioGroup>
			<div className="hidden md:grid gap-[16px] outline outline-[2px] outline-blue p-[16px]">
				<div className="flex flex-col gap-[2px]">
					<p className="text-grey7 text-[12px] leading-[12px]">
						{getCapsuleLabel(
							capsuleInfo?.find((c) => c.capsuleCount === selectedState)
								?.capsuleCount || 0,
						)}
					</p>
					<p className="text-[12px] leading-[14px]">
						{capsuleInfo?.find((c) => c.capsuleCount === selectedState)?.others}
					</p>
				</div>

				<div className="grid gap-[16px]">
					{orders?.map((order) => (
						<OrderSummaryCard
							updateQuantityAction={updateQuantityAction}
							key={order.id}
							model={order}
						/>
					))}
					<Button className="bg-blue text-white w-full font-bold fixed bottom-[0] left-[0] md:relative z-[100]">
						<Link
							className="w-full h-full flex items-center justify-center"
							href={`/products/${productId}/checkout`}
						>
							{isComming ? "REGISTER PRE-ORDER" : "Start My Subscription"}
						</Link>
					</Button>

					{isComming && (
						<div className="text-[14px] leading-[16px] text-grey6 text-center px-[30px] font-helvetica">
							You’ll be notified when your team launches. You’ll have 24 hours
							to withdraw before payment is taken.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
