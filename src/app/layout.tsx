import type { Metadata } from "next";
import { Figtree, Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
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

const inconsolata = localFont({
	src: "./../../public/fonts/Inconsolata.ttf",
	variable: "--font-inconsolata",
	display: "block",
});

const hagerman = localFont({
	src: "./../../public/fonts/Hagerman.ttf",
	variable: "--font-hagerman",
	display: "block",
});

export const metadata: Metadata = {
	title: "Supplement Club",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${figtree.variable} ${roboto.variable} ${helvetica.variable} ${inconsolata.variable} ${hagerman.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
