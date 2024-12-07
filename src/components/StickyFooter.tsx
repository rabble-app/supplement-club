"use client";
import { createPortal } from "react-dom";

const StickyFooter = ({
	children,
	className,
}: Readonly<{
	children: React.ReactNode;
	className?: string;
}>) => {
	// Ensure portal-root exists
	if (typeof document !== "undefined") {
		const portalRoot = document.getElementById("portal-root");
		if (!portalRoot) return null;

		return createPortal(
			<div className={className}>{children}</div>,
			portalRoot,
		);
	}
};

export default StickyFooter;
