/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/authenticate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrivyClient, AuthTokenClaims } from "@privy-io/server-auth";

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
const client = new PrivyClient(PRIVY_APP_ID!, PRIVY_APP_SECRET!);

export type AuthenticateSuccessResponse = {
  claims: AuthTokenClaims;
};

export type AuthenticationErrorResponse = {
  error: string;
};

export async function GET(request: NextRequest) {
  return handleAuth(request);
}

export async function POST(request: NextRequest) {
  return handleAuth(request);
}

async function handleAuth(request: NextRequest) {
  // Get auth token from Authorization header
  const headerAuthToken = request.headers.get("authorization")?.replace(/^Bearer /, "");
  
  // Get auth token from cookies
  const cookieAuthToken = request.cookies.get("privy-token")?.value;

  const authToken = cookieAuthToken ?? headerAuthToken;
  
  if (!authToken) {
    return NextResponse.json(
      { error: "Missing auth token" },
      { status: 401 }
    );
  }

  try {
    const claims = await client.verifyAuthToken(authToken);
    return NextResponse.json({ claims });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 401 }
    );
  }
}