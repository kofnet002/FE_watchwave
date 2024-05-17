'use client';

import { FC, useContext, useState } from "react";
import Title from "@/images/description.png";
import Description from "@/images/description.png";
import File from "@/images/file.png";
import VideoPlayer from "@/images/youtube.png";
import Image from "next/image";
import toast from "react-hot-toast";
import { Video } from "@/types/Video";
import Button from "@/app/components/ui/Button";
import Context from "@/app/lib/helper/AppContext";
import Cookies from "js-cookie";


interface VideosPageProps { }

const VideosPage: FC<VideosPageProps> = () => {

    const { isLoading, sendVideo, updateTokens } = useContext(Context)

    const access_token = Cookies.get('access-token')

    const [formData, setFormData] = useState<Video>({
        title: "",
        description: "",
        videoFile: null
    })

    const video_extensions = ['.mp4', '.mov', '.avi', '.mkv', '.wmv', '.flv']

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileExtension = fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);

            if (video_extensions.includes(`.${fileExtension}`)) {
                setFormData({ ...formData, videoFile: selectedFile });
            } else {
                toast.error(
                    "Unsupported file format. Please select a video file with one of the supported extensions: .mp4, .mov, .avi, .mkv, .wmv, .flv", { duration: 5000 }
                );
            }
        } else {
            toast.error("No file selected.");
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const videoData = new FormData();

        videoData.append("title", formData.title);
        videoData.append("description", formData.description);

        if (formData.videoFile) {
            videoData.append("video", formData.videoFile);
        }

        if (access_token) {
            sendVideo(access_token, videoData)
        } else {
            const _updatetokens = await updateTokens()
            if (_updatetokens) {
                const access_token = Cookies.get('access-token') as string
                sendVideo(access_token, videoData)
            }
        }
    }

    const disableBtn = () => formData.title === "" || formData.description === "" || formData.videoFile === null

    return (
        <div className="container py-12 px-5">
            <h1 className="font-bold text-xl md:text-3xl mb-10 md:mb-32"> Videos </h1>
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 justify-center mb-5">
                    <Image src={VideoPlayer} alt="title-icon" priority className="w-10 h-10" />
                    <p className="text-center text-xl">Upload a video</p>
                </div>
                <form onSubmit={handleSubmit} action="" method="POST" encType='multipart/form-data' className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 relative">
                        <Image src={Title} alt="title-icon" priority className="w-8 h-8 absolute left-3" />
                        <input onChange={handleOnChange} value={formData.title} name="title" type="text" placeholder="Title" className="pl-12 input input-bordered focus-within:border-none border-gray-600 focus-within:outline-primary w-full" />
                    </div>
                    <div className="flex items-center gap-2 relative">
                        <Image src={Description} alt="title-icon" priority className="w-8 h-8 absolute left-3" />
                        <input onChange={handleOnChange} value={formData.description} name="description" type="text" placeholder="Description" className="pl-12 input input-bordered focus-within:border-none border-gray-600 focus-within:outline-primary w-full" />
                    </div>
                    <label htmlFor="file" className="hover:cursor-pointer flex items-center input input-bordered justify-center gap-2 border p-2 rounded-lg focus-within:border-none border-gray-600 focus-within:outline-primary w-full h-12 relative">
                        <Image src={File} alt="title-icon" priority className="w-7 h-7 absolute left-3 top-2 " />
                        <p className="absolute left-12">{formData.videoFile ? formData.videoFile.name : 'Choose a video file'}</p>
                        <input onChange={handleFileChange} hidden id="file" type="file" placeholder="" />
                    </label>

                    <Button className="py-8" onClick={handleSubmit} disabled={isLoading || disableBtn()} loading={isLoading}>
                        Post Video
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VideosPage;