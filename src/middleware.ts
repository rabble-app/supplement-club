import { type NextRequest, NextResponse } from "next/server";
import { DashboardMiddleware } from "./middlewares/dashboard.middleware";

const routeMiddlewares = [
	{ pattern: /^\/dashboard(\/|$)/, handler: DashboardMiddleware },
];

export function middleware(req: NextRequest) {
	if (process.env.NODE_ENV === "production") {
		const protoHeader = req.headers.get("x-forwarded-proto");

		if (!protoHeader || protoHeader.split(",")[0].trim() !== "https") {
			const secureUrl = req.nextUrl.clone();
			secureUrl.protocol = "https";

			return NextResponse.redirect(secureUrl, 301);
		}
	}

	const res = NextResponse.next(); // Initialize response

	// ✅ Set cookie if "ref" query param exists
	const searchParams = req.nextUrl.searchParams;
	if (searchParams.has("ref")) {
		res.cookies.set("refCode", searchParams.get("ref") ?? "", {
			httpOnly: false,
			secure: process.env.NODE_ENV === "production",
			path: "/",
		});
	}

	const url = req.nextUrl.pathname;

	for (const { pattern, handler } of routeMiddlewares) {
		if (pattern.test(url)) {
			return handler(req); // Run the specific middleware for matching routes
		}
	}

	return res; // ✅ Always return the response to apply cookie changes
}
