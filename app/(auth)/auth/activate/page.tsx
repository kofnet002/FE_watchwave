'use client';

import { FC, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Context from "@/app/lib/helper/AppContext";
import { useSearchParams } from "next/navigation";


interface PageProps { }

const Page: FC<PageProps> = () => {

    const { loading, ActivateAccount } = useContext(Context)

    const getParams = useSearchParams();

    useEffect(() => {
        const uid = getParams.get('uid');
        const token = getParams.get('token')
        if (uid && token) {
            ActivateAccount({ uid, token })
        } else {
            toast.error('Invalid activation link')
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {loading &&
                <span className="loading loading-spinner loading-lg bg-white"></span>
            }
        </div>
    );
};
export default Page;