'use client';

import toast from "react-hot-toast";
import Context from "@/app/lib/helper/AppContext";
import { useSearchParams } from "next/navigation";
// Import Suspense from react
import { FC, useState, useContext, useEffect, Suspense } from "react";
import Button from "@/app/components/ui/Button";

// Wrap your component with Suspense
const PageWithSuspense: FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Page />
    </Suspense>
);

// Define your Page component
const Page: FC = () => {
    const { loading, ActivateAccount } = useContext(Context);
    const getParams = useSearchParams();

    const handleSubmit = () => {
        const uid = getParams.get('uid') as string;
        const token = getParams.get('token') as string;


        if (uid && token) {
            ActivateAccount({ uid, token })
        } else {
            toast.error('Invalid activation link')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="mx-auto px-5">
                <div className="max-w-[414px]">
                    <div className="card w-96 bg-gray-900 shadow-xl text-center">
                        <div className="card-body">
                            <h2 className="">You are welcome to</h2>
                            <h2 className="text-3xl font-bold">WatchWave</h2> <br />
                            <p>To finish setting up your account, kindly click on the button below to activate your account</p>
                        </div>
                        <div className="flex justify-center">
                            <Button loading={loading} onClick={handleSubmit} className="mb-6 w-[300px] py-7 flex justify-center hover:cursor-pointer">Activate account</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export the wrapped component
export default PageWithSuspense;
