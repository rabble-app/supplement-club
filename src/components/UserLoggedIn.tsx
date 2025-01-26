import { DialogClose } from "@radix-ui/react-dialog";

import Image from "next/image";
import { Button } from "./ui/button";

import { useUser } from "@/contexts/UserContext";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
export default function UserLoggedIn({
	user,
}: Readonly<{ user?: IUserResponse }>) {
	const context = useUser();
	return (
		<>
			<div className="font-inconsolata font-bold text-base text-center px-[24px]">
				{user?.firstName} {user?.lastName?.slice(0, 1)}.
			</div>
			<DialogClose asChild className=" w-[72px]">
				<Button
					onClick={() => context?.logout()}
					className="p-[0] flex gap-[10px] text-[16px] leading-[16px] font-inconsolata"
					asChild
				>
					<Image
						src="/images/logout.svg"
						alt="Logout icon"
						width={18}
						height={18}
					/>
					Logout
				</Button>
			</DialogClose>
		</>
	);
}
