import Link from "next/link";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<header className="w-full h-[78px] md:h-[62px] bg-blue text-white flex justify-center items-center m-auto">
				<Link
					className="text-[24px] md:text-[40px] leading-[27px] md:leading-[46px] font-hagerman"
					href="/"
				>
					Supplement Club
				</Link>
			</header>

			<div className="px-[16px] pt-[24px] md:p-[0]">{children}</div>
		</div>
	);
}
