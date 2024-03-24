'use client';

import Link from "next/link";
import { FC, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Context from "@/app/lib/helper/AppContext";
import Cookies from 'js-cookie';
import Button from "@/app/components/ui/Button";


interface PageProps { }

const Page: FC<PageProps> = () => {

    const { email } = useContext(Context)
    const route = useRouter();


    const handleSubmit = () => route.push('/login')

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="mx-auto px-5">
                <div className="max-w-[414px]">
                    <div className="card w-96 bg-gray-900 shadow-xl text-center">
                        <div className="card-body">
                            <h2 className="">You are welcome to</h2>
                            <h2 className="text-3xl font-bold">WatchWave</h2> <br />
                            <p>We are happy to have you with us</p>
                            <p>To finish setting up your account, you need to activate it,
                                we have sent a mail to <span className="text-blue-500 font-semibold">{email} </span></p>
                        </div>

                        <div onClick={handleSubmit} className="mb-3 hover:cursor-pointer">Log in</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Page;