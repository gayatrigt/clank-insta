import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    const VERIFY_TOKEN = 'clanker'; // Replace with your actual verify token

    if (mode && token === VERIFY_TOKEN) {
        if (mode === 'subscribe') {
            return new Response(challenge, { status: 200 });
        }
    }

    return NextResponse.json({ success: false }, { status: 403 });
}

export async function POST(request: Request) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const body = await request.json();
        console.log('Webhook received:', body);
        // Process the webhook payload here

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
