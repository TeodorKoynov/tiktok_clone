import VideoDetail from "@/components/VideoDetail";
import axios from "axios";
import {BASE_URL} from "@/utils";
import {Video} from "@/types";

export default async function DetailPage({params}: { params: { id: string } }) {
    const {data: postDetail}: { data: Video } = await axios.get(`${BASE_URL}/api/post/${params.id}`);

    console.log("data on ofdos", postDetail)

    return (
        <div className={""}>
            <VideoDetail post={postDetail}/>
        </div>
    )
}