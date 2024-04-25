'use client';

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useContext, useEffect, useState } from "react";
import Avatar from "@/images/avatar.png"
import Logo from "@/images/logo.png"
import { usePathname } from "next/navigation";
import Context from "@/app/lib/helper/AppContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MobileChatLayout from "@/app/components/MobileMenu";


interface LayoutProps {
    children: ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    const { loading, getUserData, userData } = useContext(Context)

    const pathName = usePathname();
    const route = useRouter();



    useEffect(() => {
        const access_token = Cookies.get('access-token')
        const notAdmin = async () => {
            const response = await getUserData(access_token);
            if (!response.data.is_admin) {
                toast.error('Not authorized to view this page', { duration: 5000 })
                route.push('/')
            }
        }

        notAdmin()
    }, [])

    const _video = pathName.match('videos');
    const containsOnlyDashboard = /^\/dashboard$/.test(pathName);

    const handleLogout = () => {
        Cookies.remove('access-token')
        Cookies.remove('refresh-token')
        Cookies.remove('_u_n')
        Cookies.remove('redirectUrl'); // Clear the stored URL
        route.push('/login')
        toast.success('Log out successful', { duration: 5000 })
    }

    return (
        // loading ? (
        //     <div className="flex items-center justify-center h-screen">
        //         <span className="loading loading-spinner loading-lg bg-white"></span>
        //     </div>
        // ) : (
        <div className="w-full flex h-screen">
            <div className="md:hidden">
                <MobileChatLayout />
            </div >
            <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6">
                <Link href='/' className="hover:cursor-pointer text-white my-5 mx-0">
                    <div className="flex items-center justify-start w-full">
                        <Image className="w-14" width={150} height={0} src={Logo} alt="watchwave-logo" priority />
                        <p className="text-xl">WatchWave</p>
                    </div>
                </Link>

                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">
                                Overview
                            </div>

                            <ul role="list" className="mt-2 space-y-1 flex flex-col gap-3 justify-center">
                                <Link href='/dashboard' className={`${containsOnlyDashboard ? 'bg-primary text-white' : ''} text-gray-500 hover:cursor-pointer hover:bg-primary hover:scale-105 transition  p-3 rounded-md flex items-center gap-3`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                    Home
                                </Link>

                                <Link href='/dashboard/videos' className={`${_video ? 'bg-primary text-white' : ''} text-gray-500 hover:cursor-pointer hover:bg-primary hover:scale-105 transition  p-3 rounded-md flex items-center gap-3`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                    Videos
                                </Link>

                            </ul>
                        </li>

                        <li className="-mx-6 mt-auto flex items-center">
                            <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                                <div className="relative h-8 w-8">
                                    <Image
                                        fill
                                        referrerPolicy="no-referrer"
                                        className="rounded-full"
                                        src={Avatar}
                                        alt="Your profile picture"
                                    />
                                </div>

                                <span className="sr-only">Your profile</span>

                                <div className="flex flex-col">
                                    <span arial-hidden="true" className="text-white">{userData && userData.username}</span>
                                    <span className="text-sx text-zinc-400 truncate" arial-hidden="true">
                                        {userData && userData.email}
                                    </span>
                                </div>
                            </div>

                            <div onClick={handleLogout} className="hover:cursor-pointer me-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>

                            </div>
                        </li>
                    </ul>
                </nav>
            </div>

            <aside className="max-h-screen container py-16 md:py-12 w-full">
                {children}
            </aside>

        </div >
    )

    // );
};

export default Layout;