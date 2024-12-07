import MemberCard from "./MemberCard";

export default function Members() {
	return (
		<div>
			<div className="grid gap-[16px] bg-white">
				<MemberCard
					doseTitle="180 Capsules Every 3 months"
					name="FOUNDING MEMBER"
					discountTitle="10% OFF TEAM PRICE"
					doseValue="First 50 Spots"
					price={40.5}
					capsulePrice={0.22}
					spotsRemainds={4}
					forever={true}
					isActive={true}
				/>

				<MemberCard
					doseTitle="180 Capsules Every 3 months"
					name="EARLY MEMBER"
					doseValue="Next 200 Spots"
					discountTitle="5% Off Team Price"
					price={43}
					capsulePrice={0.23}
					forever={true}
				/>

				<MemberCard
					doseTitle="180 Capsules Every 3 months"
					name="MEMBER"
					capsulePrice={0.25}
					discountTitle="Standard Team Price"
					price={45}
				/>
			</div>
		</div>
	);
}
