'use client';

import { FC, useContext, useEffect, useState } from "react";
import Context from "@/app/lib/helper/AppContext";
import Cookies from "js-cookie";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import toast from "react-hot-toast";
import {
  TelegramShareButton, TelegramIcon,
  WhatsappShareButton, WhatsappIcon,
  TwitterShareButton, TwitterIcon,
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
} from "react-share";


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
  }, [])

  // PAGINATION

  const totalPages = videoData && videoData.count;

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

      {loading ? videoData && videoData.results.data.map((video: any) => {
        const shareUrl = `${frontEndUrl}/watch?v=${video.id}`

        return (
          <div key={video.id} className="mb-8 relative">
            <video className="h-auto w-full object-cover mb-5" src={video.video_url} autoPlay controls title={video.title}></video>


            <div className="px-4 md:px-6 lg:px-8">
              <div className="">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg md:text-xl lg:text-2xl">{video.title}</h2>

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
                        <div className="my-5 w-full overflow-x-auto scrollbar">
                          <div className="flex items-center gap-4">
                            <WhatsappShareButton url={shareUrl} className="flex flex-col justify-center items-center">
                              <WhatsappIcon size={52} round={true} />
                              <p>WhatsApp</p>
                            </WhatsappShareButton>
                            <TwitterShareButton url={shareUrl}>
                              <TwitterIcon size={52} round={true} />
                              <p>X</p>
                            </TwitterShareButton>
                            <FacebookShareButton url={shareUrl}>
                              <FacebookIcon size={52} round={true} />
                              <p>Facebook</p>
                            </FacebookShareButton>
                            <LinkedinShareButton url={shareUrl}>
                              <LinkedinIcon size={52} round={true} />
                              LinkedIn
                            </LinkedinShareButton>
                            <TelegramShareButton url={shareUrl} className="flex flex-col justify-center items-center">
                              <TelegramIcon size={52} round={true} />
                              Telegram
                            </TelegramShareButton>
                          </div>
                        </div>

                        <hr />
                        <div className="flex items-center justify-between border rounded-md p-2 mt-5">
                          <p className="w-[200px] truncate overflow-ellipsis">{shareUrl}</p>

                          <button className=""
                            onClick={() => {
                              navigator.clipboard
                                .writeText(
                                  shareUrl
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
                          >{copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </Modal>
                    }

                  </div>

                </div>
                {/* <p className="font-bold text-white text-lg md:text-xl lg:text-2xl mx-1 hidden sm:flex">·</p> */}
                <p className="text-gray-500 text-sm md:text-base">{video.description}</p>
              </div>
            </div>
          </div>

        )
      }) : (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-md bg-white"></span>
        </div>
      )}

      {!loading || videoData && (
        <div className="mb-8">

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