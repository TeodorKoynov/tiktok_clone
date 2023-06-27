import Profile from "@/components/Profile";
import axios from "axios";
import {BASE_URL} from "@/utils";

export default async function ProfilePage({params}: { params: { id: string } }) {
    const {data} = await axios.get(`${BASE_URL}/api/profile/${params.id}`)

    return <div>
        <Profile data={data}/>
    </div>
}