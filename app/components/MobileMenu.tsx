'use client'

import { Transition, Dialog } from '@headlessui/react'
import Image from 'next/image'
import { FC, Fragment, useEffect, useState, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Button from './ui/Button'
import Logo from "@/images/logo.png"
import Link from 'next/link'
import Avatar from "@/images/avatar.png"
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Context from "@/app/lib/helper/AppContext";
import { useRouter } from "next/navigation";


interface MobileChatLayoutProps { }

const MobileChatLayout: FC<MobileChatLayoutProps> = () => {

    const { loading, getUserData, userData } = useContext(Context)

    const [open, setOpen] = useState<boolean>(false)

    const pathname = usePathname()
    const route = useRouter();


    const handleLogout = () => {
        Cookies.remove('access-token')
        Cookies.remove('refresh-token')
        Cookies.remove('_u_n')
        Cookies.remove('redirectUrl'); // Clear the stored URL
        route.push('/login')
        toast.success('Log out successful', { duration: 5000 })
    }

    const _video = pathname.match('videos');
    const containsOnlyDashboard = /^\/dashboard$/.test(pathname);

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <div className='fixed  border-b bg-black backdrop-blur-[30px] top-0 inset-x-0 py-2 px-4'>
            <div className='w-full flex justify-between items-center'>
                <Button onClick={() => setOpen(true)} className='gap-1 rounded-md'>
                    Menu
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </Button>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={setOpen}>
                    <div className='fixed inset-0' />

                    <div className='fixed inset-0 overflow-hidden'>
                        <div className='absolute inset-0 overflow-hidden'>
                            <div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10'>
                                <Transition.Child
                                    as={Fragment}
                                    enter='transform transition ease-in-out duration-500 sm:duration-700'
                                    enterFrom='-translate-x-full'
                                    enterTo='translate-x-0'
                                    leave='transform transition ease-in-out duration-500 sm:duration-700'
                                    leaveFrom='translate-x-0'
                                    leaveTo='-translate-x-full'>
                                    <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                                        <div className='flex h-full flex-col overflow-hidden bg-black backdrop-blur-[50px] py-6 shadow-xl'>
                                            <div className='px-4 sm:px-6'>
                                                <div className='flex items-center justify-between'>
                                                    <Dialog.Title className='text-base font-semibold leading-6 text-white'>
                                                        <Link href='/' className="flex items-center justify-start w-full me-10">
                                                            <Image className="w-14" width={150} height={0} src={Logo} alt="watchwave-logo" priority />
                                                            <p className="text-xl">WatchWave</p>
                                                        </Link>
                                                    </Dialog.Title>
                                                    <div className='ml-3 flex h-7 items-center'>
                                                        <button
                                                            type='button'
                                                            className='rounded-md bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2'
                                                            onClick={() => setOpen(false)}>
                                                            <span className='sr-only'>Close panel</span>

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='relative mt-20 flex-1 px-4 sm:px-6 h-full'>
                                                {/* Content */}
                                                <nav className="flex flex-1 flex-col h-full">
                                                    <ul role="list" className="flex flex-1 flex-col gap-y-7 justify-between">
                                                        <li className='flex-1'>
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

                                                {/* content end */}
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default MobileChatLayout