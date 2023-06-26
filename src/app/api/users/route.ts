import {NextRequest, NextResponse} from "next/server";
import {client} from "../../../../sanity/lib/client";
import {allUsersQuery} from "@/utils/queries";

export async function GET(request: NextRequest) {
    const data = await client.fetch(allUsersQuery());

    if (data) {
        return NextResponse.json(data, {status: 200});
    }

    return NextResponse.json([], {status: 200});
}