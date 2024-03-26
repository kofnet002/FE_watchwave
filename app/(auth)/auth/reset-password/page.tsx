'use client'

import { FC, useState, useContext, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Context from "@/app/lib/helper/AppContext";
import Button from "@/app/components/ui/Button";
import { useSearchParams } from "next/navigation";

interface PageProps { }

const Page: FC<PageProps> = () => {
    const { loading, passwordResetConfirmation } = useContext(Context);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        password1: "",
        password2: ""
    });

    const router = useRouter();
    const getParams = useSearchParams();

    const uid = getParams.get('uid');
    const token = getParams.get('token');

    const disableButton = () => {
        return (
            formData.password1.length !== formData.password2.length ||
            formData.password1 === '' || formData.password2 === ''
        );
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if ((name === 'password1' && value) || (name === 'password2' && value)) {
            setError(formData.password1 !== formData.password2);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await passwordResetConfirmation({ uid, token, password1: formData.password1 });
    };

    return (
        <div>
            <div className="mt-4 mb-64">
                {/* Your logo component goes here */}
            </div>
            <div className="mx-auto px-5 ">
                <div className="max-w-[414px] mx-auto">
                    <div className="flex flex-col gap-6">
                        <div className="w-full h-[30px] justify-center items-center gap-2 inline-flex">
                            <div className="text-whiter text-3xl font-normal leading-[30px] mb-8">Set new password</div>
                        </div>
                        {error && (
                            <p className="text-pink-500 text-center">Passwords do not match</p>
                        )}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="relative h-[21px] justify-between items-center flex mb-8">
                                <input
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    placeholder="Password"
                                    value={formData.password1}
                                    onChange={handleOnChange}
                                    name="password1"
                                    className={`focus-within:outline-none w-full h-[53px] p-4 text-black rounded-xl border border-stone-300 justify-start items-center inline-flex`}
                                />
                                {/* Your show/hide password toggle SVG goes here */}
                            </div>
                            <div className="relative h-[21px] justify-between items-center flex mb-4">
                                <input
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    placeholder="Confirm password"
                                    value={formData.password2}
                                    onChange={handleOnChange}
                                    name="password2"
                                    className={`focus-within:outline-none w-full h-[53px] p-4 text-black rounded-xl border border-stone-300 justify-start items-center inline-flex`}
                                />
                                {/* Your show/hide password toggle SVG goes here */}
                            </div>
                            <Button
                                loading={loading}
                                disabled={disableButton() || loading || error}
                                className="w-full h-14 px-5 py-4 justify-center items-center gap-1 inline-flex mb-8"
                            >
                                Confirm
                            </Button>
                            <div className="text-center">
                                <span className="text-neutral-400 text-base font-normal mr-2">Remember password now?</span>
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

const PageWithSuspense: FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Page />
    </Suspense>
);

export default PageWithSuspense;
