import { NextRequest, NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/server-auth";

export async function middleware(request: NextRequest) {
  const cookieAuthToken = request.cookies.get("privy-token")?.value;

  // If no cookie is found, allow the request to continue
  if (!cookieAuthToken) {
    return NextResponse.next();
  }

  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
  
  // Ensure app ID and secret are defined
  if (!PRIVY_APP_ID || !PRIVY_APP_SECRET) {
    console.error("Missing Privy credentials");
    return NextResponse.next();
  }

  const client = new PrivyClient(PRIVY_APP_ID, PRIVY_APP_SECRET);

  try {
    const claims = await client.verifyAuthToken(cookieAuthToken);
    console.log({ claims });

    // Redirect authenticated users to privacy-policy
    // Note: This applies the middleware logic from your original getServerSideProps
    return NextResponse.redirect(new URL("/privacy-policy", request.url));
  } catch (error) {
    return NextResponse.next();
  }
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ['/login'],
};