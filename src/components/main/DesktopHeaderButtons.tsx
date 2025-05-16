import { useUser } from "@/contexts/UserContext";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const UserProfile = ({ user }: { user?: IUserResponse }) => (
	<div className="flex gap-x-[8px] text-white px-[24px]">
		<Image
			src="/images/user-profile.svg"
			alt="User profile icon"
			width={16}
			height={16}
		/>
		<div className="font-inconsolata font-bold text-[16px]">
			{user?.firstName && (
				<Link
					href="/dashboard"
					className="font-inconsolata font-bold text-[16px]"
				>
					{user.firstName
						? `${user.firstName} ${user.lastName?.slice(0, 1)}.`
						: "Welcome"}
				</Link>
			)}
			{!user && (
				<Link
					href="/auth/login"
					className="font-inconsolata font-bold text-[16px]"
				>
					Login
				</Link>
			)}
		</div>
	</div>
);

export default function DesktopHeaderButtons() {
	const context = useUser();
	return (
		<div className="hidden lg:flex lg:gap-x-[24px] lg:items-center">
			<UserProfile user={context?.user ?? undefined} />

			{context?.user && (
				<Button onClick={() => context?.logout()}>
					<Image
						src="/images/logout.svg"
						alt="Logout icon"
						width={24}
						height={24}
					/>
				</Button>
			)}
		</div>
	);
}
