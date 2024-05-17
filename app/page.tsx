'use client';

import { FC, useContext, useEffect, useRef, useState } from "react";
import Context from "@/app/lib/helper/AppContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";


interface PageProps { }

const Page: FC = () => {
  const { loading, updateTokens } = useContext(Context)

  const [videoData, setVideoData] = useState<any>([])
  const [isHovered, setIsHovered] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 10;
  const route = useRouter();


  const fetchItems = async (accessToken: string) => {
    if (isLoading) {
      return; // Avoid multiple requests when loading
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/allvideos/?page=${page}&page_size=${itemsPerPage}`, {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
      );

      if (response.ok) {
        const responseData = await response.json();
        const newItems = responseData.results.data; // Assuming the API response is an array
        if (Array.isArray(newItems)) {
          setVideoData((prevItems: any) => [...prevItems, ...newItems]);
          setPage((prevPage) => prevPage + 1); // Increment the page
        } else {
          console.error("API response is not an array:", newItems);
        }
      } else {
        const errorData = await response.json();
        console.error("API error:", errorData);
      }
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  const sentinelRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [page]);

  const handleIntersect = (entries: { isIntersecting: any }[]) => {
    if (entries[0].isIntersecting) {
      // The sentinel element is in the viewport, fetch more data

      const getAuthToken = Cookies.get("access-token") as string;
      if (getAuthToken) {
        fetchItems(getAuthToken)
      } else {
        updateTokens()
          .then(() => {
            const getAuthToken = Cookies.get("access-token") as string;
            fetchItems(getAuthToken)
          })
      }
    }
  };

  const handleCardClick = (video: any) => {
    route.push(`/watch?v=${video.id}`)
  }


  return (
    <div>
      <div className="mb-16">
        <Navbar />
      </div>

      <div className="w-full sm:px-[0%] md:px-[5%] pb-12">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-36 gap-5 place-items-center justify-center max-w-full`}>
          {videoData && videoData.map((video: any) => {
            return (
              <div
                onClick={() => handleCardClick(video)}
                key={video.id}
                className={`hover:cursor-pointer hover:scale-105 transition max-w-[360px] h-[250px] rounded-[32px]`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex-col gap-2 justify-center items-start flex flex-wrap">
                  <video
                    className="object-cover max-w-[397px] h-[200px] md:rounded-md"
                    src={video.video_url}
                    width={500}
                    height={150}
                    autoPlay={isHovered}
                    muted
                    loop
                  />
                  <div className="font-semibold px-1 w-[300px] overflow-ellipsis truncate">{video.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!isLoading && !loading && videoData && videoData.length === 0 && (
        <div className="flex justify-center items-center h-[70dvh]">
          <h1 className="text-2xl font-semibold">No videos found</h1>
        </div>
      )}

      <div ref={sentinelRef}></div>

      {isLoading && loading && (
        <div className="flex justify-center mb-5">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </div>
  )
};

export default Page;