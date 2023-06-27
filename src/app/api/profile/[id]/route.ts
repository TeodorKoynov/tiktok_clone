import {NextRequest, NextResponse} from "next/server";
import {singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery} from "@/utils/queries";
import {client} from "../../../../../sanity/lib/client";

export async function GET(request: NextRequest, {params}: { params: { id: string } }) {
    const id = params.id;

    const user = await client.fetch(singleUserQuery(id));
    const userVideos = await client.fetch(userCreatedPostsQuery(id))
    const userLikedVideos = await client.fetch(userLikedPostsQuery(id))

    if (user) {
        return NextResponse.json({user: user[0], userVideos, userLikedVideos}, {status: 200});
    }

    return NextResponse.json('', {status: 404});
}