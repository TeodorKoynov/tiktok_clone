import {NextRequest, NextResponse} from "next/server";
import {uuid} from "uuidv4";
import {client} from "../../../../sanity/lib/client";

export async function PUT(request: NextRequest) {
    const {userId, postId, like} = await request.json();

    const data =
        like ? await client
                .patch(postId)
                .setIfMissing({likes: []})
                .insert('after', 'likes[-1]', [
                    {
                        _key: uuid(),
                        _ref: userId,
                    }
                ])
                .commit()
            : await client
                .patch(postId)
                .unset([`likes[_ref=="${userId}"]`])
                .commit();

    return NextResponse.json(data, {status: 200})
}