import { type NextRequest, NextResponse } from "next/server";

export async function ApiMiddleware(req: NextRequest) {
	// Get the session cookie, default to null if not found
	const sessionCookie = req.cookies.get("session");

	// Initialize sessionData as null or parse the session cookie if available
	const sessionData = sessionCookie ? JSON.parse(sessionCookie.value) : null;

	// If sessionCookie exists and contains a valid token, set the Authorization header
	if (sessionData?.state?.user?.token) {
		req.headers.set("Authorization", `Bearer ${sessionData.state.user.token}`);
	}

	// Return the response
	return NextResponse.next();
}
