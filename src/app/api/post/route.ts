import {NextRequest, NextResponse} from "next/server";
import {allPostsQuery} from "@/utils/queries";
import {client} from "../../../../sanity/lib/client";

export async function GET(request: NextRequest) {
    const query = allPostsQuery();

    const data = await client.fetch(query);

    return NextResponse.json(data, {status: 200})
}

export async function POST(request: NextRequest) {
    const post = await request.json();

    console.log("Post", post)

    client.create(post).then(() => NextResponse.json({message: 'Video Created'}, {status: 201}))

    return NextResponse.json('Video Created', {status: 200})
}