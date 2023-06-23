"use client"

import {useSession, signIn, signOut} from "next-auth/react";

export default function Login() {
    const {data: session} = useSession();

    console.log("Session", session?.user)

    if (!session) {
        return (
            <>
                <button
                    onClick={(() => signIn())}
                    className={"bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] cursor-pointer"}>
                    Log in
                </button>
            </>
        )
    }

    return (
        <>
            <button
                onClick={(() => signOut())}
                className={"bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] cursor-pointer"}>
                Log out
            </button>
        </>
    )

}