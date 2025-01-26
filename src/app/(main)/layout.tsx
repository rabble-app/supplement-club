import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
