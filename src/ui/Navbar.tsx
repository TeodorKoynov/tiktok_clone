"use client"

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";

import {GoogleLogin, googleLogout} from "@react-oauth/google";

import {AiOutlineLogout} from "react-icons/ai";
import {BiSearch} from "react-icons/bi";
import {IoMdAdd} from "react-icons/io";

import useAuthStore from "@/store/authStore";

import Logo from "../../public/tiktik-logo.png";
import {createOrGetUser} from "@/utils";
import {useEffect, useState} from "react";

const Navbar = () => {
    const [user, setUser] = useState('');
    const {userProfile, addUser, removeUser} = useAuthStore();

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

            <div>
                SEARCH
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