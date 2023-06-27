"use client"

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";

import {GoogleLogin, googleLogout} from "@react-oauth/google";

import {AiOutlineLogout} from "react-icons/ai";
import {BiSearch} from "react-icons/bi";
import {IoMdAdd} from "react-icons/io";

import useAuthStore from "@/store/authStore";

import Logo from "../../public/tiktik-logo.png";
import {createOrGetUser} from "@/utils";
import {useEffect, useState} from "react";
import {IUser} from "@/types";

const Navbar = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const {userProfile, addUser, removeUser} = useAuthStore();
    const [searchValue, setSearchValue] = useState();

    const router = useRouter();

    const handleSearch = (e: { preventDefault: () => void}) => {
        e.preventDefault();

        if (searchValue) {
            router.push(`/search/${searchValue}`)
        }
    }

    useEffect(() => {
        if (userProfile) {
            setUser(userProfile);
        }
    }, [userProfile])

    return (
        <div className={"w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 z-50"}>
            <Link href={'/'}>
                <div className={"w-[100px] md:w-[130px]"}>
                    <Image
                        className={"cursor-pointer responsive"}
                        src={Logo}
                        alt={'TikTik'}
                    />
                </div>
            </Link>

            <div className={"relative hidden md:block"}>
                <form
                    onSubmit={handleSearch}
                    className={"absolute md:static top-10 left-20 bg-white"}
                >
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={"Search accounts and videos "}
                        className={"bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-200 w-[300px] md:w-[350px] rounded-full md:top-0"}
                    />
                    <button
                        onClick={handleSearch}
                        className={"absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"}
                    >
                        <BiSearch/>
                    </button>
                </form>
            </div>

            <div>
                {user ? (
                    <div className={"flex gap-5 md:gap-10 items-center"}>
                        <Link href={'/upload'}>
                            <button
                                className={"border-2 px-2 md:px-4 text-md font-semibold py-2 flex items-center gap-2"}>
                                <IoMdAdd className={"text-xl"}/> {` `}
                                <span className={"hidden md:block"}>Upload</span>
                            </button>
                        </Link>

                        {user.image && (
                            <Link href={""}>
                                <>
                                    <Image
                                        className={"rounded-full cursor-pointer overflow-hidden"}
                                        width={40}
                                        height={40}
                                        src={user.image}
                                        alt={user.image}/>
                                </>
                            </Link>
                        )}
                        <button
                            type={'button'}
                            className={"px-2"}
                            onClick={() => {
                                setUser(null);
                                googleLogout();
                                removeUser();
                            }}
                        >
                            <AiOutlineLogout color={"red"} fontSize={21}/>
                        </button>
                    </div>
                ) : (
                    <GoogleLogin
                        onError={() => console.log('Error!')}
                        onSuccess={(res) => createOrGetUser(res, addUser)}/>
                )}
            </div>
        </div>
    )
}

export default Navbar;