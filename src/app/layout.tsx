import { UserProvider } from "@/contexts/UserContext";
import type { Metadata } from "next";
import { Figtree, Inconsolata, Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import "./../../public/styles/globals.css";

/** @fonts */
const helvetica = localFont({
	src: "./../../public/fonts/GeistVF.woff",
	variable: "--font-helvetica",
	display: "block",
});
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "block",
});
const figtree = Figtree({
	subsets: ["latin"],
	variable: "--font-figtree",
	display: "block",
});
const roboto = Roboto({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-roboto",
	display: "block",
});
const inconsolata = Inconsolata({
	subsets: ["latin"],
	weight: ["400", "700", "800", "900"],
	variable: "--font-inconsolata",
	display: "block",
});

const hagerman = localFont({
	src: "./../../public/fonts/Hagerman_Font Regular.ttf",
	variable: "--font-hagerman",
	display: "block",
});

const pro = localFont({
	src: "./../../public/fonts/SF-ProText-Regular.ttf",
	variable: "--sf-pro-text",
	display: "block",
});

const poppins = localFont({
	src: "./../../public/fonts/Poppins-Medium.ttf",
	variable: "--poppins",
	display: "block",
});

export const metadata: Metadata = {
	title: "Supplement Club",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookiesStore = (await cookies()).get("session");
	const state = cookiesStore ? JSON.parse(cookiesStore.value).state : null;

	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${figtree.variable} ${roboto.variable} ${poppins.variable} ${helvetica.variable} ${inconsolata.variable} ${hagerman.variable} ${pro.variable} antialiased`}
			>
				<UserProvider state={state}>{children}</UserProvider>

				<Toaster richColors />
			</body>
		</html>
	);
}
