import axios from "axios";
import VideoCard from "@/components/VideoCard";
import {Video} from "@/types"
import NoResults from "@/components/NoResults";

export default async function Home() {
    const {data: videos}: { data: Video[] } = await axios.get(`http://localhost:3000/api/post`);

    console.log("Res", videos)

    return (
        <div className={"flex flex-col gap-10 videos h-full"}>
            {videos.length ? videos.map((video: Video) => (
                <VideoCard key={video._id} post={video}/>
            )): (
              <NoResults text={"No videos"} />
            )}
        </div>
    )
}
