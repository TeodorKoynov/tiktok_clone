"use client";

import {useState} from "react";
import Image from "next/image";
import {GoVerified} from "react-icons/go";
import Link from "next/link";
import useAuthStore from "@/store/authStore";

import VideoCard from "@/components/VideoCard";
import NoResults from "@/components/NoResults";
import {IUser, Video} from "@/types";

interface IProps {
    videos: Video[],
    searchTerm: string,
}

const SearchResults = ({videos, searchTerm}: IProps) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const {allUsers} = useAuthStore();

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

    const searchAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className={"w-full"}>
            <div className={"flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full"}>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
                   onClick={() => setIsAccounts(true)}>
                    Accounts
                </p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
                   onClick={() => setIsAccounts(false)}>
                    Videos
                </p>
            </div>
            {isAccounts ? (
                <div className={"md:mt-8"}>
                    {searchAccounts.length > 0 ? (
                        searchAccounts.map((user: IUser, index) => (
                            <Link key={index} href={`/profile/${user._id}`}>
                                <div className={"flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200"}>
                                    <div>
                                        <Image
                                            src={user.image}
                                            width={50}
                                            height={50}
                                            alt={"user profile"}
                                            className={"rounded-full"}/>
                                    </div>

                                    <div>
                                        <p className={"flex gap-1 items-center text-md font-bold text-primary lowercase"}>
                                            {user.userName.replaceAll(' ', '')}
                                            <GoVerified className={"text-blue-400"}/>
                                        </p>
                                        <p className={"capitalize text-gray-400 text-xs"}>
                                            {user.userName}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (<NoResults text={`No account results for ${searchTerm}`}/>)}
                </div>
            ) : (
                <div className={"md:mt-16 flex flex-wrap gap-6 md:justify-start"}>
                    {videos.length ? (
                        videos.map((video, index) => (
                            <VideoCard post={video} key={index}/>
                        ))
                    ) : (<NoResults text={`No video results for ${searchTerm}`}/>)}
                </div>
            )}
        </div>
    )
}

export default SearchResults;