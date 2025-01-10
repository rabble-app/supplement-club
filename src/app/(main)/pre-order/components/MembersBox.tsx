import Image from "next/image";

import { Separator } from "@radix-ui/react-separator";

import MembersLaunches from "./MembersLaunches";

export default function MembersBox() {
	return (
		<div className="py-[24px] bg-white rounded-[4px] shadow-3">
			<div className="pb-[26px] px-[16px]">
				<div className="text-blue grid grid-cols-[18px_1fr] gap-x-[4px] items-center text-[24px] leading-[25px] font-bold font-inconsolata">
					<Image
						src="/images/icons/people.svg"
						alt="People logomark"
						width={30}
						height={30}
					/>
					46 Members
				</div>
				<div>4 more pre-orders until product launches!</div>
			</div>

			<Separator className="bg-grey22 h-[1px]" />

			<div className="px-[16px]">
				<MembersLaunches members={46} />
			</div>
		</div>
	);
}
