import {NextRequest, NextResponse} from "next/server";
import {client} from "../../../../sanity/lib/client";

export async function POST(request: NextRequest) {
    const user = await request.json();

    client.createIfNotExists(user)
        .then(() => NextResponse.json({message: 'Login success'}, {status: 200})
        );

    return NextResponse.json({message: 'ok'}, {status: 200})
}