import {NextRequest, NextResponse} from "next/server";
import {allPostsQuery} from "@/utils/queries";
import {client} from "../../../../sanity/lib/client";

export async function GET(request: NextRequest) {
    const query = allPostsQuery();

    const data = await client.fetch(query);

    return NextResponse.json(data, {status: 200})
}