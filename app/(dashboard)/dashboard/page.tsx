'use client';

import Image from "next/image";
import Link from "next/link";
import Context from "@/app/lib/helper/AppContext";
import { useEffect, useContext, useState } from "react";
import Cookies from "js-cookie";
import VideoPlayer from "@/images/youtube.png";
import Pagination from "@/app/components/Pagination";
import Modal from "@/app/components/Modal";
import toast from "react-hot-toast";
import Button from "@/app/components/ui/Button";


interface PageProps { }

const Page = () => {
    const { loading, isLoading, updateTokens, _totalUsers, getAllVideos, updateVideo, deleteVideo } = useContext(Context)
    const [videoData, setVideoData] = useState<any>()
    const [totalUsers, setTotalUsers] = useState<any>()
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [videoToEdit, setVideoToEdit] = useState<any>({
        title: '',
        description: '',
    });
    const [videoToDelete, setVideoToDelete] = useState<any>()
    const page_size = 10

    const fetchVideos = async (page: number, page_size: number) => {
        const accessToken = Cookies.get('access-token') as string
        if (accessToken) {
            const _videos = await getAllVideos(accessToken, page, page_size)
            if (_videos) {
                setVideoData(_videos)
            }
        } else {
            const _tokens = await updateTokens()
            if (_tokens) {
                const access_token = Cookies.get('access-token') as string
                const _videos = await getAllVideos(access_token, page, page_size)
                if (_videos) {
                    setVideoData(_videos)
                }
            }
        }
    }

    const getTotalUsers = async () => {
        const accessToken = Cookies.get('access-token') as string
        if (accessToken) {
            const _response = await _totalUsers(accessToken)
            if (_response) {
                setTotalUsers(_response)
            }
        } else {
            const _tokens = await updateTokens()
            if (_tokens) {
                const access_token = Cookies.get('access-token') as string
                const _response = await _totalUsers(access_token)
                if (_response) {
                    setTotalUsers(_response)
                }
            }
        }
    }

    const handlePageChange = (newPage: number, page_size: number) => {
        setCurrentPage(newPage)
        fetchVideos(newPage, page_size)
    }

    const toggleModal = async () => {
        setIsModalOpen(true)
    }

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setVideoToEdit({
            ...videoToEdit,
            [name]: value
        })
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        const accessToken = Cookies.get('access-token') as string
        if (accessToken) {
            const _videos = await updateVideo(accessToken, videoToEdit)
            if (_videos) {
                updateUIAfterUpdate(_videos)
                setIsModalOpen(false)
            }
        } else {
            const _tokens = await updateTokens()
            if (_tokens) {
                const access_token = Cookies.get('access-token') as string
                const _videos = await updateVideo(access_token, videoToEdit)
                if (_videos) {
                    updateUIAfterUpdate(_videos)
                    setIsModalOpen(false)
                }
            }
        }
    }

    const updateUIAfterUpdate = async (data: any) => {
        const _videoData = [...videoData.results.data]
        const updatedIndex = _videoData.findIndex((_data: any) => _data.id === data.data.id);
        // Update the data list with the new response
        if (updatedIndex !== -1) {
            _videoData[updatedIndex] = data.data;
            setVideoData({ ...videoData, results: { data: _videoData } });
        }
    };

    const handleDelete = async (e: any) => {
        e.preventDefault();
        const accessToken = Cookies.get('access-token') as string
        if (accessToken) {
            const _videos = await deleteVideo(accessToken, videoToDelete.id)
            if (_videos) {
                fetchVideos(1, page_size)
                setDeleteModal(false)
            }
        } else {
            const _tokens = await updateTokens()
            if (_tokens) {
                const access_token = Cookies.get('access-token') as string
                const _videos = await deleteVideo(access_token, videoToDelete.id)
                if (_videos) {
                    fetchVideos(1, page_size)
                    setDeleteModal(false)
                }
            }
        }
    }

    const deletePrompt = async () => {
        setDeleteModal(true)
    }

    useEffect(() => {
        const getVideos = async () => {
            fetchVideos(1, page_size)
        }
        getVideos()
        getTotalUsers()
    }, [])

    const isNextPage = videoData && videoData.next;
    const total_pages = videoData && videoData.results.total_pages;

    return (
        <div className="container py-12 px-5 mx-auto max-w-full">
            <h1 className="font-bold text-3xl mb-8"> Overview </h1>

            {/* CARDS */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 xl:gap-5 place-items-center max-w-full mb-8`}>
                <div className=" bg-primary shadow-xl p-3 w-full">
                    <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>

                    </figure>
                    <div className="flex items-center justify-between">
                        <h2 className="">Total Videos</h2>
                        <p>{videoData && videoData.count}</p>
                    </div>
                </div>
                <div className=" bg-primary shadow-xl p-3 w-full">
                    <figure>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </figure>
                    <div className="flex items-center justify-between">
                        <h2 className="">Total Users</h2>
                        <p>{totalUsers && totalUsers.length}</p>
                    </div>
                </div>
            </div>

            <div className={`${!isLoading && videoData && videoData.results.data.length === 0 ? 'hidden' : ''} h-[58dvh] overflow-auto scrollbar mb-5 w-full`}>
                {loading ? (
                    <div className="flex justify-center h-[30dvh] ">
                        <span className="loading loading-spinner bg-white loading-lg"></span>
                    </div>
                ) : (
                    <table className="table scrollbar">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Video</th>
                                <th>Description</th>
                                <th>URL</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {videoData && videoData.results.data.map((video: any, index: number) => {
                                return (
                                    <tr key={video.id} className="hover:cursor-pointer">
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle shrink-0">
                                                        <video
                                                            className="object-cover w-12 h-12 md:rounded-md"
                                                            src={video.video_url || video.video}
                                                            width={500}
                                                            height={150}
                                                            autoPlay
                                                            muted
                                                            loop
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div title={video.title} className="font-bold hidden md:flex">{video.title.length > 15 ? video.title.substring(0, 10) + '...' : video.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td title={video.description}>
                                            {video.description.length > 15 ? video.description.substring(0, 30) + '...' : video.description}
                                        </td>
                                        <td title={video.video_url}>{video.video_url.length > 15 ? video.video_url.substring(0, 30) + '...' : video.video_url}
                                        </td>
                                        <th>
                                            <div className="flex gap-3">
                                                <button onClick={() => { setVideoToEdit(video); toggleModal() }} className="btn p-0 border-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                                </button>
                                                <button onClick={() => { setVideoToDelete(video); deletePrompt() }} className="btn p-0 border-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {!isLoading && videoData && videoData.results.data.length === 0 &&
                (<div className="h-[58dvh] flex justify-center items-center">
                    <h1 className="font-bold text-white">No videos</h1>
                </div>
                )
            }

            {isModalOpen && (
                <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Edit video">
                    <form onSubmit={handleUpdate} action="" className="flex flex-col gap-5 mt-5 w-full">
                        <input onChange={handleOnChange} name="title" defaultValue={videoToEdit.title} type="text" className="input input-bordered w-full" />
                        <textarea onChange={handleOnChange} className="textarea textarea-bordered scrollbar" name="description" value={videoToEdit.description} />
                        {/* <textarea onChange={handleOnChange} name="description" defaultValue={videoToEdit.description} className="input input-bordered w-full" /> */}
                        <Button loading={isLoading} className="py-7" onClick={handleUpdate}>Update</Button>
                    </form>
                </Modal>
            )}

            {deleteModal && (
                <Modal isModalOpen={deleteModal} setIsModalOpen={setDeleteModal} title="Delete video">
                    <form onSubmit={handleUpdate} action="" className="mt-5 w-full">
                        <p className="mb-5">Are you sure you want to delete <b>{videoToDelete.title}</b>?</p>
                        <div className="flex items-center gap-3 w-full">
                            <Button variant='ghost' onClick={() => setDeleteModal(false)} className="my-5 w-[100px] rounded-md">No</Button>
                            <Button loading={isLoading} onClick={handleDelete} className="w-[200px] my-5 rounded-md">Yes</Button>
                        </div>
                    </form>
                </Modal>
            )}

            {!isLoading && videoData && videoData.results.data.length > 0 &&
                <div>
                    <Pagination
                        currentPage={currentPage}
                        isNextPage={isNextPage}
                        totalPages={total_pages}
                        onPageChange={handlePageChange}
                    />
                </div>

            }
        </div>
    );
};

export default Page;