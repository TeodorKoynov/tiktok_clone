import axios from "axios";
import {BASE_URL} from "@/utils";
import SearchResults from "@/components/SearchResults";

export default async function SearchPage({params}: { params: { searchTerm: string } }) {
    const {data} = await axios.get(`${BASE_URL}/api/search/${params.searchTerm}`)

    return <div>
        <SearchResults videos={data} searchTerm={params.searchTerm}/>
    </div>
}