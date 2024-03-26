'use client';

import { FC, Suspense, useContext, useEffect, useState } from "react";
import Context from "@/app/lib/helper/AppContext";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FacebookIcon, TelegramShareButton, TelegramIcon, TwitterIcon } from "react-share";
import Modal from "@/app/components/Modal";
import Navbar from "../components/Navbar";
import ShareVideoModal from "../components/ShareVideoModal";
import Plyr from "plyr";


interface PageProps { }

// Wrap your component with Suspense
const PageWithSuspense: FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Page />
    </Suspense>
);


const Page: FC = () => {
    const { loading, singleVideo, updateTokens } = useContext(Context)
    const [videoData, setVideoData] = useState<any>()
    const [showShare, setShowShare] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const getParams = useSearchParams();
    const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

    const fetchVideo = async (id: string) => {
        const accessToken = Cookies.get('access-token') as string
        if (accessToken) {
            const _videos = await singleVideo(accessToken, id)
            if (_videos) setVideoData(_videos)
        } else {
            const _tokens = await updateTokens()
            if (_tokens) {
                const access_token = Cookies.get('access-token') as string
                const _videos = await singleVideo(access_token, id)
                if (_videos) setVideoData(_videos)
            }
        }
    }

    useEffect(() => {
        // document.addEventListener('DOMContentLoaded', () => {
        //     const player = new Plyr('#player');
        // });

        const url = window.location.href;
        Cookies.set('redirectUrl', url);

        const accessToken = Cookies.get('access-token') as string
        if (!accessToken) router.push('/');
        const videoId = getParams.get('v') as string;
        fetchVideo(videoId)
    }, [])

    const shareUrl = `${frontEndUrl}/watch?v=${videoData && videoData.id}`

    // const player = new Plyr('#player');

    return (
        <div>
            <div>
                <Navbar />
            </div>

            {loading ?
                (
                    <div className="flex items-center justify-center h-screen">
                        <span className="loading loading-spinner loading-md bg-white"></span>
                    </div>
                )
                : (
                    <div className="mb-8">
                        <video className="h-[70dvh] w-full object-contain mb-5" src={videoData && videoData.video_url} autoPlay controls title={videoData && videoData.title}></video>
                        {/* <video id="player" playsInline controls autoPlay loop className="mb-10 h-auto w-full object-cover">
                            <source src={videoData && videoData.video_url} type="video/mp4" />
                        </video> */}
                        <div className="px-4 md:px-6 lg:px-8">
                            <div className="">
                                <div className="flex justify-between items-center mb-7">
                                    <h2 className="font-bold text-lg md:text-xl lg:text-2xl">{videoData && videoData.title}</h2>

                                    <div className="flex justify-end me-5" >
                                        <div className="flex gap-2 items-center p-2 rounded-badge hover:cursor-pointer bg-gray-900"
                                            onClick={() => setShowShare(!showShare)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                            </svg>
                                            <p>share</p>
                                        </div>

                                        {showShare &&
                                            <ShareVideoModal
                                                copied={copied}
                                                setCopied={setCopied}
                                                setShowShare={setShowShare}
                                                shareUrl={shareUrl}
                                                showShare={showShare}
                                            />
                                        }

                                    </div>

                                </div>
                                <p className="text-gray-500 text-sm md:text-base">{videoData && videoData.description}</p>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
};

export default PageWithSuspense;