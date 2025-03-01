/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// app/api/pool/[poolAddress]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PoolResponse } from '~/utils/types/gecko';

const BASE_URL = 'https://api.geckoterminal.com/api/v2';
const API_VERSION = '20230302';
const NETWORK = 'base';

export async function GET(request: NextRequest) {
  // Get the pool address from the query parameter
  const { searchParams } = new URL(request.url);
  const poolAddress = searchParams.get('address');
  
  if (!poolAddress) {
    return NextResponse.json(
      { error: 'Pool address is required as a query parameter' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${BASE_URL}/networks/${NETWORK}/pools/${poolAddress}`,
      {
        headers: {
          'Accept': `application/json;version=${API_VERSION}`,
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch pool data' },
        { status: response.status }
      );
    }

    const data: PoolResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching pool data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}