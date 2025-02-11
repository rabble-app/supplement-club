import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />

			{children}

			<Footer />
		</div>
	);
}
