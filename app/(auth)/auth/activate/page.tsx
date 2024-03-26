'use client';

import toast from "react-hot-toast";
import Context from "@/app/lib/helper/AppContext";
import { useSearchParams } from "next/navigation";
// Import Suspense from react
import { FC, useState, useContext, useEffect, Suspense } from "react";

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

    useEffect(() => {
        const uid = getParams.get('uid');
        const token = getParams.get('token')
        if (uid && token) {
            ActivateAccount({ uid, token })
        } else {
            toast.error('Invalid activation link')
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {loading &&
                <span className="loading loading-spinner loading-lg bg-white"></span>
            }
        </div>
    );
};

// Export the wrapped component
export default PageWithSuspense;
