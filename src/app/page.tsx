import axios from "axios";
import VideoCard from "@/components/VideoCard";
import {Video} from "@/types"
import NoResults from "@/components/NoResults";
import {BASE_URL} from "@/utils";

export default async function Home({
                                       params,
                                       searchParams,
                                   }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const url = !searchParams.topic ? `${BASE_URL}/api/post` : `${BASE_URL}/api/discover/${searchParams.topic}`
    const {data: videos}: { data: Video[] } = await axios.get(url);

    console.log("params", params);
    console.log("searchParams", searchParams.topic)

    return (
        <div className={"flex flex-col gap-10 videos h-full"}>
            {videos.length ? videos.map((video: Video) => (
                <VideoCard key={video._id} post={video}/>
            )) : (
                <NoResults text={"No videos"}/>
            )}
        </div>
    )
}
