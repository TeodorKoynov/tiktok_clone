import {NextRequest, NextResponse} from "next/server";
import {postDetailQuery} from "@/utils/queries";
import {client} from "../../../../../sanity/lib/client";
import {uuid} from "uuidv4";

export async function GET(request: NextRequest, {params}: { params: { id: string } }) {
    const id = params.id;
    const query = postDetailQuery(id);

    const data = await client.fetch(query);

    if (!data) {
        return NextResponse.json({error: "Error!"}, {status: 404})
    }

    return NextResponse.json(data[0], {status: 200})
}

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
    const id = params.id;
    const {comment, userId} = await request.json();
    const data = await client
        .patch(id)
        .setIfMissing({comments: []})
        .insert('after', 'comments[-1]', [
            {
                comment,
                _key: uuid(),
                postedBy: {
                    _type: 'postedBy',
                    _ref: userId
                }
            }
        ])
        .commit()

    return NextResponse.json(data, {status: 200})
}