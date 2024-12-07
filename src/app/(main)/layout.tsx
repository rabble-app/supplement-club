"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useEffect(() => {
		if (typeof document !== "undefined") {
			// Create a target div for portals
			const portalRoot = document.createElement("div");
			portalRoot.setAttribute("id", "portal-root");
			document.body.appendChild(portalRoot);

			return () => {
				// Clean up on unmount
				document.body.removeChild(portalRoot);
			};
		}
	}, []);
	return (
		<div>
			<Header />

			{children}

			<Footer />
		</div>
	);
}
