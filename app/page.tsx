'use client';

import { FC, useContext, useEffect, useState } from "react";
import Context from "@/app/lib/helper/AppContext";
import Cookies from "js-cookie";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import toast from "react-hot-toast";

import Plyr from 'plyr';
import Navbar from "./components/Navbar";
import ShareVideoModal from "./components/ShareVideoModal";


interface PageProps { }

const Page: FC = () => {
  const { loading, getAllVideos, updateTokens } = useContext(Context)
  const [videoData, setVideoData] = useState<any>()
  const [currentPage, setCurrentPage] = useState(1);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchVideos(newPage); // Fetch data for the new page
  };

  const fetchVideos = async (page: number) => {
    const accessToken = Cookies.get('access-token') as string
    if (accessToken) {
      const _videos = await getAllVideos(accessToken, page)
      if (_videos) setVideoData(_videos)
    } else {
      const _tokens = await updateTokens()
      if (_tokens) {
        const access_token = Cookies.get('access-token') as string
        const _videos = await getAllVideos(access_token, page)
        if (_videos) setVideoData(_videos)
      }
    }
  }

  useEffect(() => {
    fetchVideos(1)
    // document.addEventListener('DOMContentLoaded', () => {
    //   const player = new Plyr('#player');
    // });
  }, [])


  // const player = new Plyr('#player');

  // PAGINATION
  const totalPages = videoData && videoData.count;

  return (
    <div>

      <div>
        <Navbar />
      </div>

      {videoData ?

        (videoData && videoData.results.data.map((video: any) => {
          const shareUrl = `${frontEndUrl}/watch?v=${video.id}`

          return (
            <div key={video.id} className="mb-8 relative">
              <video className="h-[70dvh] w-full object-contain mb-5" src={video.video_url} autoPlay controls title={video.title}></video>

              {/* <video id="player" playsInline autoPlay loop controls className="mb-10 h-4">
              <source src={video.video_url} type="video/mp4" />
            </video> */}

              <div className="px-4 md:px-6 lg:px-8">
                <div className="">
                  <div className="flex justify-between items-center mb-7">
                    <h2 className="font-bold text-lg md:text-xl lg:text-2xl">{video.title}</h2>

                    <div className="flex justify-end me-5" >
                      <div className="flex gap-1 items-center p-2 rounded-badge hover:cursor-pointer bg-gray-900"
                        onClick={() => setShowShare(!showShare)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                        <p className="">share</p>
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
                  {/* <p className="font-bold text-white text-lg md:text-xl lg:text-2xl mx-1 hidden sm:flex">·</p> */}
                  <p className="text-gray-500 text-sm md:text-base">{video.description}</p>
                </div>
              </div>
            </div>

          )
        }
        )
        ) : (
          <div className="flex items-center justify-center h-screen">
            <span className="loading loading-spinner loading-md bg-white"></span>
          </div>
        )}

      {loading || videoData && (
        <div className="mb-20">

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
};

export default Page;
<div className="flex items-center justify-center h-screen">
  <span className="loading loading-spinner loading-md bg-white"></span>
</div>