import type React from "react";

interface PricePerCapsuleProps {
	capsules: number;
	price: number;
}

const PricePerCapsule: React.FC<PricePerCapsuleProps> = ({
	capsules,
	price,
}) => {
	const pricePerCapsule = (price / capsules).toFixed(2);

	return (
		<div className="text-[20px] font-bold text-black flex items-center gap-[5px] font-inconsolata">
			£{price}{" "}
			<span className="text-[12px] leading-[13px] md:leading-[12px] text-grey1 font-inconsolata font-bold">
				(£{pricePerCapsule} / capsule)
			</span>
		</div>
	);
};

export default PricePerCapsule;
