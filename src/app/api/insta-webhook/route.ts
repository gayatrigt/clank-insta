import { NextResponse } from "next/server";

export async function GET(_request: Request) {
    try {
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
