import {NextRequest, NextResponse} from "next/server";
import {postDetailQuery} from "@/utils/queries";
import {client} from "../../../../../sanity/lib/client";

export async function GET(request: NextRequest, {params}: { params: { id: string } }) {
    const id = params.id;
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    if (!data) {
        return NextResponse.json({error: "Error!"}, {status: 404})
    }

    return NextResponse.json(data[0], {status: 200})
}