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

    const { loading, registerAccount } = useContext(Context)



    return (
        <div>

            <p>hello</p>


        </div>
    );
};
export default Page;