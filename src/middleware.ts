// middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import { ApiMiddleware } from "./middlewares/api.middleware";
import { DashboardMiddleware } from "./middlewares/dashboard.middleware";

const routeMiddlewares = [
	{ pattern: /^\/dashboard(\/|$)/, handler: DashboardMiddleware },
	{ pattern: /^\/products(\/|$)/, handler: ApiMiddleware },
];

export function middleware(req: NextRequest) {
	const url = req.nextUrl.pathname;

	for (const { pattern, handler } of routeMiddlewares) {
		if (pattern.test(url)) {
			return handler(req);
		}
	}

	return NextResponse.next();
}
