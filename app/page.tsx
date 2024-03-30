'use client';

import { FC, useContext, useEffect, useState } from "react";
import Context from "@/app/lib/helper/AppContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";


interface PageProps { }

const Page: FC = () => {
  const { loading, getAllVideos, updateTokens } = useContext(Context)
  const [videoData, setVideoData] = useState<any>()
  const [isHovered, setIsHovered] = useState(false);

  const route = useRouter();

  const fetchVideos = async (page: number) => {
    const accessToken = Cookies.get('access-token') as string
    if (accessToken) {
      const _videos = await getAllVideos(accessToken, page)
      if (_videos) {
        setVideoData(_videos)
      }
    } else {
      const _tokens = await updateTokens()
      if (_tokens) {
        const access_token = Cookies.get('access-token') as string
        const _videos = await getAllVideos(access_token, page)
        if (_videos) {
          setVideoData(_videos)
        }
      }
    }
  }

  useEffect(() => {
    fetchVideos(1)
  }, [])


  const handleCardClick = (video: any) => {
    route.push(`/watch?v=${video.id}`)
  }

  return (
    <div>
      <div className="mb-16">
        <Navbar />
      </div>

      <div className="w-full sm:px-[0%] md:px-[5%] pb-12">

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[80dvh]">
            <span className="loading loading-spinner loading-lg bg-white"></span>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-5 place-items-center justify-center max-w-full`}>
            {videoData && videoData.results.data.map((video: any) => {
              return (
                <div
                  onClick={() => handleCardClick(video)}
                  key={video.id}
                  className={`hover:cursor-pointer hover:scale-105 transition max-w-[360px] h-[250px] rounded-[32px] flex-col justify-start items-start gap-2.5 inline-flex`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex-col gap-2 justify-center items-start flex flex-wrap">
                    <video
                      className="object-cover max-w-[397px] h-[200px] md:rounded-md"
                      src={video.video_url || video.video}
                      width={500}
                      height={150}
                      autoPlay={isHovered}
                      muted
                      loop
                    />
                    <div className="font-semibold w-[300px] overflow-ellipsis truncate">{video.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}


      </div>

    </div>

  )
};

export default Page;
<div className="flex items-center justify-center h-screen">
  <span className="loading loading-spinner loading-md bg-white"></span>
</div>