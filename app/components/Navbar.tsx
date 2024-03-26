import Image from "next/image";
import { FC, useContext, useEffect } from "react";
import Logo from "@/images/logo.png"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Avatar from "@/images/avatar.png"
import Context from "@/app/lib/helper/AppContext";


interface PageProps { }

const Page: FC = () => {
    const { updateTokens, getUserData, userData } = useContext(Context)

    const route = useRouter();

    const fetchUserData = async () => {
        const accessToken = Cookies.get('access-token') as string
        if (accessToken) {
            await getUserData(accessToken)
        } else {
            const _tokens = await updateTokens()
            if (_tokens) {
                const access_token = Cookies.get('access-token') as string
                await getUserData(access_token)
            }
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const handleLogout = () => {
        Cookies.remove('access-token')
        Cookies.remove('refresh-token')
        Cookies.remove('redirectUrl'); // Clear the stored URL
        route.push('/login')
        toast.success('Log out successful', { duration: 5000 })
    }

    return (

        <div className="navbar bg-base-100 z-50">
            <div onClick={() => route.push('/')} className="flex-1 btn btn-ghost">
                <div className="flex items-center justify-start w-full">
                    <Image className="w-14" width={150} height={0} src={Logo} alt="watchwave-logo" priority />
                    <p className="text-xl">WatchWave</p>
                </div>
            </div>
            <div className="flex-none z-50">
                <ul className="menu menu-horizontal px-1 hover:cursor-pointer">
                    <li className="flex items-center">
                        <details>
                            <summary>
                                <div>
                                    @{userData && userData.username}
                                </div>
                                <div className="avatar">
                                    <div className="w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <Image className="w-14" width={150} height={0} src={Avatar} alt="user-picture" priority />
                                    </div>
                                </div>
                            </summary>
                            <ul onClick={handleLogout} className="p-2 bg-base-100 w-full rounded-t-none">
                                <li>Log out</li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Page;