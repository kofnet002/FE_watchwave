'use client';

import { FC, useContext, useEffect, useState } from "react";
import Context from "@/app/lib/helper/AppContext";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FacebookIcon, TelegramShareButton, TelegramIcon, TwitterIcon } from "react-share";
import Modal from "@/app/components/Modal";


interface PageProps { }

const Page: FC = () => {
    const { loading, singleVideo } = useContext(Context)
    const [videoData, setVideoData] = useState<any>()
    const [currentPage, setCurrentPage] = useState(1);
    const [showShare, setShowShare] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);

    const getParams = useSearchParams();
    const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

    const fetchVideos = async (id: string) => {
        const accessToken = Cookies.get('access-token') as string
        const _videos = await singleVideo(accessToken, id)
        console.log('videos', _videos);

        if (_videos) setVideoData(_videos)
    }

    useEffect(() => {
        const videoId = getParams.get('v') as string;
        fetchVideos(videoId)
    }, [])

    const shareUrl = `${frontEndUrl}/watch?v=${videoData && videoData.id}`

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">WatchWave</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Link</a></li>
                        <li>
                            <details>
                                <summary>
                                    Parent
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none">
                                    <li><a>Link 1</a></li>
                                    <li><a>Link 2</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>

            {loading ?
                (
                    <div className="flex items-center justify-center h-screen">
                        <span className="loading loading-spinner loading-md bg-white"></span>
                    </div>
                )
                : (
                    <div className="mb-8">
                        <video className="h-auto w-full object-cover mb-5" src={videoData && videoData.video_url} autoPlay controls title={videoData && videoData.title}></video>

                        <div className="px-4 md:px-6 lg:px-8">
                            <div className="">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-bold text-lg md:text-xl lg:text-2xl">{videoData && videoData.title}</h2>

                                    <div className="flex justify-end me-5" >
                                        <div className="border flex gap-2 items-center p-2 rounded-md hover:cursor-pointer"
                                            onClick={() => setShowShare(!showShare)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                            </svg>
                                            <p>Share</p>
                                        </div>

                                        {showShare &&
                                            <Modal title="Share" setIsModalOpen={setShowShare} isModalOpen={showShare}>

                                                <div className="my-5">
                                                    <TelegramShareButton url="`${shareUrl}`">
                                                        <TelegramIcon size={32} round={true} />
                                                    </TelegramShareButton>
                                                </div>

                                                <div className="flex items-center justify-between border rounded-md p-2">
                                                    <p className="w-[200px] truncate overflow-ellipsis">{videoData && videoData.video_url}</p>

                                                    <button className=""
                                                        onClick={() => {
                                                            navigator.clipboard
                                                                .writeText(
                                                                    `${shareUrl}`
                                                                )
                                                                .then(() => setCopied(true))
                                                                .catch((error) =>
                                                                    toast.error(
                                                                        "Error copying to clipboard:",
                                                                        error
                                                                    )
                                                                );
                                                            copied &&
                                                                toast.success("Link copied to clipboard");
                                                        }}
                                                    >Copy
                                                    </button>
                                                </div>

                                            </Modal>
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

export default Page;