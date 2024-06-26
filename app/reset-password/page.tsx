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

    const { loading, passwordResetRequest } = useContext(Context)

    const [formData, setFormData] = useState({
        email: "",
    });

    const route = useRouter();

    const disableButton = () => {
        return (
            formData.email != ''
        )
    }

    const handleOnChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await passwordResetRequest(formData)
    }

    return (
        <div>
            <div className="mt-4 mb-52">
                <div className="flex items-center justify-start w-full">
                    <Image className="w-14" width={150} height={0} src={Logo} alt="watchwave-logo" priority />
                    <p className="text-xl">WatchWave</p>
                </div>
            </div>

            <div className="mx-auto px-5 ">
                <div className="max-w-[414px] mx-auto">
                    <div className="flex flex-col gap-6">
                        <div className="w-full h-[30px] justify-center items-center gap-2 flex flex-col">
                            <div className="text-whiter text-3xl font-normal leading-[30px]">Password reset</div>
                            <p>
                                Enter your email associated with WatchWave
                            </p>
                        </div>

                        <form action="" method="POST" className="flex flex-col gap-6" onSubmit={handleSubmit}>

                            <div className={`h-[53px] justify-start items-start gap-2 inline-flex mb-4`}>
                                <input placeholder="Email" type="email" defaultValue={formData.email} onChange={handleOnChange} name="email" className={`w-full focus-within:outline-none grow shrink basis-0 h-[53px] p-4 text-black rounded-xl border border-stone-300  justify-start items-center flex`} />
                            </div>
                            <Button
                                loading={loading}
                                disabled={!disableButton() || loading}
                                onClick={handleSubmit} className="w-full h-14 px-5 py-4 justify-center items-center gap-1 inline-flex mb-8">
                                Send
                            </Button>

                            <div className="text-center">
                                <span className="text-neutral-400 text-base font-normal mr-2">Remember password now?
                                </span>
                                <Link href={'/login'} className="text-base font-semibold hover:cursor-pointer hover:text-primary">
                                    Log in
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