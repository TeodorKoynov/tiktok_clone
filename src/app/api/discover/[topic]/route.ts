import {NextRequest, NextResponse} from "next/server";
import {topicPostsQuery} from "@/utils/queries";
import {client} from "../../../../../sanity/lib/client";

export async function GET( request: NextRequest, {params}: { params: { topic: string } }) {
    const topic = params.topic;

    const videosQuery = topicPostsQuery(topic);

    const videos = await client.fetch(videosQuery);

    if (videos) {
        return NextResponse.json(videos, {status: 200});
    }

    return NextResponse.json('', {status: 404});
}