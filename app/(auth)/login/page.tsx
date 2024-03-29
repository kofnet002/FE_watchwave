'use client';

import Link from "next/link";
import { FC, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Context from "@/app/lib/helper/AppContext";
import Cookies from 'js-cookie';
import Button from "@/app/components/ui/Button";
import Logo from "@/images/logo.png"


interface PageProps { }

const Page: FC<PageProps> = () => {
    // const [loading, setLoading] = useState(false)
    // const isSecured = (protocol: string) => protocol === 'https:'

    const { loading, loginUser } = useContext(Context)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const route = useRouter();

    const disableButton = () => {
        return (
            formData.email != '' &&
            formData.password != ''
        )
    }

    const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await loginUser(formData)

    }

    return (
        <div>
            <div className="mt-4 mb-20">
                <div className="flex items-center justify-start w-full">
                    <Image className="w-14" width={150} height={0} src={Logo} alt="watchwave-logo" priority />
                    <p className="text-xl">WatchWave</p>
                </div>
            </div>


            <div className="mx-auto px-5 mb-10">
                <div className="max-w-[414px] mx-auto">
                    <div className="flex flex-col gap-6">
                        <div className="w-full h-[30px] justify-center items-center gap-2 inline-flex">
                            <div className="text-whiter text-3xl font-normal leading-[30px]">Welcome back</div>
                            <div className="w-6 h-6 justify-center items-center flex">
                                {/* <Image src={PartyingFace} priority width={50} height={50} alt="paryting-emoji-face" className="w-6 h-6" /> */}
                            </div>
                        </div>

                        <form action="" method="POST" className="flex flex-col gap-6" onSubmit={handleSubmit}>
                            <div className={`h-[53px] justify-start items-start gap-2 inline-flex mb-4`}>
                                <input placeholder="Email" type="email" defaultValue={formData.email} onChange={handleOnChange} name="email" className={`w-full focus-within:outline-none grow shrink basis-0 h-[53px] p-4 text-black rounded-xl border border-stone-300  justify-start items-center flex`} />
                            </div>

                            <div className="relative h-[21px] justify-between items-center flex mb-8">
                                <input type={`${showPassword ? 'text' : 'password'}`} placeholder="Password" defaultValue={formData.password} onChange={handleOnChange} name="password" className={`focus-within:outline-none w-full h-[53px] p-4 text-black rounded-xl border border-stone-300 justify-start items-center inline-flex`} />

                                {formData.password.length > 0 && (
                                    showPassword ? (
                                        <svg className="absolute right-5 hover:cursor-pointer w-5 h-5" onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                    ) : (
                                        <svg className="absolute right-5 hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3.22427 6.3566C3.57961 6.20431 3.99113 6.36892 4.14342 6.72426L3.50002 7C4.14342 6.72426 4.14352 6.72448 4.14342 6.72426L4.14306 6.72342C4.14286 6.72296 4.143 6.72329 4.14306 6.72342L4.1458 6.72962C4.1486 6.73593 4.15342 6.74665 4.16028 6.7615C4.174 6.79119 4.19582 6.83731 4.22592 6.8975C4.28616 7.01798 4.3792 7.19422 4.50621 7.40759C4.76101 7.83565 5.14812 8.40577 5.67547 8.97368C5.79977 9.10754 5.93132 9.24076 6.07026 9.37164C6.07607 9.37691 6.08181 9.38231 6.08748 9.38781C7.12676 10.361 8.57664 11.2 10.5 11.2C11.3463 11.2 12.0949 11.0384 12.7547 10.7787C13.6129 10.4409 14.3322 9.93238 14.921 9.37979C15.5857 8.75587 16.0739 8.08503 16.3963 7.5677C16.5568 7.31004 16.6745 7.09322 16.7509 6.94336C16.7891 6.86851 16.8169 6.8106 16.8345 6.77292C16.8432 6.7541 16.8494 6.74035 16.8531 6.73209L16.8566 6.72426C17.009 6.36911 17.4205 6.20435 17.7758 6.3566C18.1311 6.50889 18.2957 6.9204 18.1434 7.27574L17.5 7C18.1434 7.27574 18.1435 7.27558 18.1434 7.27574L18.1419 7.27926L18.1394 7.28501L18.1314 7.3031C18.1247 7.31803 18.1154 7.33864 18.1033 7.3645C18.0792 7.4162 18.0442 7.48898 17.9981 7.57941C17.906 7.76012 17.7688 8.01225 17.5845 8.30807C17.3027 8.76038 16.9065 9.32134 16.3868 9.887L16.945 10.4452C17.2184 10.7186 17.2184 11.1618 16.945 11.4352C16.6716 11.7085 16.2284 11.7085 15.955 11.4352L15.3669 10.847C14.9719 11.1661 14.5299 11.467 14.0391 11.7265L14.5867 12.5682C14.7976 12.8923 14.7058 13.3259 14.3818 13.5367C14.0577 13.7476 13.6241 13.6558 13.4133 13.3318L12.7235 12.2716C12.2482 12.4173 11.7404 12.5206 11.2 12.569V13.65C11.2 14.0366 10.8866 14.35 10.5 14.35C10.1134 14.35 9.80002 14.0366 9.80002 13.65V12.5691C9.25777 12.5206 8.75015 12.4172 8.27639 12.2719L7.58675 13.3318C7.3759 13.6558 6.94229 13.7476 6.61825 13.5367C6.2942 13.3259 6.20244 12.8923 6.41329 12.5682L6.96097 11.7265C6.47089 11.4671 6.02877 11.1662 5.63327 10.8469L5.04499 11.4352C4.77162 11.7085 4.32841 11.7085 4.05504 11.4352C3.78167 11.1618 3.78167 10.7186 4.05504 10.4452L4.61325 9.887C4.02176 9.24317 3.58945 8.60456 3.3032 8.12366C3.15677 7.87766 3.04746 7.67108 2.97372 7.5236C2.93683 7.4498 2.90875 7.39064 2.88931 7.34856C2.87959 7.32751 2.87202 7.31072 2.86658 7.29849L2.86001 7.28359L2.85792 7.27877L2.85717 7.27703L2.85687 7.27633C2.85674 7.27603 2.85661 7.27574 3.50002 7L2.85687 7.27633C2.70458 6.92099 2.86893 6.50889 3.22427 6.3566Z" fill="#1D1D1F" />
                                        </svg>
                                    )
                                )}
                            </div>

                            <span className="text-end">
                                <Link href={'/reset-password'} className="text-neutral-400 text-base font-normal hover:cursor-pointer hover:text-primary min-w-fit">Forgot Password?</Link>
                            </span>

                            <Button
                                loading={loading}
                                disabled={!disableButton() || loading}
                                onClick={handleSubmit} className="w-full h-14 px-5 py-4 justify-center items-center gap-1 inline-flex mb-8">
                                Log in
                            </Button>

                            <div className="text-center">
                                <span className="text-neutral-400 text-base font-normal mr-2">Don&apos;t have an account?
                                </span>
                                <Link href={'/register'} className="text-base font-semibold hover:cursor-pointer hover:text-primary">
                                    Join us
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
};
export default Page;