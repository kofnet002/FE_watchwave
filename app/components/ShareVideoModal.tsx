import { FC } from "react";
import Modal from "./Modal";
import {
    TelegramShareButton, TelegramIcon,
    WhatsappShareButton, WhatsappIcon,
    TwitterShareButton, TwitterIcon,
    FacebookShareButton, FacebookIcon,
    LinkedinShareButton, LinkedinIcon,
} from "react-share";
import toast from "react-hot-toast";


interface PageProps {
    setShowShare: (data: any) => void
    setCopied: (data: any) => void
    copied: boolean
    showShare: boolean
    shareUrl: string
}

const Page: FC<PageProps> = ({ setShowShare, showShare, shareUrl, setCopied, copied }) => {

    return (

        <Modal title="Share" setIsModalOpen={setShowShare} isModalOpen={showShare}>
            <div className="my-5 w-full overflow-x-auto scrollbar">
                <div className="flex items-center gap-6">
                    <WhatsappShareButton url={shareUrl} className="flex flex-col justify-center items-center">
                        <WhatsappIcon size={52} round={true} />
                        <p>WhatsApp</p>
                    </WhatsappShareButton>
                    <TwitterShareButton url={shareUrl} className="flex flex-col justify-center items-center">
                        <TwitterIcon size={52} round={true} />
                        <p>X</p>
                    </TwitterShareButton>
                    <FacebookShareButton url={shareUrl} className="flex flex-col justify-center items-center">
                        <FacebookIcon size={52} round={true} />
                        <p>Facebook</p>
                    </FacebookShareButton>
                    <LinkedinShareButton url={shareUrl} className="flex flex-col justify-center items-center">
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
    )
}
export default Page;