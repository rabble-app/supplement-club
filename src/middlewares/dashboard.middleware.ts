import { type NextRequest, NextResponse } from "next/server";
const LOGIN_ROUTE = "/auth/login";

export async function DashboardMiddleware(req: NextRequest) {
	const sessionCookie = req.cookies.get("session");

	// Check if the session cookie exists and is valid
	if (!sessionCookie) {
		const loginUrl = req.nextUrl.clone();
		loginUrl.pathname = LOGIN_ROUTE;

		// Add the current path to the query parameters for redirection after login
		loginUrl.searchParams.set("redirect", req.nextUrl.pathname);

		return NextResponse.redirect(loginUrl);
	}

	// Allow the request to proceed if the session is valid
	return NextResponse.next();
}
