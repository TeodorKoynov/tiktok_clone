import {NextRequest, NextResponse} from "next/server";
import {searchPostsQuery} from "@/utils/queries";
import {client} from "../../../../../sanity/lib/client";

export async function GET(request: NextRequest, {params}: { params: { searchTerm: string } }) {
    const searchTerm = params.searchTerm;

    const videosQuery = searchPostsQuery(searchTerm);

    const videos = await client.fetch(videosQuery);

    if (videos) {
        return NextResponse.json(videos, {status: 200});
    }

    return NextResponse.json('', {status: 404});
}