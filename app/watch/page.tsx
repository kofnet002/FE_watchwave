'use client';

import { FC, Suspense, useContext, useEffect, useState } from "react";
import Context from "@/app/lib/helper/AppContext";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import ShareVideoModal from "../components/ShareVideoModal";
import { Metadata } from "next";


interface PageProps { }

// Wrap your component with Suspense
const PageWithSuspense: FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Page />
    </Suspense>
);


const Page: FC = () => {
    const { loading, singleVideo, updateTokens, getNextVideo, getPrevVideo } = useContext(Context)
    const [videoData, setVideoData] = useState<any>()
    const [showShare, setShowShare] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);
    const [externalDataLoaded, setExternalDataLoaded] = useState(false);
    const router = useRouter();
    const getParams = useSearchParams();
    const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
    const [showFullDescription, setShowFullDescription] = useState(false);

    const accessToken = Cookies.get('access-token') as string

    const fetchVideo = async (id: string) => {
        if (accessToken) {
            const _videos = await singleVideo(accessToken, id)
            if (_videos) {
                setVideoData(_videos)
                setExternalDataLoaded(true);
            }
        } else {
            const _tokens = await updateTokens()
            if (_tokens) {
                const access_token = Cookies.get('access-token') as string
                const _videos = await singleVideo(access_token, id)
                if (_videos) {
                    setVideoData(_videos)
                    setExternalDataLoaded(true);
                }
            }
        }
    }

    useEffect(() => {
        const accessToken = Cookies.get('access-token') as string

        if (!accessToken) {
            const url = window.location.href;
            Cookies.set('redirectUrl', url);
            router.push('/');
        }

        const videoId = getParams.get('v') as string;
        fetchVideo(videoId)
    }, [])

    const shareUrl = `${frontEndUrl}/watch?v=${videoData && videoData.id}`
    const currentVideoIndex = videoData && videoData.current_index
    const totalCount = videoData && videoData.total_count

    useEffect(() => {
        if (externalDataLoaded) {
            // Once external data is loaded, load the script
            const script = document.createElement('script');
            script.src = './script.js'; // Adjust the path as needed
            script.async = true;

            document.head.appendChild(script);

            // Clean up function to remove the script when the component is unmounted
            return () => {
                // Check if script and document.head are not null before removing
                if (script && document.head) {
                    document.head.removeChild(script);
                }
            };
        }
    }, [externalDataLoaded]);


    const handleNextVideo = async () => {
        const response = await getNextVideo(accessToken, videoData.id)
        if (response) {
            const newUrl = `${frontEndUrl}/watch?v=${response.id}`
            window.open(newUrl, '_self')
        }
    }

    const handlePrevVideo = async () => {
        const response = await getPrevVideo(accessToken, videoData.id)
        if (response) {
            const newUrl = `${frontEndUrl}/watch?v=${response.id}`
            window.open(newUrl, '_self')
        }
    }

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div>

            <div className="mb-16">
                <Navbar />
            </div>

            {loading || !videoData ?
                (
                    <div className="flex items-center justify-center h-[80dvh]">
                        <span className="loading loading-spinner loading-lg bg-white"></span>
                    </div>
                )
                : (
                    <div className="mb-8">
                        <div className="video-container mb-8" data-volume-level="high">
                            <img className="thumbnail-img" />
                            <div className="video-controls-container">
                                <div className="timeline-container">
                                    <div className="timeline">
                                        <img className="preview-img" />
                                        <div className="thumb-indicator"></div>
                                    </div>
                                </div>
                                <div className="controls">
                                    <button className="play-pause-btn shrink-0">
                                        <svg className="play-icon" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                        </svg>
                                        <svg className="pause-icon" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                                        </svg>
                                    </button>
                                    {currentVideoIndex !== 1 &&
                                        <button onClick={handlePrevVideo}>
                                            <svg className="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M7 6a1 1 0 0 1 2 0v4l6.4-4.8A1 1 0 0 1 17 6v12a1 1 0 0 1-1.6.8L9 14v4a1 1 0 1 1-2 0V6Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    }
                                    {currentVideoIndex !== totalCount &&
                                        <button className={`${currentVideoIndex === totalCount} ? 'hidden' : '' `} onClick={handleNextVideo}>
                                            <svg className="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M17 6a1 1 0 1 0-2 0v4L8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8L15 14v4a1 1 0 1 0 2 0V6Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    }
                                    <div className="volume-container">
                                        <button className="mute-btn">
                                            <svg className="volume-high-icon" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                                            </svg>
                                            <svg className="volume-low-icon" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                                            </svg>
                                            <svg className="volume-muted-icon" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                                            </svg>
                                        </button>
                                        <input className="volume-slider text-white" type="range" min="0" max="1" step="any" value="1" style={{ color: 'white' }} />
                                    </div>
                                    <div className="duration-container">
                                        <div className="current-time">0:00</div>
                                        /
                                        <div className="total-time"></div>
                                    </div>
                                    {/* <button className="captions-btn">
                                        <svg viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
                                        </svg>
                                    </button> */}
                                    <button className="speed-btn wide-btn">
                                        1x
                                    </button>
                                    <button className="mini-player-btn">
                                        <svg viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
                                        </svg>
                                    </button>
                                    <button className="theater-btn">
                                        <svg className="tall" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
                                        </svg>
                                        <svg className="wide" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z" />
                                        </svg>
                                    </button>
                                    <button className="full-screen-btn">
                                        <svg className="open" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                                        </svg>
                                        <svg className="close" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <video className="rounded-md" src={videoData && videoData.video_url} autoPlay loop>
                            </video>
                        </div>

                        <div className="w-[90%] max-w-[1000px] mx-auto">
                            <div className="">
                                <div className="flex justify-between gap-16 items-start mb-7">
                                    <h2 id='video_title' className="font-bold text-lg md:text-xl lg:text-2xl">{videoData && videoData.title}</h2>

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
                                <p className="text-gray-500 text-sm md:text-base mb-5">
                                    {showFullDescription ? videoData.description : videoData.description.substring(0, 200)}
                                    {videoData.description.length > 200 && !showFullDescription && '...'}
                                </p>
                                {videoData.description.length > 200 && !showFullDescription && <span className="hover:cursor-pointer" onClick={toggleDescription}>Show more</span>}
                                {showFullDescription && <span className="hover:cursor-pointer" onClick={toggleDescription}>Show less</span>}
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
};

export default PageWithSuspense;