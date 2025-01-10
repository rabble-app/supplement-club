import { DialogClose } from "@radix-ui/react-dialog";

import Image from "next/image";
import Link from "next/link";

export default function UserLoggedOut() {
	return (
		<DialogClose asChild>
			<Link href="/auth/login">
				<div className="flex gap-x-[8px] text-white items-center justify-center border-[1px] border-blue5 h-[38px] text-[16px] leading-[16px] font-inconsolata">
					<Image
						src="/images/user-profile.svg"
						alt="User profile icon"
						width={16}
						height={16}
					/>
					Login
				</div>
			</Link>
		</DialogClose>
	);
}
