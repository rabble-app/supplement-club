import Link from "next/link";

import { Button } from "./ui/button";

export default function ReferFriends() {
	return (
		<div className="flex flex-col mx-auto md:w-[calc(100%-100px)]">
			<Button
				className="bg-blue text-white h-[48px] text-[16px] leading-[24px]"
				asChild
			>
				<Link href="#">Refer Friends </Link>
			</Button>

			<p
				className="text-[14px] leading-[16px] font-bold font-inconsolata text-blue flex justify-center items-center bg-blue2 
h-[31px] px-[8px] md:mt-[8px] text-center"
			>
				Earn £5 for each friend who joins! They get £5 off too.
			</p>
		</div>
	);
}
