import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cookies } from "next/headers";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookiesStore = (await cookies()).get("session");
	const state = cookiesStore ? JSON.parse(cookiesStore.value).state : null;

	return (
		<div>
			<Header user={state?.user} />

			{children}

			<Footer />
		</div>
	);
}
